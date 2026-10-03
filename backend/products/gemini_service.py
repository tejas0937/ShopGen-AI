import os

from dotenv import load_dotenv
from google import genai

load_dotenv()


def generate_recommendation_explanation(user_product, recommended_products):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return (
            "These products were selected based on your recent "
            "product interests."
        )

    try:
        client = genai.Client(api_key=api_key)

        recommended_names = [
            product.title for product in recommended_products
        ]

        prompt = f"""
You are an ecommerce recommendation assistant.

The customer recently viewed:
{user_product.title}

Category:
{user_product.category.name}

We recommend these products:
{", ".join(recommended_names)}

Write a short friendly explanation for why these products
may be relevant to the customer.

Rules:
- Keep it to 2 sentences.
- Do not mention that you are an AI.
- Do not invent product features.
- Do not use markdown.
"""

        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt,
        )

        if response.text:
            return response.text.strip()

    except Exception as error:
        print("Gemini error:", error)

    return (
        "These products were selected because they are related "
        "to products you recently viewed."
    )