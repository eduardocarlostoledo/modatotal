import React from "react";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import "../styles/ItemCart.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteOneCart,
  getCart,
  update,
} from "../redux/actions/CartActions";
import swal from "sweetalert";

export default function ItemCart({
  name,
  image,
  price,
  product,
  amount,
  prodId,
  handleDeleteAllCart,
}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAdd = () => {
    console.log(product);
    if (product.stock <= amount) {
      swal("Stock limit", "", "error");
      return null;
    }
    dispatch(addToCart({ name, image, price }));
    dispatch(update(true)); //2 a 3
  };

  const handleDelete = () => {
    dispatch(getCart());
    if (amount === 1 && cart.length === 1) handleDeleteAllCart();
    dispatch(deleteOneCart(prodId));
    dispatch(update(true)); //elimina va restando
  };

  return (
    <div className="DivAllCards">
      <div className="contenedor_card">
        <Link className="LinkImage" to={`/detail/${name}`}>
          <div className="card_contenedor_img">
            <img className="Imagen" src={image} alt={name} />
          </div>
        </Link>
        <p className="card_p_nombre">{name}</p>
        <strong className="card_strong_precio">$ {price}</strong>
        
        <div className="ContainerSumRest">
          <button className="Restar" onClick={() => handleDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path fillRule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
          </button>
          <p>{amount}</p>
          <button className="Sumar" onClick={() => handleAdd()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
          </button>
        </div>
        
        <div className="ContainerSumRestResponsive">
          <button onClick={() => handleDelete()} className="buttonRes">
            <AiOutlineMinus />
          </button>
          <p className="pResponsive"><strong>{amount}</strong></p>
          <button onClick={() => handleAdd()} className="buttonRes">
            <IoIosAdd />
          </button>
        </div>
      </div>
    </div>
  );
}
