import { useEffect, useState } from "react";
import productImage from "../assets/washing-machine-2.jpg";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Api";
import { myStoreHook } from "./StoreContext";

const Products = ({setPageLoading, onAddToCart}) => {

  const { renderProductPrice } = myStoreHook()
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {

      setPageLoading(true)

      const data = await getAllProducts();

      setProducts(data);

      console.log(data);
      setPageLoading(false)
    };

    fetchProducts();
  }, []);

  const handleSingleProductDetailsRedirection = (productId) => {
    navigate("/product/" + productId);
  };


  return (
    <>
      <h1 className="my-4">Products</h1>
      <div className="row">
        {products.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={product.id}
          >
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
                  onClick={() =>
                    handleSingleProductDetailsRedirection(product.id)
                  }
                >
                  {product.name}
                </h5>
                <p className="card-text">{renderProductPrice(product)}</p>
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: (product?.description).slice(0, 50) + "...",
                  }}
                />
                <p className="card-text">
                  Category:{" "}
                  {product?.categories
                    .map((category) => category.name)
                    .join(",")}
                </p>
                <button 
                className="btn btn-primary" 
                onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
