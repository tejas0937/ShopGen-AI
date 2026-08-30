# Shop Gen AI

## Generative AI Based Ecommerce Recommendation System

**Academic Project**

---

# 1. Project Overview

Shop Gen AI is a simple ecommerce recommendation system that combines a traditional rule based recommendation engine with Generative AI.

The system allows users to:

1. Browse ecommerce products
2. Search for products
3. Filter products by category
4. Filter products by price
5. View product details
6. Enter natural language shopping requirements
7. Receive AI based product recommendations
8. Understand why products were recommended
9. Chat with a simple AI shopping assistant
10. Track basic user interactions such as product views and searches

The project is designed as an academic prototype.

The main focus is:

```text
Simple Architecture
        +
Working Functionality
        +
Generative AI
        +
Easy Viva Explanation
```

The system should be easy to develop, demonstrate and explain.

---

# 2. Project Objective

The primary objective is to develop a working ecommerce recommendation prototype using Generative AI.

Example user request:

> I need a good product for gaming under $500.

The system should understand the request, identify relevant preferences, search the local product database, rank suitable products and use Gemini to generate an explanation.

Expected result:

```text
User Requirement

"I need a good product for gaming under $500."

                ↓

Natural Language Understanding

Category: Electronics
Budget: $500
Requirement: Gaming
Quality: Good

                ↓

Product Database Search

                ↓

Filtering

Price <= $500
Relevant category
Relevant description

                ↓

Recommendation Scoring

                ↓

Top Products

                ↓

Gemini

                ↓

AI Generated Explanation

                ↓

React UI
```

---

# 3. Technology Stack

## Frontend

```text
React.js
```

Responsibilities:

```text
Product listing
Product search
Category filters
Price filters
Product details
AI recommendations
AI shopping assistant
Responsive UI
```

---

## Backend

```text
Django
Django REST Framework
```

Responsibilities:

```text
REST APIs
Business logic
Recommendation engine
Database access
User interaction tracking
Gemini API communication
Fake Store API import
```

---

## Database

```text
SQLite
```

SQLite is selected because this is an academic prototype.

Advantages:

```text
Easy setup
No separate database server
Easy backup
Easy demonstration
Works well with Django
```

---

## Generative AI

```text
Gemini API
```

Gemini will primarily be used for:

```text
Natural language understanding
Recommendation explanation
Shopping assistant responses
```

Gemini should not be responsible for inventing products.

All recommended products must come from our local database.

---

## Product Data

Initial product source:

```text
Fake Store API
```

Products will be imported into our own SQLite database.

Normal application operation should use the local database rather than depending on Fake Store API.

---

# 4. High Level Architecture

```text
                    ┌─────────────────────┐
                    │       USER          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      React.js       │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                         HTTP / JSON
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Django REST      │
                    │        API          │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │ Product      │ │Recommendation│ │ Interaction  │
        │ Management   │ │   Engine     │ │   Tracking   │
        └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
               │                │                │
               └────────────────┼────────────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │       SQLite        │
                     │      Database       │
                     └──────────┬──────────┘
                                │
                                │ Selected products
                                ▼
                     ┌─────────────────────┐
                     │     Gemini API      │
                     │   Generative AI     │
                     └──────────┬──────────┘
                                │
                                │ Explanation
                                ▼
                     ┌─────────────────────┐
                     │      React.js       │
                     │     AI Results      │
                     └─────────────────────┘
```

---

# 5. Complete Application Flow

The complete application flow is:

```text
User
 ↓
React Interface
 ↓
Django REST API
 ↓
Validate Request
 ↓
Natural Language Understanding
 ↓
Extract Preferences
 ↓
Search Local Product Database
 ↓
Filter Products
 ↓
Calculate Recommendation Score
 ↓
Select Top Products
 ↓
Send Selected Products + User Requirements to Gemini
 ↓
Generate Recommendation Explanation
 ↓
Return Products + Explanation
 ↓
React Displays Result
```

