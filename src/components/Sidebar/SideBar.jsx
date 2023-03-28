import { NavLink } from "react-router-dom";
import { FaHandsHelping } from "react-icons/fa";
import { MdInsights } from "react-icons/md";
import {  BiCategoryAlt,BiCategory} from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiLogOut ,FiUsers} from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/mynetwork_logo.png";
import { useNavigate } from "react-router-dom";
const routes = [

  {
    path: "/all-users",
    name: "All Users",
    icon: <FiUsers />,
  },
  {
    path: "/categrory-managment",
    name: "Category",
    icon: <BiCategoryAlt />,
  },
  {
    path: "/b-category-managment",
    name: "Business Category",
    icon: <BiCategory />,
  },
  {
    path: "/b-insights",
    name: "Business Insights",
    icon: <MdInsights />,
  },
  {
    path: "/help-support",
    name: "Help / Support ",
    icon: <FaHandsHelping />,
  },
  {
    path: "/set-password",
    name: "Set Password",
    icon: <RiLockPasswordLine />,
  },

 
];

const SideBar = ({ children }) => {
  const navigate = useNavigate();

  const handleSignout=()=>{
    navigate("/sign-in");
    window.location.reload(true);
    localStorage.clear();
   
  }
  

  return (
    <>
      <div className="main-container">
        <div className={`sidebar `}>
          <div className="top_section">
          <span className="border-main-logo">
                <img src={logo} className="main-logo" alt="Avatar" />
              </span>

            </div>
        
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  >
                  <div className="icon">{route.icon}</div>
                
                   
                  <div className="link_text">  {route.name} </div>
                </NavLink>
              );
            })}
          </section>
          <div >
           <button onClick={ handleSignout} className="sign-out" ><FiLogOut style={{marginTop:"5px"}}/><div>Sign Out</div></button> 
          </div>
        </div>


        <main className="main-children">{children}</main>
        
      </div>
    </>
  );
};

export default SideBar;
