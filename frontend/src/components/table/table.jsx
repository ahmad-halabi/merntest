import "./table.css";
import { useEffect, useState } from "react";
import Loader from "../loader/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Table = () => {
  const [resData, setresData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch resData
  useEffect(() => {
    fetch("https://mern-server-ymrp.onrender.com/bills")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((resData) => {
        setresData(resData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteClick = (event) => {
    const trElement = event.currentTarget.closest("tr");
    if (trElement) {
      const key = trElement.getAttribute("data-key");
      console.log(key);
      handleDeleteById(key, event);
    }
  };

  const handleDeleteById = async (key, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/bills/${key}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response from express js", data);
        window.location.reload();
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = resData.filter((data) => {
    return data.name.includes(searchQuery);
  });
  console.log(resData);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <input
        type="text"
        id="searchInput"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>ITEM</th>
            <th>PRICE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr className="spacer-row"></tr>
          {filteredData.map((item) => (
            <tr key={item._id} data-key={item._id}>
              <td>{item.name}</td>
              <td>{item.item}</td>
              <td>{item.price}</td>
              <td>
                <div className="icons">
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={handleDeleteClick}
                    title="Delete"
                    className="delete-button"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
