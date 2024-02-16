import { useState } from "react";
import './form.css'

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    item: "",
    price: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

return (
  <>
      <div className="form-container">
        <form action="" onSubmit={handleSubmit}>
          <div className="header">
            <h2>CREATE BILL</h2>
          </div>
          <div className="field-container">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
          </div>
          <div className="field-container">
            <label htmlFor="item">Item</label>
            <input type="text" id="item" name="item" value={formData.item} onChange={handleChange} required/>
          </div>
          <div className="field-container">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required/>
          </div>
          <input type="submit" value="Submit" className="btn" />
        </form>
      </div>
  </>
);
};

export default Form
