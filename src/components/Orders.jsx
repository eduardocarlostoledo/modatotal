import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderByUser } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css"; // Importa el archivo CSS

export const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const usuarioConectado = useSelector((state) => state.users.userActive) || {};
  
  console.log("Usuario conectado: orders", usuarioConectado);
  const orders = useSelector((state) => state.orders.ordersByUser) || [];

  // console.log("Orders:", orders);
  // console.log("User:", usuarioConectado);
  
  useEffect(() => {
    if (!usuarioConectado.id || !localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(orderByUser(usuarioConectado.id));
    }
  }, [dispatch, usuarioConectado.id, navigate]);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container" style={{ marginTop: "160px" }}>
      <h1 className="title">Mis Órdenes</h1>
      <input
        type="text"
        placeholder="Buscar órdenes por ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      {filteredOrders.length > 0 ? (
        <table className="table">
          <thead style={{ color: "white" }}>
            <tr>
            <th>#</th>
              <th>Order ID</th>
              <th>Estado</th>
              <th>Enviado</th>
              <th>Total</th>
              <th>Comprador</th>
              <th>Método de Pago</th>
              <th>Productos</th>
            </tr>
          </thead>
          <tbody>
            
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td></td>
                <td>{order.id}</td>
                <td>
                  <span className={`status ${order.status}`}>{order.status}</span>
                </td>
                <td>
                  <span className={`status ${order.estadoEnvio}`}>{order.estadoEnvio}</span>
                </td>
                <td>${order.total_order_price}</td>
                <td>{order.buyer_name} {order.buyer_lastname} ({order.buyer_email})</td>
                <td>{order.payment_type}</td>
                <td>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.prodId}>
                        <img
                          src={product.product_image.secure_url}
                          alt={product.product_name}
                          className="productImage"
                        />
                        <p>
                          {product.product_name} - ${product.product_unit_price} x{" "}
                          {product.product_amount}
                        </p>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes órdenes realizadas.</p>
      )}
    </div>
  );
};