---

# 6. Product Data Flow

The Fake Store API is only used as an initial data source.

```text
                 Fake Store API
                       │
                       │ HTTP Request
                       ▼
              Django Import Command
                       │
                       ▼
              Process Product Data
                       │
                ┌──────┴──────┐
                ▼             ▼
             Category       Product
                │             │
                └──────┬──────┘
                       ▼
                   SQLite DB
                       │
                       ▼
                Django REST API
                       │
                       ▼
                  React Frontend
```

The application does not need to call Fake Store API whenever a user searches.

---

# 7. Why Local Product Storage?

Products are stored locally for several reasons.

## Independence

The application does not completely depend on the external API.

## Recommendation

The recommendation engine can directly query our own database.

## User Tracking

Product views and searches can be associated with locally stored products.

## Performance

Local database queries are simpler than making an external API request for every operation.

## Academic Demonstration

The database can be shown directly through Django Admin.

---

# 8. Project Development Stages

The project will be developed in the following stages.

```text
Stage 1
Project Setup
        ↓
Stage 2
Django Backend + Database
        ↓
Stage 3
Fake Store API Import
        ↓
Stage 4
REST APIs
        ↓
Stage 5
React Frontend
        ↓
Stage 6
Recommendation Engine
        ↓
Stage 7
Gemini Integration
        ↓
Stage 8
AI Shopping Assistant
        ↓
Stage 9
UI Improvements
        ↓
Stage 10
Testing + Documentation
```

---

# 9. Stage 1: Project Setup

Install:

```text
Python
Node.js
VS Code
Git
```

Create:

```text
shop-gen-ai/
```

Inside it:

```text
backend/
frontend/
docs.md
```

Create a Python virtual environment:

```text
backend/venv/
```

Install backend dependencies.

Initial packages:

```text
Django
Django REST Framework
django-cors-headers
requests
python-dotenv
```

Gemini dependencies will be added later.

---

# 10. Stage 2: Django Backend

Create Django project:

```text
shopgen
```

Create Django application:

```text
products
```

Initial backend structure:

```text
backend/
│
├── manage.py
│
├── db.sqlite3
│
├── requirements.txt
│
├── .env
│
├── .gitignore
│
├── shopgen/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── products/
    ├── migrations/
    ├── management/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    └── tests.py
```

---

# 11. Database Models

The database will contain five main concepts.

```text
User
Product
Category
UserInteraction
SearchHistory
Recommendation
```

Django's built in User model will be used.

---

# 12. Category Model

Purpose:

Store product categories.

Example:

```text
electronics
jewelery
men's clothing
women's clothing
```

Conceptual structure:

```text
Category
──────────────
id
name
description
```

Relationship:

```text
Category
    │
    └──────< Product
```

One category can contain many products.

---

# 13. Product Model

Purpose:

Store ecommerce products.

Fields:

```text
id
external_id
title
description
price
category
image
rating
rating_count
created_at
updated_at
```

Relationship:

```text
Category
    │
    └────── Product
```

Example:

```text
Product

ID: 1
Title: Example Product
Price: 99.99
Category: Electronics
Rating: 4.5
```

---

# 14. User Interaction Model

Purpose:

Track basic user activity.

Supported actions:

```text
VIEW
SEARCH
WISHLIST
```

Conceptual structure:

```text
UserInteraction
────────────────────
id
user
product
action
search_text
created_at
```

Example:

```text
User viewed headphones

UserInteraction

user: Student
product: Headphones
action: VIEW
```

---

# 15. Search History Model

Purpose:

Store user searches.

Conceptual structure:

```text
SearchHistory
────────────────
id
user
query
created_at
```

Example:

```text
"I need headphones under $100"
```

---

# 16. Recommendation Model

Purpose:

Store generated recommendations.

Conceptual structure:

```text
Recommendation
────────────────────
id
user
product
query
score
explanation
created_at
```

