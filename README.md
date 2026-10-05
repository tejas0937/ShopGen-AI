# ShopGen AI — Simplifying product discovery with AI

ShopGen AI is an AI powered product discovery platform that helps users find relevant products using natural language.

Instead of searching with exact product names or applying multiple filters, users can simply describe what they need. The system understands the request and recommends suitable products from the available catalog.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Django, Python |
| Database | SQLite |
| Authentication | Django Sessions |
| Admin | Django Admin |
| AI | Natural Language Recommendation |

## How It Works

User
  |
  v
React Frontend
  |
  | API Request
  v
Django Backend
  |
  +------> AI Recommendation Logic
  |
  +------> Product Database
  |
  v
Relevant Products
  |
  v
React Frontend


## User Workflow

Register / Login
      |
      v
Browse Products
      |
      v
Open Recommendations
      |
      v
Enter Natural Language Query
      |
      v
AI Processes Requirements
      |
      v
Matching Products
      |
      v
View Recommendations


### Example

User enters:

I want wireless headphones for gaming under ₹5000.

The system identifies the important requirements:

Category: Headphones
Type: Wireless
Purpose: Gaming
Budget: ₹5000

It then finds relevant products from the product catalog and displays them to the user.

## Architecture


                  ShopGen AI
                      |
        +-------------+-------------+
        |                           |
        v                           v
 React Frontend               Django Admin
        |                           |
        +-------------+-------------+
                      |
                      v
               Django Backend
                      |
             +--------+--------+
             |                 |
             v                 v
       Recommendation      Product DB
           Logic             SQLite
             |
             v
       Recommended Products

## Main Features

* User registration and login
* Product catalog
* Product categories
* Product search and sorting
* Natural language product recommendations
* Django Admin for product management
* React based user interface

## Project Structure


ShopGen-AI/
|
+-- backend/
|   +-- manage.py
|   +-- shopgen/
|   +-- products/
|   +-- accounts/
|
+-- frontend/
|   +-- src/
|   +-- package.json
|
+-- README.md

## Project Goal

ShopGen AI demonstrates how AI and natural language can simplify ecommerce product discovery.

The idea is simple:

Describe what you need
          |
          v
AI understands your requirements
          |
          v
Find relevant products
          |
          v
Make better shopping decisions


## Future Scope

* Conversational shopping assistant
* Personalized recommendations
* Semantic and vector based search
* Shopping cart and checkout
* Product reviews and ratings
* Recommendation analytics

## Repository

GitHub: `https://github.com/tejas0937/ShopGen-AI`

