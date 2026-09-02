from django.urls import path

from .views import (
    csrf_token,
    register,
    login_view,
    logout_view,
    current_user,
)

urlpatterns = [
    path("csrf/", csrf_token, name="csrf"),
    path("register/", register, name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("me/", current_user, name="current-user"),
]