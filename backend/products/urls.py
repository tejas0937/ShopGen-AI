from django.urls import path

from .views import (
    csrf_token,
    register,
    login_view,
    logout_view,
    current_user,
    product_list,
    product_detail,
    track_interaction,
    recommendations,
    recommendation_search,
)


urlpatterns = [
    path(
        "csrf/",
        csrf_token,
        name="csrf"
    ),

    path(
        "register/",
        register,
        name="register"
    ),

    path(
        "login/",
        login_view,
        name="login"
    ),

    path(
        "logout/",
        logout_view,
        name="logout"
    ),

    path(
        "me/",
        current_user,
        name="current-user"
    ),

    path(
        "products/",
        product_list,
        name="product-list"
    ),

    path(
        "products/<int:product_id>/",
        product_detail,
        name="product-detail"
    ),

    path(
        "interactions/",
        track_interaction,
        name="track-interaction"
    ),

    path(
        "recommendations/",
        recommendations,
        name="recommendations"
    ),

    path(
        "recommendations/search/",
        recommendation_search,
        name="recommendation-search"
    ),
]