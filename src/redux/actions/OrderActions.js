import axiosClient from "../../herramientas/clienteAxios.js"

export const ADD_ALL_ORDERS = 'ADD_ALL_ORDERS'; /* todas las ordenes */
export const GET_ALL_SHOPPING = 'GET_ALL_SHOPPING'; /* todas las compras */
export const ORDER_BY_ID = 'ORDER_BY_ID'; /* el id de las ordenes */
export const ORDER_BY_USER = 'ORDER_BY_USER'; /* las ordenes que tiene cada usuario */
export const ORDER_BY_EMAIL = 'ORDER_BY_EMAIL'; /* las ordenes por email */

export const addAllOrders = () => async (dispatch) => {
    try {
        const response = await axiosClient.get('/order');
        dispatch({ type: ADD_ALL_ORDERS, payload: response.data });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        // Puedes despachar una acción de error si lo deseas
    }
};

export const getAllShopping = () => async (dispatch) => {
    try {
        const response = await axiosClient.get('/orders/pays');
        dispatch({ type: GET_ALL_SHOPPING, payload: response.data });
    } catch (error) {
        console.error('Error fetching all shopping data:', error);
        // Puedes despachar una acción de error si lo deseas
    }
};

export const orderById = (id) => async (dispatch) => {
    try {
        const response = await axiosClient.get(`/orders/${id}`);
        dispatch({ type: ORDER_BY_ID, payload: response.data });
    } catch (error) {
        console.error(`Error fetching order by id (${id}):`, error);
        // Puedes despachar una acción de error si lo deseas
    }
};

export const orderByUser = (cartUserId) => async (dispatch) => {
    try {
        const response = await axiosClient.get(`/orders/${cartUserId}`);
        dispatch({ type: ORDER_BY_USER, payload: response.data });
    } catch (error) {
        console.error(`Error fetching orders by user (${cartUserId}):`, error);
        // Puedes despachar una acción de error si lo deseas
    }
};

export const orderByEmail = (email) => async (dispatch) => {
    try {
        const response = await axiosClient.get(`/orders/${email}`);
        dispatch({ type: ORDER_BY_EMAIL, payload: response.data });
    } catch (error) {
        console.error(`Error fetching orders by email (${email}):`, error);
        // Puedes despachar una acción de error si lo deseas
    }
};
