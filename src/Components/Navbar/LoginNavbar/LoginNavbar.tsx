import React, { FC, useContext, useEffect, useState } from "react";
import NavBarLogo from "../../../assets/NavBar-Logo.svg";
import Profile from "../../../assets/Profile-Logo.svg";
import Search from "../../../assets/Search.svg";
import styles from "./LoginNavbar.module.css";
import { TopText } from "../../Texts/TopText/TopText";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { DataContext } from "../../../useContext";
import { AllContext } from "../../../useContext/interface";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiXMark } from "react-icons/hi2";
import SearchBox from "../../SearchBar/SearchBox";
interface LayoutProps {
  openModal: any;
  openLoginModal: any;
}

const LoginNav: FC<LayoutProps> = ({ openModal, openLoginModal }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(DataContext) as AllContext;
  const [showDiv, setShowDiv] = useState(false);
  const showOrhide = !showDiv
    ? styles.tabletDropdown
    : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${styles.tabletDropdown} ${styles.showBlock600px}`;
  const [isMobile, setIsMobile] = useState(false);

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "/logout") {
      logout();
    } else {
      navigate(e.target.value);
    }
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 480) {
        console.log(window.innerWidth);
        setIsMobile(false);
      } else {
        console.log(window.innerWidth);
        setIsMobile(true);
      }
    }

    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <nav className={styles.allSection}>
      <div className={styles.loginNavbarContainer}>
        <div className={styles.navSection}>
          <div className={styles.navLogo}>
            <Link to='/user-dashboard'>
              <img className={styles.logoImg} src={NavBarLogo} alt='Navlogo' />
            </Link>
          </div>
          {isMobile ? (
            <div> </div>
          ) : (
            <div className={styles.loginTopTextLeft}>
              <TopText text='Home' link='/user-dashboard' />
              <TopText text='Library' link='/library' />
              <TopText text='Browse' link='/browse' />
            </div>
          )}
        </div>
        
          <SearchBox />
        
        <div className={styles.profile}>
          {isMobile ? <div></div> :<div>
            <span id={styles.profileImagContainer}>
              {
                <img
                  src={
                    user.profileImage !== null &&
                    user.profileImage !== undefined &&
                    user.profileImage !== ""
                      ? user.profileImage
                      : Profile
                  }
                  alt='profile'
                  className={styles.profileimg}
                />
              }
            </span>
          </div>}

          {isMobile ? <p></p> :<p style={{ marginLeft: "10px", color: "white" }}>{user?.userName}</p>}
          <div className={styles.profileDropdown}>
            <select className={styles.select} onChange={handleSelect}>
              <option value='' selected hidden></option>
              <option value='/profile-dashboard'>
                <Link to='/profile-dashboard'>Profile</Link>
              </option>
              {user.role === "admin" && (
                <option value='/admin-dashboard'>
                  <Link to='/admin-dashboard'>Admin</Link>
                </option>
              )}
              <option value='/logout'>Logout</option>
              <option value='/about'>About</option>
            </select>
          </div>
          <div className={styles.responseDiv}>
            <input
              type='checkbox'
              onClick={() => {
                setShowDiv(!showDiv);
              }}
            />
            {showDiv ? (
              <div style={{ color: "#fff" }}>
                <HiXMark />
              </div>
            ) : (
              <div style={{ color: "#fff" }}>
                <GiHamburgerMenu />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={showOrhide}>
        <div
          style={{
            color: "#fff",
            position: "absolute",
            top: "10%",
            right: "5%",
            fontSize: "1.8rem",
          }}
          onClick={() => {
            setShowDiv(!showDiv);
          }}
        >
          <HiXMark />
        </div>
        <form className={styles.searchboxsmallscreen}>
          <img className={styles.img} src={Search} alt='Search icon' />
          <input type='text' placeholder='Search' />
        </form>
        <div style={{height:"27vh", display:"flex", flexDirection:"column", justifyContent:"space-between", paddingTop:"7%"}}>
          <Link to='/library' style={{ color: "#fff", textAlign: "center" }}  onClick={() => {
            setShowDiv(!showDiv);
          }}>
            Library
          </Link>
          <Link to='/browse' style={{ color: "#fff", textAlign: "center" }}  onClick={() => {
            setShowDiv(!showDiv);
          }}>
            Browse
          </Link>
          <Link
            to='/profile-dashboard'
            style={{ color: "#fff", textAlign: "center" }}
            onClick={() => {
              setShowDiv(!showDiv);
            }}>
            Profile
          </Link>
          <Link
            to='/profile-dashboard'
            style={{ color: "#fff", textAlign: "center" }}
            onClick={() => {
              setShowDiv(!showDiv);
            }}>
            About
          </Link>
          <Link to='/' style={{ color: "#fff", textAlign: "center" }}  onClick={(e) => {
              e.preventDefault();
            setShowDiv(!showDiv);
              logout();
          }}>
            Logout
          </Link>
          <Link
            to='/admin-dashboard'
            style={{ color: "#fff", textAlign: "center" }}
            onClick={() => {
              setShowDiv(!showDiv);
            }}>
            Admin
          </Link>
        </div>

        <div className={styles.showAt320}>
          <TopText text='Home' link='/user-dashboard' />
          <TopText text='Library' link='/library' />
          <TopText text='Browse' link='/browse' />
        </div>
      </div>
    </nav>
  );
};
const LoginNavbar = () => {
  return (
    <>
      <LoginNav openModal={undefined} openLoginModal={undefined} />
      <Outlet />
    </>
  );
};
Outlet;

export default LoginNavbar;
