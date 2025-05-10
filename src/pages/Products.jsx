import { useEffect, useState } from "react";
import productImage from "../assets/washing-machine-2.jpg";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Api";
import SingleProduct from "./SingleProduct";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();

      setProducts(data);

      console.log(data);
    };

    fetchProducts();
  }, []);

  const handleSingleProductDetailsRedirection = (productId) => {
    navigate("/product/" + productId);
  };

  //return product regular price / sale price value

  const renderProductPrice = (product) => {

    if(product.sale_price) {
      return <>
        <span className="text-muted text-decoration-line-through me-2">${product.regular_price}</span>
        <span className="text-danger">${product.sale_price}</span>
      </>
    }
    return <>
      ${product.regular_price || product.price}
    </>
  }

  return (
    <>
      <div className="container">
        <h1 className="my-4">Products</h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
              <div className="card product-card">
                <img
                  className="card-img-top"
                  src={product?.images[0]?.src}
                  alt={product.name}
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSingleProductDetailsRedirection(product.id)}
                  >
                    {product.name}
                  </h5>
                  <p className="card-text">{renderProductPrice(product)}</p>
                  <p className="card-text" dangerouslySetInnerHTML={{
                    __html: (product?.description).slice(0,50)+ '...'
                  }} />
                  <p className="card-text">Category: {product?.categories.map((category) => category.name).join(",") }</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