Example:

```text
Product:
Gaming Headset

Score:
8.7

Query:
"gaming headset under $100"

Explanation:
Good match because the product
fits the requested budget and
gaming requirement.
```

---

# 17. Database Relationship Diagram

```text
                         ┌──────────────┐
                         │     User     │
                         └──────┬───────┘
                                │
                ┌───────────────┼────────────────┐
                │               │                │
                ▼               ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌───────────────┐
        │ Interaction  │ │ SearchHistory │ │ Recommendation│
        └──────┬───────┘ └──────────────┘ └───────┬───────┘
               │                                  │
               │                                  │
               ▼                                  ▼
        ┌──────────────┐                  ┌──────────────┐
        │   Product    │◄─────────────────┤   Product    │
        └──────┬───────┘                  └──────────────┘
               │
               │
               ▼
        ┌──────────────┐
        │   Category   │
        └──────────────┘
```

Conceptually, the important relationships are:

```text
Category 1 ──────── * Product

User 1 ──────────── * UserInteraction

User 1 ──────────── * SearchHistory

User 1 ──────────── * Recommendation

Product 1 ───────── * Recommendation
```

---

# 18. Stage 3: Fake Store API Integration

Create a Django management command:

```text
products/
└── management/
    └── commands/
        └── import_products.py
```

The command will:

```text
Fetch products
      ↓
Read JSON
      ↓
Extract category
      ↓
Create or update category
      ↓
Extract product information
      ↓
Create or update product
      ↓
Store in SQLite
```

Command:

```text
python manage.py import_products
```

The import should be safe to run multiple times.

Existing products should be updated instead of duplicated.

---

# 19. Stage 4: REST API

The backend will expose APIs for React.

Initial endpoints:

```text
GET /api/health/

GET /api/products/

GET /api/products/<id>/

GET /api/categories/
```

Later endpoints:

```text
GET /api/products/?search=headphones

GET /api/products/?category=electronics

GET /api/products/?min_price=20&max_price=100

POST /api/interactions/

POST /api/recommendations/

POST /api/assistant/
```

---

# 20. Product API Flow

```text
React
  │
  │ GET /api/products/
  ▼
Django
  │
  ▼
Product View
  │
  ▼
SQLite
  │
  ▼
Product Serializer
  │
  ▼
JSON Response
  │
  ▼
React
```

---

# 21. Product Search Flow

Example:

```text
User enters:

"headphones"
```

Flow:

```text
React
 ↓
GET /api/products/?search=headphones
 ↓
Django
 ↓
Search Product title
Search Product description
 ↓
Matching products
 ↓
JSON
 ↓
React
```

The initial search does not need AI.

Normal product search should remain simple and fast.

---

# 22. Category Filtering

Example:

```text
Category = electronics
```

Flow:

```text
React
 ↓
Django API
 ↓
Product Query
 ↓
category = electronics
 ↓
SQLite
 ↓
Filtered Products
 ↓
React
```

---

# 23. Price Filtering

Example:

```text
Minimum price = 20
Maximum price = 100
```

Flow:

```text
React
 ↓
Django
 ↓
price >= 20
AND
price <= 100
 ↓
SQLite
 ↓
Filtered Products
 ↓
React
```

---

# 24. Stage 5: React Frontend

Create the React application inside:

```text
frontend/
```

Expected structure:

