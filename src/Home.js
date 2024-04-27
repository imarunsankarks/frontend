import BlogList from "./BlogList";
import useFetch from "./useFetch";
const Home = () => {

  const { loading, data: blogs } = useFetch(process.env.REACT_APP_BACKEND_URL)

  return (
    <div className="home">
      <div className="container">
        {/* {error && <p>{error}</p>} */}
        {loading && <p>Loading...</p>}
        {blogs &&
          <BlogList blogs={blogs} title="All products" />
        }
      </div>
    </div>
  );
};

export default Home;
