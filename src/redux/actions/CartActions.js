import axiosClient from "../../herramientas/clienteAxios.js"

export const GET_CART = 'GET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART';
export const DELETE_ONE_CART = 'DELETE_ONE_CART';
export const POST_CART = 'POST_CART';
export const GET_UPDATE = 'GET_UPDATE';
export const UPDATE = 'UPDATE';

export const getCart = () => async (dispatch) => {
    try {
        const response = await axiosClient('/cart');
        dispatch({ type: GET_CART, payload: response.data });
    } catch (error) {
        console.error('Error fetching cart:', error);
        // Puedes despachar una acción de error si lo deseas
    }
};

export const addToCart = (payload) => async (dispatch) => {
    try {
        const response = await axiosClient.post('/cart', payload);
        dispatch({ type: ADD_TO_CART, payload: response.data });
        dispatch(getCart());  // Actualiza el carrito inmediatamente después
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};


export const deleteOneCart = (prodId) => async (dispatch) => {
    try {
        const response = await axiosClient.delete(`/cart/${prodId}`);
        dispatch({ type: DELETE_ONE_CART, payload: response.data });
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        // Puedes despachar una acción de error si lo deseas
    }
};

export const deleteAllFromCart = () => async (dispatch) => {
    try {
        const response = await axiosClient.delete('/cart/');
        dispatch({ type: DELETE_ALL_FROM_CART, payload: response.data });
    } catch (error) {
        console.error('Error deleting all from cart:', error);
        // Puedes despachar una acción de error si lo deseas
    }
};

export const postCart = (payload, preferenceId) => async (dispatch) => {
    try {
        const response = await axiosClient.post('/cart', payload);
        dispatch({ type: POST_CART, payload: { cart: response.data, preferenceId } });
    } catch (error) {
        console.error('Error posting cart:', error);
        // Puedes despachar una acción de error si lo deseas
    }
};

export const getUpdate = () => (dispatch) => {
    dispatch({ type: GET_UPDATE });
};

export const update = (update) => (dispatch) => {

    dispatch({ type: UPDATE, payload: update });

};
