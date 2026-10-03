from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.middleware.csrf import get_token

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Product, UserInteraction
from .gemini_service import generate_recommendation_explanation


# ---------------------------------------------------------
# CSRF
# ---------------------------------------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def csrf_token(request):
    return Response({
        "csrfToken": get_token(request)
    })


# ---------------------------------------------------------
# AUTHENTICATION
# ---------------------------------------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response(
            {
                "error": "Username, email and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {
                "error": "Username already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {
                "error": "Email already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    login(request, user)

    return Response(
        {
            "message": "Registration successful.",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        },
        status=status.HTTP_201_CREATED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {
                "error": "Username and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        request,
        username=username,
        password=password
    )

    if user is None:
        return Response(
            {
                "error": "Invalid username or password."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    login(request, user)

    return Response({
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)

    return Response({
        "message": "Logout successful."
    })


@api_view(["GET"])
@permission_classes([AllowAny])
def current_user(request):
    if request.user.is_authenticated:
        return Response({
            "authenticated": True,
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email
            }
        })

    return Response({
        "authenticated": False,
        "user": None
    })


# ---------------------------------------------------------
# PRODUCTS
# ---------------------------------------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def product_list(request):
    products = Product.objects.all().order_by("id")

    data = []

    for product in products:
        data.append({
            "id": product.id,
            "external_id": product.external_id,
            "title": product.title,
            "description": product.description,
            "price": float(product.price),
            "category": product.category.name,
            "image": product.image,
            "rating": product.rating,
            "rating_count": product.rating_count,
        })

    return Response(data)


@api_view(["GET"])
@permission_classes([AllowAny])
def product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)

    except Product.DoesNotExist:
        return Response(
            {
                "error": "Product not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response({
        "id": product.id,
        "external_id": product.external_id,
        "title": product.title,
        "description": product.description,
        "price": float(product.price),
        "category": product.category.name,
        "image": product.image,
        "rating": product.rating,
        "rating_count": product.rating_count,
    })


# ---------------------------------------------------------
# USER INTERACTIONS
# ---------------------------------------------------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def track_interaction(request):
    product_id = request.data.get("product_id")
    interaction_type = request.data.get("interaction_type")

    if not product_id or not interaction_type:
        return Response(
            {
                "error": "product_id and interaction_type are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    allowed_types = [
        "view",
        "click",
        "like",
        "search"
    ]

    if interaction_type not in allowed_types:
        return Response(
            {
                "error": "Invalid interaction type."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        product = Product.objects.get(
            id=product_id
        )

    except Product.DoesNotExist:
        return Response(
            {
                "error": "Product not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    UserInteraction.objects.create(
        user=request.user,
        product=product,
        interaction_type=interaction_type
    )

    return Response({
        "message": "Interaction recorded successfully.",
        "user": request.user.username,
        "product": product.title,
        "interaction_type": interaction_type
    })


# ---------------------------------------------------------
# AI RECOMMENDATIONS
# ---------------------------------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recommendations(request):
    user = request.user

    # Get products viewed by the logged in user
    viewed_product_ids = (
        UserInteraction.objects
        .filter(
            user=user,
            interaction_type="view",
            product__isnull=False
        )
        .values_list(
            "product_id",
            flat=True
        )
        .distinct()
    )

    viewed_products = Product.objects.filter(
        id__in=viewed_product_ids
    )

    # -----------------------------------------------------
    # No viewing history
    # -----------------------------------------------------

    if not viewed_products.exists():

        recommended_products = (
            Product.objects
            .all()
            .order_by(
                "-rating",
                "-rating_count"
            )[:6]
        )

        reason = (
            "Explore these popular products. "
            "As you view products we will personalize "
            "your recommendations."
        )

    # -----------------------------------------------------
    # User has viewing history
    # -----------------------------------------------------

    else:

        # Most recently viewed product
        latest_interaction = (
            UserInteraction.objects
            .filter(
                user=user,
                interaction_type="view",
                product__isnull=False
            )
            .select_related(
                "product",
                "product__category"
            )
            .order_by(
                "-created_at"
            )
            .first()
        )

        user_product = latest_interaction.product

        # Categories the user has shown interest in
        categories = (
            viewed_products
            .values_list(
                "category_id",
                flat=True
            )
            .distinct()
        )

        # Find products from those categories
        recommended_products = (
            Product.objects
            .filter(
                category_id__in=categories
            )
            .exclude(
                id__in=viewed_product_ids
            )
            .order_by(
                "-rating",
                "-rating_count"
            )[:6]
        )

        # -------------------------------------------------
        # Related products found
        # -------------------------------------------------

        if recommended_products.exists():

            reason = generate_recommendation_explanation(
                user_product,
                recommended_products
            )

        # -------------------------------------------------
        # No related products found
        # -------------------------------------------------

        else:

            recommended_products = (
                Product.objects
                .all()
                .exclude(
                    id__in=viewed_product_ids
                )
                .order_by(
                    "-rating",
                    "-rating_count"
                )[:6]
            )

            reason = (
                "These products are currently popular "
                "and may be interesting based on your "
                "recent activity."
            )

    # -----------------------------------------------------
    # Format response
    # -----------------------------------------------------

    data = []

    for product in recommended_products:
        data.append({
            "id": product.id,
            "external_id": product.external_id,
            "title": product.title,
            "description": product.description,
            "price": float(product.price),
            "category": product.category.name,
            "image": product.image,
            "rating": product.rating,
            "rating_count": product.rating_count,
        })

    return Response({
        "authenticated": True,
        "username": user.username,
        "reason": reason,
        "products": data
    })