```text
frontend/
│
├── package.json
├── public/
│
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

# 25. Frontend Pages

The application will contain five main pages.

```text
Home
Products
Product Details
AI Recommendations
AI Shopping Assistant
```

---

# 26. Home Page

Purpose:

Provide the main entry point.

Possible sections:

```text
Navigation
Hero section
Search bar
Popular categories
Featured products
AI recommendation section
Footer
```

Example:

```text
┌──────────────────────────────────────────┐
│ Shop Gen AI                              │
│ Home Products AI Assistant               │
├──────────────────────────────────────────┤
│                                          │
│ Find products with AI                    │
│                                          │
│ [ What are you looking for? ] [Search]   │
│                                          │
├──────────────────────────────────────────┤
│ Popular Categories                       │
│                                          │
│ Electronics  Clothing  Jewelry            │
├──────────────────────────────────────────┤
│ Featured Products                        │
│                                          │
│ [Product] [Product] [Product]             │
└──────────────────────────────────────────┘
```

---

# 27. Products Page

Purpose:

Display products.

Features:

```text
Search
Category filter
Price filter
Product cards
Sorting
Pagination if required
```

Example:

```text
Products

Search: [ headphones              ]

Category:
[ All Categories ▼ ]

Price:
[ Min ] [ Max ]

--------------------------------------

Product 1    Product 2    Product 3

$50          $75          $120

[View]       [View]       [View]
```

---

# 28. Product Details Page

Displays:

```text
Product image
Product title
Description
Price
Rating
Category
Wishlist button
```

When the page is opened:

```text
VIEW
```

interaction can be recorded.

---

# 29. AI Recommendations Page

The user enters a natural language request.

Example:

```text
I need a good product for gaming under $500.
```

The system returns:

```text
AI Recommendations

1. Product A
   $399

2. Product B
   $449

3. Product C
   $299
```

Then Gemini generates:

```text
Why these products?

These products are recommended because
they match your gaming requirement and
stay within your $500 budget. Product A
has a strong rating while Product B offers
a good balance between price and features.
```

---

# 30. AI Shopping Assistant

Simple conversational interface.

Example:

```text
User:
I need headphones.

AI:
What is your budget?

User:
Under $100.

AI:
Here are some headphones that match
your budget.
```

The assistant must use products available in the database.

It must not invent products.

---

# 31. AI Recommendation Flow

This is the most important flow in the project.

```text
                    USER
                      │
                      ▼
              Natural Language
                 Request
                      │
                      ▼
                React.js
                      │
                      ▼
              Django REST API
                      │
                      ▼
          Natural Language Processing
                      │
                      ▼
             Extract Preferences
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
     Category       Budget      Requirements
        │             │             │
        └─────────────┼─────────────┘
                      ▼
               Product Database
                      │
                      ▼
                 Filtering
                      │
                      ▼
                Ranking Engine
                      │
                      ▼
                Top Products
                      │
                      ▼
                 Gemini API
                      │
                      ▼
              AI Explanation
                      │
                      ▼
                Django JSON
                      │
                      ▼
                  React UI
```

---

# 32. Natural Language Understanding

Example request:

```text
"I need a good product for gaming under $500."
```

The system should identify:

```text
Requirement:
Gaming

Budget:
$500

Preference:
Good quality

Potential category:
Electronics
```

The exact implementation can initially be simple.

We do not need a complicated NLP model.

Gemini can assist with natural language understanding.

---

# 33. Recommendation Engine

The recommendation engine will use a simple scoring approach.

No machine learning model is required.

The score can consider:

```text
Category match
Price match
Description keyword match
Rating
Search query match
User interaction history
```

Conceptual formula:

```text
Recommendation Score =

Category Score
+
Price Score
+
Keyword Score
+
Rating Score
+
User History Score
```

The actual weights will remain simple.

Example:

```text
Category Match       30%
Price Match          25%
Keyword Match        20%
Rating               15%
User History         10%
```

Total:

```text
100%
```

These weights can be adjusted during testing.

---

# 34. Example Recommendation Calculation

User request:

```text
Gaming headphones under $100
```

Product A:

```text
Category match       = 30
Price match          = 25
Keyword match        = 20
Rating               = 13
User history         = 5

Total = 93
```

Product B:

```text
Category match       = 30
Price match          = 20
Keyword match        = 15
Rating               = 12
User history         = 2

Total = 79
```

Therefore:

```text
Product A
Score = 93

