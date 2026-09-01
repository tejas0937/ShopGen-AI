from django.urls import path

from .views import csrf_token, login_view, logout_view, me_view, register_view

urlpatterns = [
    path("csrf/", csrf_token, name="csrf-token"),
    path("register/", register_view, name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("me/", me_view, name="me"),
]
