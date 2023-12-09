import React from "react";
import { Link } from "react-router-dom";
// import ProductList from "./ProductList";

function AddProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const AddProduct = async () => {

    console.warn(!name);
    if (!name || !price || !category || !company) {
        setError(true)
      return false;
    }

    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.warn(result);
  };
  return (
    <div className="product">
      <h1>Add More Product</h1>
      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        placeholder="Enter Product Name"
      />
      {error && !name && <span className="invalid-input">Enter valid name</span>}
      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
        placeholder="Enter Product Price"
      />
            {error && !price && <span className="invalid-input">Enter valid price</span>}

      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
        placeholder="Enter Product Category"
      />
            {error && !category && <span className="invalid-input">Enter valid category</span>}

      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
        placeholder="Enter Product Company"
      />
            {error && !company && <span className="invalid-input">Enter valid Company-name</span>}

      <button className="button" onClick={AddProduct} type="button"><Link to="/" style={{color:"white",textDecoration:"none"}}>Add Product</Link></button>
    </div>
  );
}

export default AddProduct;
