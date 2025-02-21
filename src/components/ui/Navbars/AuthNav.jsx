import { Link } from 'react-router-dom';

function AuthNav() {
  return (
    <>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/register" className="nav-link">Register</Link>
    </>
  );
}

export default AuthNav;