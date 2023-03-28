import React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { modal, Button, Modal } from "react-bootstrap";

function BusinessInsights() {
  const [isShow, invokeModal] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [docserver, setDocserver] = useState(
    "http://localhost:8090/mynetworkdocs/"
  );

  const [file, setFile] = useState(null);
  let userid = 2050;
  let typename = selectedOption.toUpperCase();

  // show the user input value to console
  console.log(input);
  console.log(description);
  console.log(typename);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    console.log(file);
    const dataData = new FormData();
    dataData.append("name", userid + "/" + typename);
    dataData.append("doc", file);
    if (typename === "IMAGE") {
      try {
        const response = await fetch(
          "http://localhost:8090/MynetworkManager/profile/images/upload",
          {
            method: "POST",
            body: dataData,
          }
        );

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (typename === "VIDEO") {
      try {
        const response = await fetch(
          "http://localhost:8090/MynetworkManager/profile/videos/upload",
          {
            method: "POST",
            body: dataData,
          }
        );

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getInsightData();
    handleSearch();
  }, []);

  //function for send the data from the  user to database
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }
    if (!input || !description || !selectedOption) {
      alert("All fields are required");
      return;
    }
    handleUpload();

    let sendData = {
      title: input,
      type: "BUSINESS_INSIGHT",
      filetype: typename,
      imgvideofile: {
        docpath: userid + "/" + typename + "/" + file.name,
        docname: file.name,
        docdesc: "",
        doctype: typename,
      },
      description: description,
    };
    console.log(input);
    fetch("http://localhost:8090/MynetworkManager/newsandvideos ", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Send data successfull");
      })
      .catch((eror) => {
        console.log(eror, "something went wrong");
      });
    window.location.reload(true);
  };

  //function for get the data from database
  const getInsightData = () => {
    fetch(
      "http://localhost:8090/MynetworkManager/newsandvideos?type=BUSINESS_INSIGHT"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("get data successfull");
        setData(data);
      })
      .catch((eror) => {
        console.log(eror, "something went wrong");
      });
  };
  //function for get imag and videos  data from database

  //function for delete
  const handleDelete = async (id) => {
    // setLoading(true);
    try {
      // Send a DELETE request to the server
      console.log(id);
      const res = await fetch(
        `http://localhost:8090/MynetworkManager/newsandvideos/${id}`,
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
    window.location.reload(true);
  };

  //functional code for search

  useEffect(() => {
    setFilteredEntries(
      data.filter((entry) =>
        entry.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  const handleSearch = () => {
    const userInfo =
      "http://localhost:8090/MynetworkManager/newsandvideos?type=HOWTOVIDEO";
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

  //For selecting the file image and videos

  //function for the pop-up
  const initModal = () => {
    return invokeModal(!isShow);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="sidebar-distance">
      {" "}
      <nav className="navbar-page">
        <h4>Business Insights</h4>
      </nav>
      <div className="main-body-containt">
        <div className="flex-content-insight">
          <div className="input-group">
            <div className="form-outline">
              <div className="form-insight">
                <SearchIcon className="search-icon-insight" />
                <input
                  id="search-input-insight"
                  type="search"
                  placeholder="Search by Title "
                  className="form-control"
                  autoComplete="off"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <!-- Button trigger modal --> */}
          <button onClick={initModal} className="add-btn-insight">
            Add
          </button>
          {/* <!-- Modal --> */}

          <Modal show={isShow}>
            <Modal.Header closeButton onClick={initModal}>
              <Modal.Title>Add Business Insights</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <input
                id="add-input"
                type="text"
                autoComplete="off"
                placeholder="Type Title here"
                onChange={(e) => setInput(e.target.value)}
              />

              <input
                id="add-input-insight"
                type="text"
                autoComplete="off"
                placeholder="Type Description here"
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                className="selector-type"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">Select an option</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>

              {typename === "IMAGE" ? (
                <input
                  className="file-name"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
              ) : typename === "VIDEO" ? (
                <input
                  className="file-name"
                  type="file"
                  accept=" video/*"
                  onChange={onFileChange}
                />
              ) : null}
              {error && <p className="error">{error}</p>}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="none" onClick={initModal}>
                Close
              </Button>
              <Button className="modal-submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="insight-container">
          {filteredEntries.map((item) => (
            <div className="insight-content" key={item.id}>
              <div className="insight-details">
                <div className="insight-title">
                  <h5>{item.title}</h5>
                </div>
                <div className="video-image">
                  {item.filetype === "VIDEO" ? (
                    <video width="325" height="200" controls>
                      <source
                        src={docserver + item.imgvideofile.docpath}
                        type="video/mp4"
                      />
                    </video>
                  ) : item.filetype === "IMAGE" ? (
                    <img
                      className="video-image"
                      width="325"
                      height="200"
                      src={docserver + item.imgvideofile.docpath}
                    />
                  ) : null}
                </div>
                <div className="description">
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="insight-delete-btn">
                <button
                  className="delete-insight-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessInsights;
