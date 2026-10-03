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