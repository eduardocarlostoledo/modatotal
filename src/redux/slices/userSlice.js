import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../herramientas/clienteAxios";

export const checkAuth = createAsyncThunk("users/verificausuario", async () => {
  try {
    
    const response = await axiosClient.get("/users/verificausuario/"); // Endpoint para verificar autenticación
    console.log("checkAuth", response);
    return response.data.user; // Devuelve los datos del usuario si está autenticado
  } catch (error) {
    throw error;
  }
});

// Async thunks for handling asynchronous logic
export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  try {
    //console.log("solicitando usuarios userslice");
    const response = await axiosClient.get("/users/");
    //console.log("respuesta de back en user slice", response);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error desconocido");
  }
});

export const getUserById = createAsyncThunk("users/getById", async (id) => {
  const response = await axiosClient.get(`/users/${id}`);
  return response.data.data;
});

export const userRegister = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("vengo al slice de user register");
      const response = await axiosClient.post("/users/register", payload);
      console.log("recibo respuesta de back", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      //console.log("logueando", userCredentials)
      const response = await axiosClient.post("/users/login", userCredentials);
      //console.log("rta del backend", response)
      return response.data; // Solo devolver los datos necesarios
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

//esto retorna el listado completo de usuarios
export const getFiltersForEmail = createAsyncThunk(
  "users/getEmail",
  async () => {
    const response = await axiosClient.get("/users");
    console.log("getFiltersForEmail", response);
    return response.data;
  }
);

export const userActive = createAsyncThunk(
  "users/userActive",
  async (payload) => {
    //console.log("se ha seteado useractive slice", payload.email)
    return payload;
  }
);

export const changeNav = createAsyncThunk("users/changeNav", async () => {
  //console.log("se ha seteado changenav slice")
  return true;
});

export const putUser = createAsyncThunk("users/update", async (payload) => {
  const response = await axiosClient.put(`/users/${payload.id}`, payload);
  return response;
});

export const putUserProfile = createAsyncThunk(
    "user/putUserProfile",
    async ({ data, userId }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/users/${userId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Importante para FormData
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const postGoogle = createAsyncThunk("/users/google", async (payload) => {
  console.log("auth/google", payload);
  const response = await axiosClient.get("/users/google", payload);
  console.log("auth/google response", response);
  return response;
});

export const postUsersGoogle = createAsyncThunk(
  "users/postGoogle",
  async (payload) => {
    const response = await axiosClient.post("/users/google/", payload);
    console.log("POST USER GOOGLE", payload, response);
    return response.data;
  }
);

export const loginGoogle = createAsyncThunk(
  "users/loginGoogle",
  async (payload) => {
    const response = await axiosClient.post("/users/loginGoogle", payload);
    console.log(response.data, "aca en redux logingoogle");

    return response.data;
  }
);

export const getAllUsersName = createAsyncThunk(
  "users/getAllByName",
  async (name) => {
    const response = await axiosClient.get(`/users?name=${name}`);
    return response.data.data;
  }
);

// Define the slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userDetail: {},
    emails: [],
    status: null,
    error: null,
    userActive: JSON.parse(localStorage.getItem("userActive")) || {}, // Restaurar desde localStorage        
    isLoggedIn: !!localStorage.getItem('token'),
    ChangeNav: JSON.parse(localStorage.getItem("Navbar")) || false,
  },
  reducers: {
    deleteUserLocalStorage(state) {
      state.ChangeNav = true;
      state.userActive = null;
      state.isLoggedIn = false;
      localStorage.setItem("Navbar", JSON.stringify(true));
      localStorage.removeItem("userActive");
    },
    logoutUser(state) {
      state.userActive = null;
      state.isLoggedIn = false;
      localStorage.removeItem("userActive");
      localStorage.removeItem('token');
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'success';
        state.userActive = action.payload;
        state.isLoggedIn = true;
        //localStorage.setItem("userActive", JSON.stringify(action.payload));
      })
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.userActive = null; // Limpia el usuario activo
        state.isLoggedIn = false; // Marca como no autenticado
        // localStorage.removeItem('userActive'); // Limpia localStorage
        // localStorage.removeItem('token'); // Limpia el token
    })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "success";
        state.userActive = action.payload.user; // Guarda los datos del usuario
        state.isLoggedIn = true; // Marca como autenticado
        //localStorage.setItem('userActive', JSON.stringify(action.payload.user)); // Guarda en localStorage
        localStorage.setItem('token', action.payload.token); // Guarda el token en localStorage    
        state.emails.push(action.payload.email); // Añadimos el nuevo email al estado
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.users = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userDetail = action.payload;
      })
      .addCase(getFiltersForEmail.fulfilled, (state, action) => {
        state.emails = action.payload;
      })
      .addCase(userActive.fulfilled, (state, action) => {
        state.userActive = action.payload;
      })
      .addCase(changeNav.fulfilled, (state) => {
        state.ChangeNav = false; // Cambia según la lógica que necesites
        localStorage.setItem("Navbar", JSON.stringify(false));
      })
      .addCase(getAllUsersName.fulfilled, (state, action) => {
        state.users = action.payload;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userActive = action.payload.user; // Solo guardas los datos necesarios en el estado
        state.isLoggedIn = true;
        //localStorage.setItem("userActive", JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token); // Guarda el token en localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { deleteUserLocalStorage } = usersSlice.actions;
export default usersSlice.reducer;
