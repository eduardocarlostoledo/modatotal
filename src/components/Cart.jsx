import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cart.css";
import swal from "sweetalert";
import ItemCart from "./ItemCart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteAllFromCart } from "../redux/slices/cartSlice.js";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mercadoPagoInstance, setMercadoPagoInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el loader
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null);

  const userActive = useSelector((state) => state.users.userActive);
  const fetchData = useSelector((state) => state.cart.items) || [];
  const products = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    if (!userActive?.id || !userActive.email || !userActive) {
      navigate("/login");
    } else {
      dispatch(getCart(userActive.id));
    }
  }, [userActive, navigate, dispatch]);

  useEffect(() => {
    if (!window.MercadoPago) {
      console.error("MercadoPago SDK no está disponible.");
      return;
    }
    setMercadoPagoInstance(
      new window.MercadoPago(import.meta.env.VITE_APP_MERCADOPAGO, {
        locale: "es-AR",
      })
    );
  }, []);

  const total = fetchData
    .reduce((acc, item) => acc + item.price * item.amount, 0)
    .toFixed(1);

  const preferencia = fetchData.map((item) => ({
    product_description: item.name,
    product_name: item.name,
    product_image: item.image,
    product_amount: item.amount,
    product_unit_price: item.price,
    prodId: item.id,
  }));

  const description = fetchData.map((item) => item.name).join(", ");

  const orderData = {
    quantity: 1,
    description: description?.toString(),
    price: total,
    total_order_price: total,
    datos_Comprador: userActive,
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!fetchData.length) {
      swal("Cart is empty", "Cart is empty", "error");
      return;
    }
    if (!userActive) {
      swal("You must log in to buy!", "You must log in to buy!", "error");
      navigate("/login");
      return;
    }
    setIsButtonVisible(false);

    try {
      setIsLoading(true); // Activar el loader

      const response = await fetch(
        `${import.meta.env.VITE_APP_BACK}/pay/create_preference`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderData, preferencia }),
        }
      );

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error("Error al crear la preferencia de pago");
      }

      // Obtener los datos de la respuesta
      const data = await response.json();

      if (!data.id) {
        throw new Error("No se recibió un ID de preferencia válido");
      }
      createCheckoutButton(data.id);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      swal(
        "Error",
        "Hubo un problema al procesar el pago, contacta con soporte",
        "error"
      );
      setIsLoading(false); // Desactivar el loader en caso de error
      setIsButtonVisible(true);
    }
  };

  const createCheckoutButton = (preferenceId) => {
    console.log("iniciando checkout", preferenceId);
    setIsLoading(false); // Desactivar el loader
    if (!mercadoPagoInstance) {
      console.error("MercadoPago no está inicializado.");
      return;
    }

    mercadoPagoInstance.checkout({
      preference: {
        id: preferenceId,
      },
      autoOpen: true, // Evita el error de instanciación
      render: {
        container: "#button-checkout",
        label: "Pagar con MercadoPago",
      },
    });
  };

  return (
    <div className="carritoCompras">
      {fetchData.length === 0 ? (
        <div className="empty-state">
          <p className="EmptyP">Carrito Vacío</p>
          <Link to="/Products">
            <button className="buttonIrTienda">Ir a la Tienda</button>
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          {fetchData.map((item, index) => (
            <div key={index} className="cart-card">
              <ItemCart
                name={item?.name}
                price={item?.amount * item?.price}
                amount={item?.amount}
                image={item?.image.secure_url}
                prodId={item?.id}
                product={products.find((prod) => prod.name === item.name) || {}}
              />
            </div>
          ))}
        </div>
      )}
      <div className="botones_de_pago">
        <div className="BotonCheckout">
          {isButtonVisible && fetchData.length !== 0 && (
            <button className="ButtonCart" onClick={handleCheckout}>
              Pagar MercadoPago
            </button>
          )}
          {isLoading && <div className="loader"></div>}
          <div id="button-checkout"></div>
        </div>
        {fetchData.length !== 0 && (
          <button
            className="ButtonDeleteAll"
            onClick={() => dispatch(deleteAllFromCart(userActive.id))}
          >
            Vaciar Carrito
          </button>
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import mercadopago from "../components/mercadopago/mercadopago.js";
// import "../styles/Cart.css";
// import swal from "sweetalert";
// import ItemCart from "./ItemCart.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart, deleteAllFromCart } from "../redux/slices/cartSlice.js";

// export default function Cart() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Estados y selectores
//   const [isButtonVisible, setIsButtonVisible] = useState(true);
//   const userActive = useSelector((state) => state.users.userActive);
//   //console.log("estate.users.userActive",userActive);
//   const fetchData = useSelector((state) => state.cart.items) || [];
//   console.log("state.cart.items",fetchData);
//   const products = useSelector((state) => state.products.allProducts);
//   //console.log("state.products.allproducts ",products);

//   // Obtener el carrito cuando el componente se monta o cuando userActive cambia
//   useEffect(() => {
//     if (!userActive?.id) {
//       navigate("/login");
//     } else {
//       let userId = userActive.id;
//       dispatch(getCart(userId));
//     }
//   }, [userActive, navigate, dispatch]);

//   // Calcular el total del carrito
//   const total = fetchData
//     .reduce((acc, item) => acc + item.price * item.amount, 0)
//     .toFixed(1);
// //console.log("total",total);
//   // Crear la preferencia de pago

//   const preferencia = fetchData.map((item) => ({
//     product_description: item.name,
//     product_name: item.name,
//     product_image: item.image.secure_url,
//     product_amount: item.amount,
//     product_unit_price: item.price,
//     prodId: item.id,
//     total_order_price: total,
//     buyer_email: userActive?.email,
//   }));
//   console.log("preferencia",preferencia);

//   const description = fetchData.map((item) => item.name).join(", ");
//   preferencia.push({
//     total_order_price: total,
//     buyer_email: userActive?.email,
//   });

//   const orderData = {
//     quantity: 1,
//     description,
//     price: total,
//   };

//   // Manejar el proceso de pago
//   const handleCheckout = (e) => {
//     e.preventDefault();
//     if (!fetchData.length) {
//       swal("Cart is empty", "Cart is empty", "error");
//     } else if (userActive === null) {
//       swal("You must log in to buy!", "You must log in to buy!", "error");
//       navigate("/login");
//     } else {
//       setIsButtonVisible(false);

//       // Crear la preferencia de pago
//       const preferencia = fetchData.map((item) => ({
//         product_description: item.name,
//         product_name: item.name,
//         product_image: item.image,
//         product_amount: item.amount,
//         product_unit_price: item.price,
//         prodId: item.id,
//       }));

//       // Agregar el total y el email del comprador
//       preferencia.push({
//         total_order_price: total,
//         buyer_email: userActive.email,
//       });

//       // Enviar la preferencia al backend
//       fetch(`${import.meta.env.VITE_APP_BACK}/pay/preference`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(preferencia),
//       })
//         .then((response) => response.json())
//         .then((preference) => {
//           createCheckoutButton(preference.id);
//         })
//         .catch(() => {
//           swal("Unexpected error", "Error creating payment preference", "error");
//         });
//     }
//   };

//   // Crear el botón de pago de MercadoPago
//   const createCheckoutButton = (preferenceId) => {
//     mercadopago.checkout({
//       preference: {
//         id: preferenceId,
//       },
//       render: {
//         container: "#button-checkout",
//         label: "Pagar con MercadoPago",
//       },
//     });
//   };

//   // Vaciar el carrito
//   const handleDeleteAllCart = async () => {
//     try {
//       if (userActive?.id) {
//         const response = await fetch(`${import.meta.env.VITE_APP_BACK}/cart/deletecart`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Asegúrate de enviar el token
//           },
//           body: JSON.stringify({ userId: userActive.id }), // Enviar el userId en el cuerpo de la solicitud
//         });

//         if (response.ok) {
//           dispatch(deleteAllFromCart(userActive.id)); // Actualizar el estado de Redux
//           swal("Cart is empty", "Cart is empty", "success");
//         } else {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Error al vaciar el carrito");
//         }
//       } else {
//         swal("Error", "User not found", "error");
//       }
//     } catch (error) {
//       console.error("Error deleting cart:", error);
//       swal("Error", error.message, "error");
//     }
//   };

//   return (
//     <div className="carritoCompras">
//       {fetchData.length === 0 ? (
//         <div>
//           <p className="EmptyP">Carrito Vacío</p>
//           <Link to="/Products">
//             <button className="buttonIrTienda">Ir a la Tienda</button>
//           </Link>
//         </div>
//       ) : (
//         <div className="cart-grid">
//           {fetchData.map((item, index) => (
//             <div key={index} className="cart-card" >
//               <ItemCart

//                 name={item?.name}
//                 price= { item?.amount * item?.price }
//                 amount={item?.amount}
//                 image={item?.image.secure_url}
//                 prodId={item?.id}
//                 product={products.find((prod) => prod.name === item.name) || {}}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="botones_de_pago">
//         <div className="BotonCheckout">
//           {isButtonVisible && fetchData.length !== 0 && (
//             <button className="ButtonCart" onClick={handleCheckout}>
//               Pagar MercadoPago
//             </button>
//           )}
//           <div id="button-checkout"></div>
//         </div>
//       </div>
//       <button className="ButtonDeleteAll" onClick={handleDeleteAllCart}>
//         Vaciar Carrito
//       </button>
//     </div>
//   );
// }
