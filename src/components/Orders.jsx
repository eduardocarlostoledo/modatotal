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

  const filteredOrders = orders
    .filter((order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
  <>
    {/* Tabla para desktop */}
    <table className="Orders-table">
      <thead>
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
        {filteredOrders.map((order, index) => (
          <tr key={order.id}>
            <td>{index + 1}</td>
            <td>{order.id}</td>
            <td><span className={`Orders-status ${order.status}`}>{order.status}</span></td>
            <td><span className={`Orders-status ${order.estadoEnvio}`}>{order.estadoEnvio}</span></td>
            <td>${order.total_order_price}</td>
            <td>{order.buyer_name} {order.buyer_lastname} ({order.buyer_email})</td>
            <td>{order.payment_type}</td>
            <td>
              <ul>
                {order.products.map((p) => (
                  <li key={p.prodId}>
                    <img className="Orders-productImage" src={p.product_image.secure_url} alt={p.product_name} />
                    <span>{p.product_name} - ${p.product_unit_price} x {p.product_amount}</span>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Vista mobile: tarjetas */}
    <div className="Orders-mobile">
      {filteredOrders.map((order, index) => (
        <div className="Orders-card" key={order.id}>
          <h3>Orden #{index + 1}</h3>
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Estado:</strong> <span className={`Orders-status ${order.status}`}>{order.status}</span></p>
          <p><strong>Envío:</strong> <span className={`Orders-status ${order.estadoEnvio}`}>{order.estadoEnvio}</span></p>
          <p><strong>Total:</strong> ${order.total_order_price}</p>
          <p><strong>Comprador:</strong> {order.buyer_name} {order.buyer_lastname}</p>
          <p><strong>Email:</strong> {order.buyer_email}</p>
          <p><strong>Pago:</strong> {order.payment_type}</p>
          <p><strong>Productos:</strong></p>
          <ul>
            {order.products.map((p) => (
              <li key={p.prodId}>
                <img className="Orders-productImage" src={p.product_image.secure_url} alt={p.product_name} />
                <span className="Orders-productInfo">{p.product_name} - ${p.product_unit_price} x {p.product_amount}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </>
) : (
  <p>No tienes órdenes realizadas.</p>
)}


    </div>
  );
};
