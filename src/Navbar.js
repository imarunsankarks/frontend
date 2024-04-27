import { Link } from 'react-router-dom';
import logo from './Logob.png'

const Navbar = () => {
  return (
    <div className="container py-3">
      <div className="row">
        <div className="navbar">
          <div className="col-6">
            <img src={logo} alt="" />
          </div>
          <div className="col-6 text-end">
            <div className="navs">
              <Link to="/">Home</Link>
              <Link to="/create">Add new</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
