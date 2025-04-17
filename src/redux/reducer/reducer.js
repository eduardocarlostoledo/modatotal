import { GET_CART, ADD_TO_CART, DELETE_ALL_FROM_CART, DELETE_ONE_CART, POST_CART,  GET_UPDATE, UPDATE} from '../actions/CartActions';
import { ADD_ALL_ORDERS, GET_ALL_SHOPPING } from '../actions/OrderActions.js';

import {
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_NAME,
    GET_PRODUCT_DETAIL,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    GET_ALL_BRANDS,
    GET_ALL_TYPES,
    GET_PAGE,
    FILTER_BY_BRAND,
    FILTER_BY_TYPE,
    FILTER_PRECIO,
    ADD_REVIEW,
    } from '../actions/ProductActions.js'
    
    import{
        GET_ALL_USERS,
        GET_USER_BY_ID,
        USER_REGISTER,
        UPDATE_USER,
        GET_EMAIL,
        USER_ACTIVE,
        GET_ID,
        CHANGE_NAV,
        GET_ALL_QUERY
    } from '../actions/UsersActions.js';
    
    const initialState = {
        products: [],
        allProducts: [],
        paginatedProducts: [],
        brands: [],
        types: [],
        productDetail: {},
        users: [],
        userDetail: {},
        emails: [],
        userActive: {},
        ChangeNav: JSON.parse(localStorage.getItem("Navbar")) || false,
        cart: [],
        update: false,
        order: [],
        shopping: [],
        idgoogle: {}
    };
    
    const rootReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_ALL_PRODUCTS:
                return {
                    ...state,
                    products: action.payload,
                    allProducts: action.payload,
                };
    
            case GET_ALL_PRODUCTS_NAME:
                return {
                    ...state,
                    products: action.payload,
                };
    
            case GET_PRODUCT_DETAIL:
                return {
                    ...state,
                    productDetail: action.payload,
                };
    
            case CREATE_PRODUCT:
            case UPDATE_PRODUCT:
                // Add logic if needed
                return state;
    
            case GET_ALL_BRANDS:
                return {
                    ...state,
                    brands: action.payload,
                };
    
            case GET_ALL_TYPES:
                return {
                    ...state,
                    types: action.payload,
                };
    
            case GET_ALL_USERS:
                return {
                    ...state,
                    users: action.payload,
                };
    
            case GET_USER_BY_ID:
                return {
                    ...state,
                    userDetail: action.payload,
                };
    
            case USER_REGISTER:
            case UPDATE_USER:
                // Add logic if needed
                return state;
    
            case GET_EMAIL:
                return {
                    ...state,
                    emails: action.payload,
                };
    
            case GET_PAGE:
                return {
                    ...state,
                    paginatedProducts: action.payload,
                };
    
            case USER_ACTIVE:
                //localStorage.setItem("USUARIO", JSON.stringify(action.payload));
                return {
                    ...state,
                    ChangeNav: true,
                    userActive: action.payload,
                };
    
            case FILTER_BY_BRAND:
                const brandsFilter = action.payload === 'All'
                    ? state.allProducts
                    : state.allProducts.filter(el => el.brand === action.payload);
                return {
                    ...state,
                    products: brandsFilter,
                };
    
            case FILTER_BY_TYPE:
                const typesFilter = action.payload === 'All'
                    ? state.allProducts
                    : state.allProducts.filter(el => el.type === action.payload);
                return {
                    ...state,
                    products: typesFilter,
                };
    
            case FILTER_PRECIO:
                const sortedProducts = [...state.products].sort((a, b) => {
                    if (action.payload === "ASC") return a.price - b.price;
                    if (action.payload === "DESC") return b.price - a.price;
                    return 0;
                });
                return {
                    ...state,
                    products: sortedProducts,
                };
    
            case "deleteUserLocalStorage":
                localStorage.setItem("Navbar", JSON.stringify(true));
                return {
                    ...state,
                    ChangeNav: true,
                };
            //carrito
            case GET_CART:
                return {
                    ...state,
                    cart: action.payload, // Cargar los ítems del carrito
                };
            case ADD_TO_CART:
                return {
                    ...state,
                    cart: [...state.cart, action.payload], // Agregar ítem al carrito
                };
            case DELETE_ONE_CART:
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.id !== action.payload.id), // Eliminar ítem del carrito
                };
            case DELETE_ALL_FROM_CART:
                return {
                    ...state,
                    cart: [], // Vaciar el carrito
                };

            case GET_UPDATE:
                // Implement if needed
                return state;

            case UPDATE:
                return {
                    ...state,
                    update: action.payload,
                };
    //ordenes
            case ADD_ALL_ORDERS:
                return {
                    ...state,
                    order: action.payload,
                };
    
            case GET_ALL_SHOPPING:
                return {
                    ...state,
                    shopping: action.payload,
                };
    
            case CHANGE_NAV:
                localStorage.setItem("Navbar", JSON.stringify(false));
                return {
                    ...state,
                    ChangeNav: false,
                };
    
            case ADD_REVIEW:
                // Implement if needed
                return state;
    
            case GET_ID:
                return {
                    ...state,
                    idgoogle: action.payload,
                };
    
            case GET_ALL_QUERY:
                return {
                    ...state,
                    users: action.payload,
                };
    
            default:
                return state;
        }
    };
    
    export default rootReducer;
    