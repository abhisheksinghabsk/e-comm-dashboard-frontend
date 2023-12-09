import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  },[]);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const UpdateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, company, price, category }),
      headers: {
        "Content-type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result=await result.json()
    console.warn(result);
    navigate('/');
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        placeholder="Enter Product Name"
      />

      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
        placeholder="Enter Product Price"
      />

      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
        placeholder="Enter Product Category"
      />

      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
        placeholder="Enter Product Company"
      />

      <button className="button" onClick={UpdateProduct} type="button">Update Product
       {/* <Link to={<update/> }>Update Product</Link> */}
      </button>
    </div>
  );
};

export default UpdateProduct;
