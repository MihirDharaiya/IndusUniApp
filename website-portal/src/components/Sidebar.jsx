import { React } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/sidebar.css";
import Logo from "../images/logo.png";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const links = [
  {
    path: "Add-Faculty",
  },
  {
    path: "Remove-Faculty",
  },
  {
    path: "Reported-Student-List",
  },
  {
    path: "All-Past-Events",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="sidebar">
      <div className="image-div">
        <img className="image" src={Logo} alt="" />
      </div>
      <div className="main">
        <ul>
          <div className="li-div">
            {links.map((link) => (
              <li
                key={link.path}
                style={{
                  backgroundColor:
                    location.pathname === `/${link.path}` ? "white" : "#19315a",
                }}
              >
                <hr className="line" />
                <Link
                  className="li-a"
                  to={`/${link.path}`}
                  style={{
                    color:
                      location.pathname === `/${link.path}`
                        ? "#19315a"
                        : "#ffffff",
                  }}
                >
                  {link.path.replaceAll("-", " ")}
                </Link>
                <hr className="line" />
              </li>
            ))}
          </div>
        </ul>
        <div>
          <button type="button" className="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
