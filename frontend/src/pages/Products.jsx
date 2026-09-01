import { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 2999,
    rating: 4.5,
    category: "Electronics",
    image:
      "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  },
  {
    id: 2,
    title: "Gaming Keyboard",
    price: 2499,
    rating: 4.3,
    category: "Electronics",
    image:
      "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  },
  {
    id: 3,
    title: "Casual T-Shirt",
    price: 999,
    rating: 4.2,
    category: "Clothing",
    image:
      "https://fakestoreapi.com/img/71li-ujtlJCL._AC_UX679_.jpg",
  },
];

function Products() {

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <div className="products-page">

      <div className="page-header">

        <p className="hero-badge">
          SHOPGEN AI · PRODUCT CATALOG
        </p>

        <h1>
          Explore Products
        </h1>

        <p>
          Browse products and find something you'll love.
        </p>

      </div>


      <div className="filters">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select>

          <option value="">
            All Categories
          </option>

          <option value="electronics">
            Electronics
          </option>

          <option value="clothing">
            Clothing
          </option>

          <option value="jewelry">
            Jewelry
          </option>

        </select>

      </div>


      <div className="product-count">
        {filteredProducts.length} products found
      </div>


      <div className="product-grid">

        {filteredProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </div>
  );
}

export default Products;