Product B
Score = 79
```

Product A is ranked higher.

---

# 35. Why Not Machine Learning?

This project intentionally does not use complex machine learning.

Reasons:

```text
Small dataset
Academic prototype
Faster development
Easy debugging
Easy viva explanation
No model training required
```

The recommendation engine is therefore a hybrid rule based system.

Generative AI adds the natural language capability.

---

# 36. Generative AI Role

Generative AI is used for three main purposes.

## Purpose 1: Natural Language Understanding

Convert:

```text
"I need something for gaming under $500"
```

into structured preferences.

---

## Purpose 2: Recommendation Explanation

Given:

```text
User requirements
+
Selected products
```

Gemini generates:

```text
A short explanation of why the products
are suitable.
```

---

## Purpose 3: Shopping Assistant

Gemini handles the conversational part of the shopping assistant.

Example:

```text
User:
I need headphones.

Gemini:
What is your budget?

User:
Under $100.

System:
Search local products.

Gemini:
Here are some headphones that match
your budget.
```

---

# 37. Important AI Safety Against Product Hallucination

The AI must not invent products.

Bad approach:

```text
User asks for headphones
        ↓
Gemini invents a product
        ↓
Application displays invented product
```

Correct approach:

```text
User request
     ↓
Django
     ↓
Local Product Database
     ↓
Actual products
     ↓
Gemini
     ↓
Explanation
```

Gemini receives real products selected from the database.

Therefore the AI explains existing products rather than creating fictional products.

---

# 38. Gemini Request Structure

Conceptually Django will send something like:

```text
User requirement:

Gaming product under $500.

Available products:

Product 1:
Name: Example Product
Price: $399
Category: electronics
Rating: 4.5
Description: ...

Product 2:
Name: Example Product
Price: $299
Category: electronics
Rating: 4.2
Description: ...
```

Gemini should respond with a short explanation.

Example:

```text
These products are good matches because
they fit the requested budget and are
relevant to your gaming requirement.
```

---

# 39. AI Assistant Architecture

```text
                    User
                     │
                     ▼
                React Chat
                     │
                     ▼
              Django API
                     │
                     ▼
          Conversation Processing
                     │
                     ▼
            Gemini Understanding
                     │
                     ▼
           Extract Requirements
                     │
                     ▼
             Product Database
                     │
                     ▼
             Recommendation Engine
                     │
                     ▼
             Matching Products
                     │
                     ▼
                  Gemini
                     │
                     ▼
              Assistant Response
                     │
                     ▼
                React Chat
```

---

# 40. User Interaction Tracking

The system will record simple interactions.

Supported:

```text
VIEW
SEARCH
WISHLIST
```

Example:

```text
User opens headphones

VIEW
```

Example:

```text
User searches:

"gaming keyboard"

SEARCH
```

Example:

```text
User adds product to wishlist

WISHLIST
```

These interactions can later influence recommendation scores.

---

# 41. Interaction Based Recommendation

Suppose a user frequently views:

```text
Headphones
Gaming Mouse
Gaming Keyboard
```

The system can increase scores for related products.

Conceptually:

```text
User History
     ↓
Previous interactions
     ↓
Identify preferred categories
     ↓
Increase relevant recommendation score
```

This remains a simple rule based approach.

---

# 42. API Architecture

The backend can eventually contain these endpoints:

```text
GET
/api/health/

GET
/api/products/

GET
/api/products/<id>/

GET
/api/categories/

POST
/api/interactions/

GET
/api/search-history/

POST
/api/recommendations/

POST
/api/assistant/
```

---

# 43. Backend Folder Structure

Final expected backend structure:

```text
backend/
│
├── manage.py
├── db.sqlite3
├── requirements.txt
├── .env
├── .gitignore
│
├── shopgen/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── products/
    │
    ├── migrations/
    │
    ├── management/
    │   ├── __init__.py
    │   │
    │   └── commands/
    │       ├── __init__.py
    │       └── import_products.py
    │
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── serializers.py
    ├── urls.py
    ├── views.py
    └── tests.py
