import React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CallIcon from "@mui/icons-material/Call";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link, useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AllUsers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [showVideo, setShowVideo] = useState(false);
  const [docserver, setDocserver] = useState(
    "http://localhost:8090/mynetworkdocs/"
  );

  useEffect(() => {
    getAllusersData();
    handleSearch();
  }, []);

  //function for get the data from database
  const getAllusersData = (id) => {
    fetch("http://localhost:8090/MynetworkManager/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log("get data successfull");
        setData(data);
      })
      .catch((eror) => {
        console.log(eror, "something went wrong");
      });
  };

  //functional code for search

  useEffect(() => {
    setFilteredEntries(
      data.filter(
        (entry) =>
          entry.username.toLowerCase().includes(searchText.toLowerCase()) ||
          entry.designation.toLowerCase().includes(searchText.toLowerCase()) ||
          entry.city.toLowerCase().includes(searchText.toLowerCase()) ||
          entry.lookingtoconnectwith
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          entry.businesscategory
            .toLowerCase()
            .includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  const handleSearch = () => {
    const userInfo = "http://localhost:8090/MynetworkManager/profile";
    fetch(userInfo)
      .then((response) => response.json())
      .then((responseJson) => {
        try {
          console.log(" Send data successful !");
          setData(responseJson);
          // setOldData(responseJson);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.error("Error get profile:", error);
      });
  };

  //function for delete
  const handleDelete = async (id) => {
    // setLoading(true);
    try {
      console.log(id);
      // Send a DELETE request to the server
      const res = await fetch(
        `http://localhost:8090/MynetworkManager/profile/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      // Handle success/error response from server
      if (data.success) {
        console.log("Record deleted successfully");
        // Remove the deleted record from the UI (you can use state management for this)
      } else {
        console.error("Error deleting record");
      }
    } catch (error) {
      console.error("Error connecting to server", error);
    } finally {
      // setLoading(false);
    }
    // window.location.reload(true);
  };

  return (
    <>
      {/* <div className="sidebar-space"></div> */}
      <div className="sidebar-distance">
        <nav className="navbar-page">
          <h4>All Users</h4>
        </nav>

        <div className="main-body-containt">
          <div className="input-group">
            <div className="form-outline">
              <div className="form-all">
                <SearchIcon className="search-icon-all" />
                <input
                  id="search-input-all"
                  type="search"
                  placeholder="Search User Name, Designation, City, Business Category or Looking to Connect with "
                  className="form-control"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          {filteredEntries.map((item) => (
            <div key={item.id} className="all-user-form">
              <div className="profile-all">
                <div className="image_logo-all">
                  <img
                    src={docserver + item.photo.docpath}
                    className="avatar-all"
                    alt="Avatar"
                  />
                </div>
                <div className="title-all">
                  <h6>{item.designation}</h6>
                  <h6>{item.company}</h6>
                </div>
              </div>
              <div className="details-all">
                <div>
                  <h4>{item.username}</h4>
                </div>
                <div className="content-all-details">
                  <p>{item.website}</p>
                </div>
                <div className="content-all-details">
                  <p>{item.businesscategory}</p>
                </div>
                <div
                  className="content-all-details"
                  style={{ display: "flex" }}
                >
                  <span>
                    <EmailIcon className="icons-all" />
                  </span>
                  <p>{item.email}</p>
                </div>
                <div
                  className="content-all-details"
                  style={{ display: "flex" }}
                >
                  <span>
                    <LocationOnIcon className="icons-all" />
                  </span>
                  <p>{item.city}</p>
                </div>
              </div>
              <div className="contact-all">
                <div className="contact-all-details">
                  {item.mobile ? (
                    <>
                      <span>
                        <CallIcon className="icons-all" />
                      </span>
                      <p>{item.mobile}</p>
                    </>
                  ) : null}
                </div>
                <div className="contact-all-details">
                  {item.whatsapp ? (
                    <>
                      <span>
                        <WhatsAppIcon className="icons-all" />
                      </span>
                      <p>{item.whatsapp}</p>
                    </>
                  ) : null}
                </div>
                <div className="contact-all-details">
                  {item.instagram ? (
                    <>
                      <span>
                        <InstagramIcon className="icons-all" />
                      </span>
                      <p>{item.instagram}</p>
                    </>
                  ) : null}
                </div>
                <div className="contact-all-details">
                  {item.linkedin ? (
                    <>
                      <span>
                        <LinkedInIcon className="icons-all" />
                      </span>
                      <p>{item.linkedin}</p>
                    </>
                  ) : null}
                </div>
                <div className="contact-all-details">
                  {item.address ? (
                    <>
                      <span>
                        <LocationOnIcon className="icons-all" />
                      </span>
                      <p className="address-para">{item.address}</p>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="button-all">
                {showVideo ? (
                  <div className="video-modal">
                    <span
                      className="all-video-close"
                      aria-hidden="true"
                      onClick={() => setShowVideo(false)}
                    >
                      {" "}
                      <CloseIcon />{" "}
                    </span>
                    <video
                      style={{
                        height: "212px",
                        width: "270px",
                        " margin-top": " 30px",
                        "margin-left": "-1px",
                      }}
                      className="all-video"
                      controls
                    >
                      <source
                        src={docserver + item?.video.docpath}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : (
                  <>
                    <div>
                      <a
                        href={docserver + item?.businesscard.docpath}
                        target="_blank"
                      >
                        <RecentActorsIcon
                          fontSize="large"
                          className="icons-button-all"
                        />
                      </a>
                      <span className="connect-icon">
                        <span class="tooltip">{item.lookingtoconnectwith}</span>

                        <FontAwesomeIcon
                          icon={faInfo}
                          className="connection-icon"
                          style={{ padding: "10px" }}
                        />
                      </span>
                    </div>

                    <div>
                      <PlayCircleIcon
                        onClick={() => setShowVideo(true)}
                        fontSize="large"
                        className="icons-button-all"
                      />
                      <DeleteIcon
                        onClick={handleDelete}
                        fontSize="large"
                        className="icons-button-all"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default AllUsers;
