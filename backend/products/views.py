import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})


def register_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    username = (payload.get("username") or "").strip()
    email = (payload.get("email") or "").strip()
    password = payload.get("password") or ""

    if not username or not email or not password:
        return JsonResponse({"error": "Username, email and password are required"}, status=400)

    if User.objects.filter(username__iexact=username).exists():
        return JsonResponse({"error": "Username already exists"}, status=400)

    if User.objects.filter(email__iexact=email).exists():
        return JsonResponse({"error": "Email already registered"}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    login(request, user)

    return JsonResponse({
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
    })


def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    username = (payload.get("username") or "").strip()
    password = payload.get("password") or ""

    if not username or not password:
        return JsonResponse({"error": "Username and password are required"}, status=400)

    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({"error": "Invalid username or password"}, status=401)

    login(request, user)

    return JsonResponse({
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
    })


def logout_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    logout(request)
    return JsonResponse({"message": "Logged out successfully"})


def me_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"user": None})

    return JsonResponse({
        "user": {
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
        }
    })