```

As the project grows, recommendation and AI logic can be moved into separate files if necessary.

Do not split the project into many applications unless it becomes necessary.

---

# 44. Frontend Folder Structure

Final expected frontend structure:

```text
frontend/
│
├── package.json
├── public/
│
└── src/
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── SearchBar.jsx
    │   ├── CategoryFilter.jsx
    │   ├── PriceFilter.jsx
    │   └── AIExplanation.jsx
    │
    ├── pages/
    │   ├── Home.jsx
    │   ├── Products.jsx
    │   ├── ProductDetails.jsx
    │   ├── AIRecommendations.jsx
    │   └── ShoppingAssistant.jsx
    │
    ├── services/
    │   └── api.js
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

The exact structure can be simplified if some files are not needed.

---

# 45. Complete User Flow

## Normal Product Browsing

```text
User
 ↓
Home
 ↓
Products
 ↓
Search / Filter
 ↓
Product Card
 ↓
Product Details
```

---

## AI Recommendation

```text
User
 ↓
AI Recommendations
 ↓
Enter natural language request
 ↓
Django
 ↓
Extract preferences
 ↓
Search database
 ↓
Rank products
 ↓
Gemini explanation
 ↓
Display recommendations
```

---

## AI Assistant

```text
User
 ↓
AI Assistant
 ↓
Natural language conversation
 ↓
Gemini understands requirements
 ↓
Django searches products
 ↓
Recommendation Engine
 ↓
Gemini creates response
 ↓
User
```

---

# 46. Complete System Flowchart

```text
                         ┌─────────────┐
                         │    USER     │
                         └──────┬──────┘
                                │
                                ▼
                    ┌─────────────────────┐
                    │      React.js       │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Django REST      │
                    │        API          │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼──────────────────┐
             │                 │                  │
             ▼                 ▼                  ▼
       ┌──────────┐     ┌──────────────┐    ┌──────────────┐
       │ Product  │     │ Recommendation│    │ Interaction │
       │   APIs   │     │    Engine     │    │   Tracking  │
       └────┬─────┘     └───────┬──────┘    └──────┬───────┘
            │                    │                  │
            │                    │                  │
            └────────────────────┼──────────────────┘
                                 │
                                 ▼
                       ┌─────────────────┐
                       │ SQLite Database │
                       └────────┬────────┘
                                │
                                │ Selected Products
                                ▼
                       ┌─────────────────┐
                       │   Gemini API    │
                       │ Generative AI   │
                       └────────┬────────┘
                                │
                                │ Explanation
                                ▼
                       ┌─────────────────┐
                       │    Django API   │
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │    React UI     │
                       └─────────────────┘
```

---

# 47. Data Flow Diagram

## Level 0

```text
               ┌─────────┐
               │  USER   │
               └────┬────┘
                    │
                    ▼
          ┌──────────────────┐
          │   SHOP GEN AI    │
          │     SYSTEM       │
          └────────┬─────────┘
                   │
                   ▼
             Recommendations
                   │
                   ▼
                 USER
```

---

# 48. Data Flow Diagram Level 1

```text
                         USER
                           │
                           ▼
                 ┌──────────────────┐
                 │ Product Browsing  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Search / Filters │
                 └────────┬─────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │ Product DB    │
                  └───────┬───────┘
                          │
                          ▼
                  ┌───────────────┐
                  │ Recommendation│
                  │    Engine     │
                  └───────┬───────┘
                          │
                          ▼
                    ┌──────────┐
                    │ Gemini   │
                    └────┬─────┘
                         │
                         ▼
                      USER
```

---

# 49. Security Considerations

The project is an academic prototype.

Basic security practices should still be followed.

## API Key

Gemini API key must be stored in:

```text
.env
```

Example:

```text
GEMINI_API_KEY=your_api_key
```

