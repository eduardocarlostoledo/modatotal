import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../herramientas/clienteAxios';
import { userActive } from './userSlice';

// Async thunks for handling asynchronous logic

export const getCart = createAsyncThunk('cart/getcartclient', async (userId) => {
    //console.log("slice getCart", userId)
    try {
        const response = await axiosClient(`/cart/getcartclient/${userId}`);
        //console.log("slice retornando datos de carrito", response.data.cartProducts)
        return response.data.cartProducts;    
    } catch (error) {
        throw Error("no se ha podido completar la operacion",error)
    }
    
});

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ product, user }, { rejectWithValue }) => {
      try {
        //console.log("addToCart slice", product, user);
        const response = await axiosClient.post('/cart', { product, user });
        //console.log("Respuesta del backend:", response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
      }
    }
  );

export const deleteOneCart = createAsyncThunk('cart/deleteOne', async (prodId) => {
    const response = await axiosClient.delete(`/cart/${prodId}`);
    return response.data;
});

export const deleteAllFromCart = createAsyncThunk(
    'cart/deleteAllFromCart',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axiosClient.delete(`/cart/deletecart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: { userId }, // Enviar el userId en el cuerpo de la solicitud
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const postCart = createAsyncThunk('cart/postCart', async ({ payload, preferenceId }) => {
    const response = await axiosClient.post('/cart', payload);
    return { cart: response.data, preferenceId };
});

// Define the slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
      preferenceId: null,
      update: false,
    },
    reducers: {
      getUpdate(state) {
        state.update = true;
      },
      update(state, action) {
        state.update = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...state.items, ...action.payload.cartProducts];

      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'No se pudo agregar al carrito';
      })
        .addCase(getCart.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getCart.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload; // Verifica que esto realmente devuelve la lista completa


        })
        .addCase(getCart.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        
        .addCase(deleteOneCart.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteOneCart.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = state.items.filter(item => item.id !== action.payload.id);
        })
        .addCase(deleteOneCart.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(deleteAllFromCart.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteAllFromCart.fulfilled, (state) => {
          state.status = 'succeeded';
          state.items = [];
        })
        .addCase(deleteAllFromCart.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(postCart.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(postCart.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.preferenceId = action.payload.preferenceId;
        })
        .addCase(postCart.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

// Export actions and reducer
export const { getUpdate, update } = cartSlice.actions;
export default cartSlice.reducer;
