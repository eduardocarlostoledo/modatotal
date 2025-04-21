import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import { jwtDecode } from "jwt-decode";
import {
  loginUser,
  userActive,
  changeNav,
  postUsersGoogle,
  postGoogle,
  loginGoogle,
} from "../redux/slices/userSlice.js";
import axiosClient from "../herramientas/clienteAxios";
import "./login.css";
function validate(input) {
  let errors = {};
  const regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!input.password) {
    errors.password = "Password is required";
  }
  if (input.password.length > 12) {
    errors.password = "Max 12 caracteres";
  }
  if (input.password.length < 5) {
    errors.password = "Min 5 caracteres";
  }
  if (input.email && !regexEmail.test(input.email)) {
    errors.email = "Insert valid email";
  }
  if (!input.email) {
    errors.email = "Email is required";
  }
  return errors;
}

export const Login = () => {
  const [authLoading, setAuthLoading] = useState(true);

  const [example, setExample] = useState(false);
  const [errors, setErrors] = useState({});
  const [errormsg, setErrormsg] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [infoGoogle, setInfoGoogle] = useState({
    email: "",
    lastname: "",
    name: "",
    image: "",
  });
  const [usuarioGoogle, setUsuarioGoogle] = useState("");
  const usuarioConectado = useSelector((state) => state.users.userActive) || {};
  console.log("Usuario conectado: orders", usuarioConectado);
  const token = localStorage.getItem("token");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_APP_YOUR_CLIENT_ID_LOGIN,
      callback: handleGoogleResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  useEffect(() => {
    const checkAuth = async () => {
      if (token && isAuthenticated === "On") {
        try {
          const response = await axiosClient.get("/users/verificalogin", {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          if (response.data.success) {
            const user = response.data.user;
            dispatch(userActive(user));
            dispatch(changeNav());
            navigate(user.admin ? "/admin/users" : "/Profile");
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("isAuthenticated");
        }
      }
  
      // Espera terminada
      setAuthLoading(false);
    };
  
    checkAuth();
  }, [token, isAuthenticated, dispatch, navigate]);
  

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  async function handleGoogleResponse(response) {
    const userObject = jwtDecode(response.credential);
    const respuestaInicioSesion = await dispatch(loginGoogle(userObject));
    console.log(respuestaInicioSesion);
    if (
      respuestaInicioSesion.payload.success &&
      respuestaInicioSesion.payload.token
    ) {
      if (respuestaInicioSesion.payload.user.status) {
        dispatch(userActive(respuestaInicioSesion.payload.user));
        dispatch(changeNav());
        localStorage.setItem("isAuthenticated", "On");
        localStorage.setItem("token", respuestaInicioSesion.payload.user.token);
        navigate(
          respuestaInicioSesion.payload.user.admin ? "/admin/users" : "/Profile"
        );
      } else {
        swal("User Banned", "Your account has been suspended", "error");
      }
    } else {
      setErrormsg(true);
      setTimeout(() => setErrormsg(false), 5000);
    }

    setExample(true);
  }

  const viewAlert = async () => {
    try {
      // Realiza la primera solicitud para registrar al usuario
      const registerResponse = await fetch(
        `${import.meta.env.VITE_APP_BACK}/users/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: infoGoogle.email }), // Envía el email como objeto
        }
      );
      console.log(registerResponse, infoGoogle.email);
      if (!registerResponse.ok) {
        throw new Error("Error al registrar el usuario");
      }

      // Realiza la segunda solicitud para iniciar sesión
      const loginResponse = await fetch(
        `${import.meta.env.VITE_APP_BACK}/users/logingoogle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: infoGoogle.email }), // Envía el email como objeto
        }
      );
      console.log(loginResponse, infoGoogle.email);
      if (!loginResponse.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const userResponse = await loginResponse.json();
      console.log(userResponse);

      // Valida la respuesta del login
      if (userResponse.success) {
        const userData = userResponse.user;
        if (userData.status) {
          dispatch(userActive(userResponse));
          dispatch(changeNav());
          localStorage.setItem("token", userResponse.token);
          localStorage.setItem("isAuthenticated", "On");

          // Redirige según el rol del usuario
          navigate(userData.admin ? "/admin/users" : "/Profile");
        } else {
          swal("User Banned", "Your account has been suspended", "error");
        }
      } else {
        throw new Error(userResponse.message || "Login failed");
      }
    } catch (error) {
      console.error("Error in viewAlert:", error);
      swal("Error", "Something went wrong!", "error");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.email || !input.password) {
      return swal("Invalid", "Missing required fields!", "error");
    }

    const response = await dispatch(loginUser(input));
    if (
      response.payload.success &&
      response.payload.msg === "Login successful"
    ) {
      if (response.payload.user.status) {
        dispatch(userActive(response.payload.user));
        dispatch(changeNav());
        localStorage.setItem("isAuthenticated", "On");
        localStorage.setItem("token", response.payload.user.token);
        navigate(response.payload.user.admin ? "/admin/users" : "/Profile");
      } else {
        swal("User Banned", "Your account has been suspended", "error");
      }
    } else {
      setErrormsg(true);
      setTimeout(() => setErrormsg(false), 5000);
    }
  }

  if (authLoading) {
    return (
      <div className="container-all-form">
        <div className="container-all" style={{ textAlign: "center", padding: "2rem" }}>
          <h3>Verificando sesión...</h3>
        </div>
      </div>
    );
  }
  
  return (
    
    <div className="container-all-form">
      <form className="container-all" onSubmit={handleSubmit}>
        <div className="register">
          <h2>Login</h2>
        </div>
        <div className="pack">
          <label>Email address</label>
          <input
            name="email"
            value={input.email}
            onChange={handleChange}
            className="inputs"
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div className="pack">
          <label>Password</label>
          <input
            name="password"
            value={input.password}
            onChange={handleChange}
            className="inputs"
            type="password"
            placeholder="Password"
          />
        </div>
        {errormsg && (
          <small className="msgerr">Invalid email or password</small>
        )}
        <div className="container-btn">
          <button className="btnR" type="submit">
            Login
          </button>
        </div>
        <div className="forgot-password">
          <Link to="/changePass">I forgot my password</Link>
        </div>
        <div className="down">
          <h5>
            Don't have an account?{" "}
            <Link to="/Register">
              <button className="here">Register</button>
            </Link>
          </h5>
        </div>
        <div className="container-btn">
          {!infoGoogle.name && !infoGoogle.email && !infoGoogle.lastname && (
            <div id="signInDiv"></div>
          )}
          {example &&
            infoGoogle.name &&
            infoGoogle.email &&
            infoGoogle.lastname && (
              <div onClick={viewAlert}>
                <strong>Ingresando...</strong>
              </div>
            )}
        </div>
      </form>
    </div>
  );
};
