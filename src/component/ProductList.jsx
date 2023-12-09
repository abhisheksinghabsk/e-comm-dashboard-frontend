import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
    const searchHandle=async (event)=>{
       let key= event.target.value;
       if (key) {
               
       let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
       });
       result =await result.json();
       if(result){
        setProducts(result)
       }
    }else{
        getProducts()
    }
    }
  return (
    <div className="product-list">
      <h1>Product List</h1>
        <input type="text" className="search-input" placeholder="Search product" onChange={searchHandle}/>
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length>0 ? products.map((item, index) => 
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>$ {item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)} style={{border:".5px solid red",padding:"1px",borderRadius:"5px",color:"red",background:"none"}}>Delete</button>
            <Link to={"update/"+item._id} style={{textDecoration:"none", color:"green"}}>&nbsp;Update</Link>
          </li>
        </ul>
      ):<h1>No Result Found</h1>
      }
    </div>
  );
}

export default ProductList;
