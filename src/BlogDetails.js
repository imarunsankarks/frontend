import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    loading,
    data: blogs,
  } = useFetch(process.env.REACT_APP_BACKEND_URL + id);

  const history = useHistory()

  // console.log(blogs);

  const handleClick = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/')
    })
  }


  return (
    <div className="container product-details">
      {loading && <p>Loading...</p>}
      {blogs && (
        <div className="row g-5">
          <div className="col-6">
            <div className="all-imgs">
              <img src={blogs.image1} alt="" className="img1" />
              <div className="inner-imgs">
                <img src={blogs.image2} alt="" className="img2" />
                <img src={blogs.image3} alt="" className="img3" />

              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="eachProductDetails">
              <h2>{blogs.name}</h2>
              <h6>₹ {blogs.price}</h6>
              <p><span>Category:</span> {blogs.category}</p>
              <p><span>Color:</span> {blogs.color}</p>
              <p><span>Material:</span> {blogs.material}</p>
              <ul>
                <li><span>Available Size:</span></li>
                {blogs.size.map((element) => (
                  <li key={element}> {element},</li>
                ))}
              </ul>
              <ul>
                <li><span>Available Quantity: </span></li>
                {blogs.quantity.map((element) => (
                  <li key={element}>{element},</li>
                ))}
              </ul>
              <p className="productStatus" style={{ backgroundColor: blogs.status ? 'green' : 'red' }}>{blogs.status ? 'Available' : 'Not available'}</p>
              <br></br>
              <button onClick={handleClick}>Delete</button>
              <Link
                to={{
                  pathname: "/update/" + blogs._id
                }}
              >
                Update Product
              </Link>

            </div>

          </div>
        </div>

      )}
    </div>
  );
};

export default BlogDetails;
