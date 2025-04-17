import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderByUser } from "../redux/slices/orderSlice"; // Importar la acción
import swal from "sweetalert";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true); // Estado para el cargando
  const [orderDetails, setOrderDetails] = useState(null);

  const orders = useSelector((state) => state.orders.ordersByUser) || [];
  const isAuthenticated = useSelector((state) => state.users.userActive) || {};

  useEffect(() => {
    // Obtener los parámetros de la URL
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");
    const status = queryParams.get("status");
    const merchantOrderId = queryParams.get("merchant_order_id");

    if (paymentId && status && merchantOrderId) {
      // Verificar si el usuario está autenticado
      if (!isAuthenticated?.id) {
        navigate("/login"); // Si el usuario no está autenticado, redirigir al login
        return;
      }

      // Buscar las órdenes del usuario
      dispatch(fetchOrdersByUser(isAuthenticated.id)); // Disparar la acción para obtener las órdenes

      // Buscar la orden por `merchantOrderId`
      const order = orders.find((order) => order.merchant_order_id === merchantOrderId);

      if (order) {
        setOrderDetails(order);
        setIsLoading(false); // Dejar de mostrar el loader
      } else {
        swal("Error", "No se encontró la orden", "error");
        navigate("/cart"); // Si no se encuentra la orden, redirigir al carrito
      }
    } else {
      // Si no hay parámetros válidos, redirige al carrito
      navigate("/cart");
    }
  }, [location, navigate, dispatch, isAuthenticated.id, orders]);

  return (
    <div className="text-center success-page">
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        orderDetails && (
          <div>
            <h1>Proceso de Pago Completo</h1>
            <h3>Detalles de la Orden</h3>
            <p><strong>ID del Pago:</strong> {orderDetails.payment_id}</p>
            <p><strong>Estado:</strong> {orderDetails.status}</p>
            <p><strong>ID de la Orden:</strong> {orderDetails.merchant_order_id}</p>
            <p><strong>Total de la Orden:</strong> ${orderDetails.total_order_price}</p>

            <h4>Productos:</h4>
            <ul>
              {orderDetails.products.map((product) => (
                <li key={product.prodId}>
                  <img src={product.product_image.secure_url} alt={product.product_name} width="50" />
                  <p>{product.product_name} - ${product.product_unit_price} x {product.product_amount}</p>
                </li>
              ))}
            </ul>
            <p>Gracias por tu compra.</p>
          </div>
        )
      )}
    </div>
  );
}
