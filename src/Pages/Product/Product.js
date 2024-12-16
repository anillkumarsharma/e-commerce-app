import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    // Fetch products and categories
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
        setCategories(uniqueCategories);
      });
  }, []);

  // Handle filtering by category
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  // Handle sorting by price
  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOrder(sort);

    let sortedProducts = [...filteredProducts];
    if (sort === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="product-page">
      <h1>Products</h1>
      <div className="filters " style={{marginBottom:'20px' }}>
       
        <select value={selectedCategory} onChange={handleCategoryChange}   style={{ marginRight: '40px' ,padding:'15px'}}>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <select value={sortOrder} onChange={handleSortChange} style={{padding:'15px'}}>
          <option value="">Sort by Price</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <Link to={`/products/${product.id}`} className="product-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
