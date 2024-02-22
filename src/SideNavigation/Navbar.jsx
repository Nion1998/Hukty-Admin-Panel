import React, { useState, useEffect, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenuAltRight, BiBell, BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FcBusinessman, IconName } from "react-icons/fc";
import { BsFillBellFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../Contexts/UserContext";

const Navbar = (props) => {
  // state to toggle navbar from hide to display
  const [toggle, setToggle] = useState(false);
  const { logOut, userProfile } = useContext(AuthContext);

  console.log("profile", userProfile);
  // function to toggle navbar from hide to display
  const handleSidebarToggle = () => {
    setToggle(!toggle);
    props.onToggle();
  };

  const [profile, setProfile] = useState({});

  return (
    <section
      style={{
        width: toggle
          ? window.innerWidth < 992
            ? "100%"
            : "calc(100% - 240px)"
          : window.innerWidth < 992
          ? "100%"
          : "calc(100% - 75px)",
      }}
      className="header-div shadow-lg bg-light  position-fixed"
    >
      {/* Toogle Bar */}
      <div className="">
        <div className="bars">
          {toggle ? (
            window.innerWidth < 992 || window.innerWidth > 992 ? (
              <FaBars onClick={handleSidebarToggle} />
            ) : (
              <AiOutlineClose onClick={handleSidebarToggle} />
            )
          ) : window.innerWidth > 992 ? (
            <AiOutlineClose onClick={handleSidebarToggle} />
          ) : (
            <FaBars onClick={handleSidebarToggle} />
          )}
        </div>
      </div>

      {/* Header links */}
      <div className=" d-flex align-items-center">
        <div>
          <BsFillBellFill className="fs-4 me-3"></BsFillBellFill>
        </div>

        <Dropdown>
          <Dropdown.Toggle
            className=" bg-light text-dark dark d-flex align-items-center border-0 z-10 text-start "
            variant="success"
            id="dropdown-basic"
          >
            {" "}
            <div>
              {" "}
              <div className="profile-photo pe-2">
                <img
                  className="img-thumbnail"
                  src={userProfile.data.image_url}
                  alt=""
                />
              </div>
            </div>
            <div>
              <h6>
                {userProfile.data.first_name}
                {userProfile.data.last_name}
              </h6>
              <div className="font-15">{userProfile.data.email}</div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100 bg-light mt-1 ">
            <Dropdown.Item>
              {" "}
              <Link to={"/admin/profile"} className="path-text  ">
                Profile
              </Link>{" "}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => logOut()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </section>
  );
};

export default Navbar;