Never place the API key directly in React code.

Never commit `.env` to GitHub.

---

## Database

SQLite is sufficient for this project.

No production database configuration is required.

---

## API

Django REST Framework will validate API requests.

---

# 50. Environment Variables

Initial `.env`:

```text
DJANGO_SECRET_KEY=your_secret_key
```

Later:

```text
GEMINI_API_KEY=your_gemini_api_key
```

The frontend should never receive the Gemini API key.

Correct:

```text
React
 ↓
Django
 ↓
Gemini
```

Incorrect:

```text
React
 ↓
Gemini API directly
```

---

# 51. Things Intentionally Not Included

The project will not include:

```text
Payment Gateway
Real Order Processing
Seller Management
Microservices
Redis
Kubernetes
Vector Database
Complex ML Training
Complex Collaborative Filtering
Advanced Recommendation Infrastructure
```

These features are unnecessary for the academic objective.

---

# 52. Why This Architecture?

The architecture is deliberately simple.

```text
React
 ↓
Django
 ↓
SQLite
```

AI is added only where it provides useful functionality.

```text
Django
 ↓
Recommendation Engine
 ↓
Gemini
```

This makes the system:

```text
Easy to develop
Easy to debug
Easy to demonstrate
Easy to explain
Easy to maintain
```

---

# 53. Recommended Development Order

Always follow this order.

```text
1. Install Python

2. Install Node.js

3. Create project folder

4. Create Python virtual environment

5. Install Django

6. Create Django project

7. Create products app

8. Configure SQLite

9. Create models

10. Run migrations

11. Create Django Admin

12. Import Fake Store products

13. Create REST APIs

14. Test APIs

15. Create React application

16. Build product listing

17. Build product details

18. Add search

19. Add category filter

20. Add price filter

21. Build recommendation engine

22. Test recommendation engine

23. Add Gemini API

24. Generate recommendation explanations

25. Build AI shopping assistant

26. Add interaction tracking

27. Improve UI

28. Add testing

29. Prepare screenshots

30. Prepare viva
```

---

# 54. Testing Strategy

Testing will be performed at each stage.

## Backend Test

```text
/api/health/
```

Expected:

```json
{
    "status": "success"
}
```

---

## Product Test

Check:

```text
/api/products/
```

Verify products are returned.

---

## Product Detail Test

Check:

```text
/api/products/1/
```

Verify a single product.

---

## Category Test

Check:

```text
/api/categories/
```

Verify categories.

---

## Search Test

Example:

```text
headphones
```

Verify relevant products are returned.

---

## Price Test

Example:

```text
Under $100
```

Verify products outside the budget are excluded.

---

## Recommendation Test

Input:

```text
Gaming product under $500
```

Verify:

```text
Products are real
Products are within budget
Products are relevant
Scores are generated
```

---

## Gemini Test

Verify:

```text
Gemini receives only selected products
Gemini generates an explanation
Gemini does not invent products
```

---

# 55. Example Complete Demonstration

For the final academic demonstration:

## Step 1

Open the Shop Gen AI website.

## Step 2

Show products.

```text
Products
```

## Step 3

Search:

```text
headphones
```

## Step 4

Apply price filter:

```text
$0 to $100
```

## Step 5

Open a product.

Show:

```text
Title
Price
Description
Rating
Category
```

## Step 6

Open:

```text
AI Recommendations
```

Enter:

```text
I need a good product for gaming under $500.
```

## Step 7

Show the recommendation process:

```text
User request
 ↓
Django
 ↓
Database search
 ↓
Recommendation score
 ↓
Top products
 ↓
Gemini
 ↓
Explanation
```

## Step 8

Show AI response.

## Step 9

Open AI Shopping Assistant.

Enter:

```text
I need headphones.
```

Assistant:

```text
What is your budget?
```

User:

```text
Under $100.
```

Assistant returns actual products.

This demonstrates the complete project.

---
