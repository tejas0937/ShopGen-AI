import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shopgen.settings")
django.setup()

from products.models import Category, Product


products = [
    {
        "external_id": 1,
        "title": "Wireless Headphones",
        "description": "Comfortable wireless headphones with clear sound and long battery life.",
        "price": 59.99,
        "category": "Electronics",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "rating_count": 120,
    },
    {
        "external_id": 2,
        "title": "Gaming Keyboard",
        "description": "Mechanical gaming keyboard with RGB lighting and responsive keys.",
        "price": 79.99,
        "category": "Electronics",
        "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        "rating": 4.6,
        "rating_count": 210,
    },
    {
        "external_id": 3,
        "title": "Casual T Shirt",
        "description": "Comfortable casual cotton t shirt suitable for everyday wear.",
        "price": 19.99,
        "category": "Clothing",
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "rating_count": 95,
    },
    {
        "external_id": 4,
        "title": "Smart Watch",
        "description": "Smart watch with fitness tracking notifications and health monitoring features.",
        "price": 129.99,
        "category": "Electronics",
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "rating_count": 180,
    },
    {
        "external_id": 5,
        "title": "Backpack",
        "description": "Durable everyday backpack with multiple compartments.",
        "price": 39.99,
        "category": "Accessories",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "rating_count": 150,
    },
    {
        "external_id": 6,
        "title": "Running Shoes",
        "description": "Lightweight running shoes designed for comfort and daily exercise.",
        "price": 89.99,
        "category": "Footwear",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        "rating": 4.5,
        "rating_count": 230,
    },
    {
        "external_id": 7,
        "title": "Denim Jacket",
        "description": "Classic denim jacket suitable for casual outfits.",
        "price": 69.99,
        "category": "Clothing",
        "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        "rating": 4.1,
        "rating_count": 80,
    },
    {
        "external_id": 8,
        "title": "Bluetooth Speaker",
        "description": "Portable Bluetooth speaker with powerful sound and compact design.",
        "price": 49.99,
        "category": "Electronics",
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
        "rating": 4.4,
        "rating_count": 175,
    },
    {
        "external_id": 9,
        "title": "Leather Wallet",
        "description": "Compact leather wallet with multiple card and cash compartments.",
        "price": 29.99,
        "category": "Accessories",
        "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        "rating": 4.3,
        "rating_count": 110,
    },
    {
        "external_id": 10,
        "title": "Sports Shoes",
        "description": "Comfortable sports shoes designed for workouts and outdoor activities.",
        "price": 74.99,
        "category": "Footwear",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        "rating": 4.2,
        "rating_count": 140,
    },
]


for item in products:
    category, _ = Category.objects.get_or_create(
        name=item["category"]
    )

    Product.objects.update_or_create(
        external_id=item["external_id"],
        defaults={
            "title": item["title"],
            "description": item["description"],
            "price": item["price"],
            "category": category,
            "image": item["image"],
            "rating": item["rating"],
            "rating_count": item["rating_count"],
        },
    )


print(f"Successfully added {len(products)} products.")