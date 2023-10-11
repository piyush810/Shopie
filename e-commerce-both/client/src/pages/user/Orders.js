import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import toast from "react-hot-toast";

const Orders = () => {
  // const host="http://localhost:8080";
  const host=process.env.REACT_APP_BACKEND_URL;

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${host}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    
    try {
      const { data } = await axios.delete(
        `${host}/api/v1/order/delete-order/${pId}`);
      
      if (data.success) {
        toast.success("Order is deleted");

        getOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  

// for cash on delivry
  useEffect(() => {
    if (auth) getOrders();
  }, [auth]);
  // useEffect(() => {
  //   if (auth?.token) getOrders();
  // }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
             
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : o?.payment}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${host}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p >{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                       
                        
                       
                      </div>
                      
                    ))}
                   
                  </div>
                  <div className="mb-3">
            <button className="btn btn-danger" onClick={()=>handleDelete(o._id) }>
              DELETE ORDER
            </button>
          </div>
                </div>
               
              );
            })
           
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
