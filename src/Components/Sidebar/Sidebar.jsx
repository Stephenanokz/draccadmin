import React, { useState } from "react";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CollectionsIcon from "@mui/icons-material/Collections";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("home");

  const handleClick = (item) => {
    setActive(item);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <span className="h-rule"></span>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={
                  active === "home"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("home")}
              >
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/carouselimages" className="link">
              <li
                className={
                  active === "carouselImages"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("carouselImages")}
              >
                <BurstModeIcon className="sidebarIcon" />
                Carousel Images
              </li>
            </Link>
            <Link to="/galleryimages" className="link">
              <li
                className={
                  active === "galleryImages"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("galleryImages")}
              >
                <CollectionsIcon className="sidebarIcon" />
                Gallery Images
              </li>
            </Link>
            <Link to="/posts" className="link">
              <li
                className={
                  active === "posts"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("posts")}
              >
                <NewspaperIcon className="sidebarIcon" />
                Posts
              </li>
            </Link>
            <Link to="/rooms" className="link">
              <li
                className={
                  active === "rooms"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("rooms")}
              >
                <BusinessIcon className="sidebarIcon" />
                Rooms
              </li>
            </Link>
            <Link to="/services" className="link">
              <li
                className={
                  active === "services"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("services")}
              >
                <HomeRepairServiceIcon className="sidebarIcon" />
                Services
              </li>
            </Link>
            <Link to="/logout" className="link">
              <li
                className={
                  active === "logout"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("logout")}
              >
                <LogoutIcon className="sidebarIcon" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
