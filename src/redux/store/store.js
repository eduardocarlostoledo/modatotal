import { configureStore } from '@reduxjs/toolkit';
import productsReducer from "../slices/productSlice.js";
import cartReducer from "../slices/cartSlice.js";
import usersReducer from "../slices/userSlice.js";
import orderReducer from "../slices/orderSlice.js";
import { errorMiddleware } from './middleware/errorMiddleware';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
    orders: orderReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['products/createProduct/fulfilled', 'products/updateProduct/fulfilled'],
        ignoredPaths: ['products.productDetail.image']
      }
    }).concat(errorMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import productsReducer from "../slices/productSlice.js"
// import cartReducer from "../slices/cartSlice.js"
// import usersReducer from "../slices/userSlice.js"
// import orderReducer from "../slices/orderSlice.js"

// // Importa otros slices según sea necesario

// const store = configureStore({
//     reducer: {
//         products: productsReducer,
//         cart: cartReducer,
//         users: usersReducer,
//         orders: orderReducer
//     },
//     // Puedes agregar middleware personalizado si lo necesitas
// });

// export default store;
