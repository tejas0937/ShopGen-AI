from django.contrib import admin
from .models import (
    Category,
    Product,
    UserInteraction,
    SearchHistory,
    Recommendation,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "price",
        "rating",
        "rating_count",
        "external_id",
        "created_at",
    )

    list_filter = (
        "category",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
        "external_id",
    )

    ordering = (
        "title",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


@admin.register(UserInteraction)
class UserInteractionAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "product",
        "interaction_type",
        "created_at",
    )

    list_filter = (
        "interaction_type",
        "created_at",
    )

    search_fields = (
        "product__title",
        "user__username",
    )

    readonly_fields = (
        "created_at",
    )


@admin.register(SearchHistory)
class SearchHistoryAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "query",
        "created_at",
    )

    list_filter = (
        "created_at",
    )

    search_fields = (
        "query",
        "user__username",
    )

    readonly_fields = (
        "created_at",
    )


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "query",
        "created_at",
    )

    list_filter = (
        "created_at",
    )

    search_fields = (
        "query",
        "user__username",
    )

    filter_horizontal = (
        "products",
    )

    readonly_fields = (
        "created_at",
    )