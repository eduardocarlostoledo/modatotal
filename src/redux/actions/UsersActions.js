import axiosClient from "../../herramientas/clienteAxios.js"

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const USER_REGISTER = "USER_REGISTER";
export const UPDATE_USER = "UPDATE_USER";
export const GET_EMAIL = "GET_EMAIL";
export const USER_ACTIVE = "USER_ACTIVE";
export const CHANGE_NAV = "CHANGE_NAV";
export const GET_ID = "GET_ID";
export const GET_ALL_QUERY = "GET_ALL_QUERY";

axiosClient.defaults.baseURL = `${import.meta.env.VITE_APP_BACK}`;

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axiosClient.get("/users");
    dispatch({
      type: GET_ALL_USERS,
      payload: response.data.data,
    });
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const response = await axiosClient(`/users/${id}`);
    dispatch({
      type: GET_USER_BY_ID,
      payload: { ...response.data.data },
    });
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const userRegister = (payload) => async (dispatch) => {
  try {
    const response = await axiosClient.post("/users/register/", payload);
    return response;
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const userLogin = (payload) => async (dispatch) => {
  try {
    const response = await axiosClient.post("/users/login/", payload);
    //console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const GetFiltersForEmail = () => async (dispatch) => {
  try {
    const response = await axiosClient.get(`/users`);
    dispatch({
      type: GET_EMAIL,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const userActive = (payload) => (dispatch) => {
  
  dispatch({
    type: USER_ACTIVE,
    payload: payload,
  });
};

export const ChangeNav = () => (dispatch) => {
  dispatch({
    type: CHANGE_NAV,
  });
};

export const PutUser = (payload) => async (dispatch) => {
  try {
    const response = await axiosClient.put(`/users/${payload.id}`, payload);
    return response;
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const PutUserProfile = (payload, id) => async () => {
  try {
    const user = await axiosClient.put(`/users/${id}`, payload);
    const cacho = await axiosClient.get(`/users/${id}`);
    localStorage.setItem("USUARIO", JSON.stringify(cacho.data.data));
    console.log(cacho.data.data, "USER PUT USER");
    return user;
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const deleteUserLocalStorage = () => (dispatch) => {
  dispatch({
    type: "deleteUserLocalStorage",
  });
};

export const postUsersGoogle = (payload) => async (dispatch) => {
  try {
    const response = await axiosClient.post("/users/google/", payload);
    return response;
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const loginGoogle = (payload) => async (dispatch) => {
  try {
    let json = await axiosClient.post("/users/loginGoogle", payload);
    return json.data;
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

export const getAllUsersName = (name) => async (dispatch) => {
  try {
    let json = await axiosClient.get(`/users?name=${name}`);
    dispatch({
      type: GET_ALL_QUERY,
      payload: json.data.data,
    });
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
  }
};

// refactorizado
// import axiosClient from "../src/herramientas/clienteAxios.js"
// export const GET_ALL_USERS = "GET_ALL_USERS";
// export const GET_USER_BY_ID="GET_USER_BY_ID";
// export const USER_REGISTER= "USER_REGISTER";
// export const UPDATE_USER="UPDATE_USER";
// export const GET_EMAIL="GET_EMAIL";
// export const USER_ACTIVE="USER_ACTIVE";
// export const CHANGE_NAV="CHANGE_NAV";
// export const GET_ID= "GET_ID";
// export const GET_ALL_QUERY= "GET_ALL_QUERY";


// export function getAllUsers () { 
//   return async function(dispatch){
//       let json = await axiosClient.get("/users")
//       return dispatch({
//           type:  GET_ALL_USERS,
//           payload: json.data.data
//       });
//   };
// };

// export const getUserById = (id) => async (dispatch) => {
//   return await axiosClient(`/users/${id}`).then(r=>
//     dispatch({type: GET_USER_BY_ID, payload:{...r.data.data}}))
// };


// export function userRegister(payload) { 
//   return async function(dispatch){
//       const response = await axiosClient.post(`/users/register/`,payload);
//       return response;
//   };
// };



// export function userLogin(payload) { 
//   return async function(dispatch){
//       const response = await axiosClient.post(`/users/login/`,payload);
//       console.log(response.data);
//       return response;
//   };
// };


// export function GetFiltersForEmail () { 
//   return async function(dispatch){
//       let json = await axiosClient.get(`/users`);
//       return dispatch({
//           type: GET_EMAIL,
//           payload: json.data
//       });
//   };
// };

// export function UserActive (payload) { 
//   console.log(payload, "paylo");
//   return  function(dispatch){
//       return dispatch({
//           type: USER_ACTIVE,
//           payload: payload.data
//       });
//   };
// };

// export function ChangeNav () { 
//   return  function(dispatch){
//       return dispatch({
//           type: CHANGE_NAV
//       });
//   };
// };


// export function PutUser(payload) { 
//   // localStorage.setItem("USUARIO", JSON.stringify(payload))
//   // console.log(payload.id, "asdaID");
//   return async function(dispatch){
//       const response = await axiosClient.put(`/users/${payload.id}`,payload);
//       return response;
//   };
// };

// export const PutUserProfile=(payload, id)=> async()=>{ 
//   const user=await axiosClient.put(`/users/${id}`,payload);
//   const cacho=await axiosClient.get(`/users/${id}`);
//   localStorage.setItem("USUARIO", JSON.stringify(cacho.data.data))
//   console.log(cacho.data.data, "USER PUT USER")
//   return user;
// };


// export function deleteUserLocalStorage() { 

//   return  function(dispatch){
//       return dispatch({
//           type: "deleteUserLocalStorage"
//       });
//   };  
//   }


//   export function postUsersGoogle(payload) { 
//     return async function(dispatch){
//         const response = await axiosClient.post(`/users/google/`,payload);
//         return response;
//     };
//   };
  

//   export function loginGoogle(payload) { 
//     return async function(dispatch){
//         let json  = await axiosClient.post(`/users/loginGoogle`,payload);
//         return json.data
//     };
//   };
  
//   export function getAllUsersName (name) { 
//     return async function(dispatch){
//         let json = await axiosClient.get(`/users?name=${name}`)
//         return dispatch({
//             type:  GET_ALL_QUERY,
//             payload: json.data.data
//         });
//     };
//   };
  