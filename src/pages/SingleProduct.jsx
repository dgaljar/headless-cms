import { useEffect, useState } from "react";
import productImage from "../assets/washing-machine-2.jpg";
import { useParams } from "react-router-dom";
import { getSingleProductData } from "../Api";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    
    const fetchSingleProduct = async () => {
      setLoading(true)
      const data = await getSingleProductData(id);

      setSingleProduct(data);
      console.log(data);
      setLoading(false)
    };

    fetchSingleProduct();
    
  }, [id]);

  const renderProductPrice = (product) => {
    if (product.sale_price) {
      return (
        <>
          <span className="text-muted text-decoration-line-through me-2">
            ${product.regular_price}
          </span>
          <span className="text-danger">${product.sale_price}</span>
        </>
      );
    }
    return <>${product.regular_price || product.price}</>;
  };

  if(loading) return <h2>Loading...</h2>

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img
                className="card-img-top"
                src={singleProduct?.images?.[0]?.src}
                alt={singleProduct.title}
              />
            </div>
          </div>

          <div className="col-md-6">
            <h1 className="my-4">{singleProduct.title}</h1>
            <div className="mb-4">
              <p
                dangerouslySetInnerHTML={{
                  __html: singleProduct.description,
                }}
              />
            </div>
            <div className="mb-4">
              <h5>Price:</h5>
              {renderProductPrice(singleProduct)}
            </div>
            <div className="mb-4">
              <h5>Category:  {singleProduct?.categories?.map((category) => category.name).join(",") }</h5>
            </div>
            <button className="btn btn-primary mt-4" onclick="onAddToCart()">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
