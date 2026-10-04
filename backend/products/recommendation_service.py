import re


STOP_WORDS = {
    "i",
    "im",
    "i'm",
    "want",
    "would",
    "like",
    "to",
    "buy",
    "get",
    "looking",
    "for",
    "a",
    "an",
    "the",
    "some",
    "please",
    "show",
    "me",
    "need",
    "my",
    "can",
    "you",
    "recommend",
    "recommendation",
    "recommendations",
    "product",
    "products",
    "best",
    "good",
    "find",
}


WORD_GROUPS = {
    "headphone": {
        "headphone",
        "headphones",
        "headset",
        "earphone",
        "earphones",
        "earbud",
        "earbuds",
    },
    "speaker": {
        "speaker",
        "speakers",
        "bluetooth",
        "audio",
    },
    "keyboard": {
        "keyboard",
        "keyboards",
        "mechanical",
        "gaming",
    },
    "mouse": {
        "mouse",
        "mice",
        "wireless",
    },
    "watch": {
        "watch",
        "watches",
        "smartwatch",
    },
    "shoe": {
        "shoe",
        "shoes",
        "sneaker",
        "sneakers",
        "footwear",
        "running",
        "sports",
        "trainer",
        "trainers",
        "hiking",
    },
    "shirt": {
        "shirt",
        "shirts",
        "tshirt",
        "tshirts",
        "polo",
        "hoodie",
        "sweatshirt",
        "jacket",
        "jeans",
        "dress",
        "clothing",
    },
    "bag": {
        "bag",
        "bags",
        "backpack",
        "backpacks",
        "duffel",
        "crossbody",
        "wallet",
    },
    "camera": {
        "camera",
        "cameras",
        "photo",
        "photography",
    },
    "laptop": {
        "laptop",
        "laptops",
        "computer",
        "computers",
        "notebook",
    },
    "fitness": {
        "fitness",
        "gym",
        "workout",
        "exercise",
        "yoga",
        "dumbbell",
        "dumbbells",
        "resistance",
        "jump",
        "rope",
        "roller",
    },
    "beauty": {
        "beauty",
        "skincare",
        "skin",
        "cream",
        "serum",
        "perfume",
        "lip",
        "balm",
        "aloe",
    },
    "stationery": {
        "stationery",
        "study",
        "studying",
        "notebook",
        "planner",
        "pen",
        "pens",
        "pencil",
        "pencils",
        "desk",
    },
    "kitchen": {
        "kitchen",
        "coffee",
        "mug",
        "water",
        "bottle",
        "storage",
        "home",
        "lamp",
        "plant",
    },
}


def clean_text(text):
    text = str(text or "").lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def tokenize(text):
    cleaned = clean_text(text)

    tokens = [
        token
        for token in cleaned.split()
        if token not in STOP_WORDS
    ]

    expanded = set(tokens)

    for token in tokens:
        if token.endswith("s") and len(token) > 3:
            expanded.add(token[:-1])

    return expanded


def get_word_group(token):
    for group_name, words in WORD_GROUPS.items():
        if token in words:
            return group_name

    return None


def extract_budget(query):
    patterns = [
        r"(?:under|below|less than|within|upto|up to|max(?:imum)? of)\s*(?:₹|rs\.?|inr|\$)?\s*([0-9]+(?:\.[0-9]+)?)",
        r"(?:₹|rs\.?|inr|\$)\s*([0-9]+(?:\.[0-9]+)?)",
    ]

    for pattern in patterns:
        match = re.search(
            pattern,
            query.lower()
        )

        if match:
            try:
                return float(match.group(1))
            except ValueError:
                return None

    return None


def score_product(product, query):
    query_tokens = tokenize(query)

    searchable_title = clean_text(product.title)
    searchable_description = clean_text(product.description)
    searchable_category = clean_text(product.category.name)

    product_tokens = (
        tokenize(searchable_title)
        | tokenize(searchable_description)
        | tokenize(searchable_category)
    )

    score = 0

    for token in query_tokens:
        group = get_word_group(token)

        if token in searchable_title:
            score += 12

        if token in searchable_category:
            score += 8

        if token in searchable_description:
            score += 4

        if token in product_tokens:
            score += 3

        if group:
            group_words = WORD_GROUPS[group]

            title_tokens = tokenize(searchable_title)
            description_tokens = tokenize(searchable_description)

            if title_tokens.intersection(group_words):
                score += 14

            if description_tokens.intersection(group_words):
                score += 5

    normalized_query = clean_text(query)

    if normalized_query and normalized_query in searchable_title:
        score += 25

    budget = extract_budget(query)

    if budget is not None:
        if float(product.price) <= budget:
            score += 8
        else:
            score -= 10

    score += float(product.rating) * 0.5

    return score


def recommend_products(query, products, limit=6):
    scored_products = []

    for product in products:
        score = score_product(
            product,
            query
        )

        scored_products.append(
            (score, product)
        )

    scored_products.sort(
        key=lambda item: (
            item[0],
            float(item[1].rating),
            item[1].rating_count,
        ),
        reverse=True
    )

    positive_matches = [
        product
        for score, product in scored_products
        if score > 2
    ]

    if not positive_matches:
        popular_products = sorted(
            products,
            key=lambda product: (
                float(product.rating),
                product.rating_count,
            ),
            reverse=True
        )

        return popular_products[:limit]

    return positive_matches[:limit]


def build_search_reason(query, products):
    if not products:
        return (
            f'No products matched "{query}".'
        )

    query_tokens = tokenize(query)

    matched_words = []

    for token in query_tokens:
        for group_words in WORD_GROUPS.values():
            if token in group_words:
                matched_words.append(token)
                break

    matched_words = list(dict.fromkeys(matched_words))

    if matched_words:
        visible_words = ", ".join(
            matched_words[:3]
        )

        return (
            f'I found products that match your request '
            f'based on keywords such as "{visible_words}".'
        )

    return (
        "These products were selected because their "
        "names and descriptions are closest to your request."
    )