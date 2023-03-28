import React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { modal, Button, Modal } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryManagment = () => {
  let i = 1;
  //below code for api calling

  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  // const [data, setData] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // handleSubmit();
    getCategoryData();
    handleSearch();
  }, []);

  //functional code for search

  useEffect(() => {
    setFilteredEntries(
      data.filter((entry) =>
        entry.category.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  const handleSearch = () => {
    const userInfo = "http://localhost:8090/MynetworkManager/category";
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
      // Send a DELETE request to the server
      const res = await fetch(
        `http://localhost:8090/MynetworkManager/category/${id}`,
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
  //function for get the data from database
  const getCategoryData = () => {
    fetch("http://localhost:8090/MynetworkManager/category")
      .then((res) => res.json())
      .then((data) => {
        console.log("get data successfull");
        setData(data);
      })
      .catch((eror) => {
        console.log(eror, "something went wrong");
      });
  };

  //function for the send the data to the database
  const handleSubmit = (e) => {
    let sendData = {
      category: input,
    };
    console.log(input);
    fetch("http://localhost:8090/MynetworkManager/category", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Send data successfull");
        // setData(data);
      })
      .catch((eror) => {
        console.log(eror, "something went wrong");
      });
    window.location.reload(true);
  };

  const getInputValue = () => {
    // show the user input value to console
    console.log(input);
  };

  //script for add button

  const [isShow, invokeModal] = useState(false);

  const initModal = () => {
    return invokeModal(!isShow);
  };

  return (
    <>
      <div className="sidebar-distance">
        <nav className="navbar-page">
          <h4>Category Managment</h4>
        </nav>

        <div className="flex-content">
          <div className="input-group">
            <div className="form-outline">
              <div className="form">
                <SearchIcon className="search-icon" />
                <input
                  id="search-input"
                  type="search"
                  placeholder="Search Category here"
                  className="form-control"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <!-- Button trigger modal --> */}
          <button onClick={initModal} className="add-btn">
            Add
          </button>
          {/* <!-- Modal --> */}

          <Modal show={isShow}>
            <Modal.Header closeButton onClick={initModal}>
              <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <input
                id="add-input"
                type="text"
                autoComplete="off"
                placeholder="Type Category here"
                onChange={(e) => setInput(e.target.value)}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={initModal}>
                Close
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="div-table">
          <table border="1px" className="table">
            <thead className="table-heading">
              <th>Sr. No.</th>
              <th>Category</th>
              <th>Delete</th>
            </thead>

            <tbody>
              {filteredEntries.map((item) => (
                <tr key={item.id}>
                  <td>{i++}</td>
                  <td>{item.category}</td>
                  <td>
                    <DeleteIcon
                      className="delete-icon"
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoryManagment;
