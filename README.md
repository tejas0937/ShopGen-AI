# ShopGen-AI
Generative AI Based Ecommerce Recommendation System.

# Architecture 
                    SHOPGEN AI
                         │
                         ▼
                  React Frontend
                         │
          ┌──────────────┼──────────────┐
          │              │              │
       Products       Search        AI Query
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
                  Django REST API
                         │
             ┌───────────┼───────────┐
             │           │           │
          Products    Interactions   Users
             │           │           │
             └───────────┼───────────┘
                         │
                         ▼
                       SQLite
                         │
                         ▼
                Recommendation Engine
                         │
                         ▼
                       Gemini
                         │
                         ▼
              Recommendations +
                    Explanation

# WorkFlow
                    SHOPGEN AI
                        │
                        ▼
              ┌──────────────────┐
              │ User Registration │
              │   Login / Logout  │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Product Database │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Product Listing  │
              │ Search / Filter  │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Product Details  │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ User Interaction │
              │     Tracking     │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Recommendation   │
              │     Engine       │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Gemini AI        │
              │ Explanation      │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Personalized     │
              │ Recommendations  │
              └──────────────────┘