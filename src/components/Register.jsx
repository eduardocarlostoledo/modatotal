import { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/slices/userSlice';
import swal from 'sweetalert';
import axiosClient from '../herramientas/clienteAxios.js';

function validate(input) {
  let errors = {};
  const regexName = /^([a-zA-Z ]+)$/i;
  const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (input.name && !regexName.test(input.name)) errors.name = "Can't include special characters or numbers";
  if (!input.name) errors.name = "Name is required";
  if (input.name.length > 15) errors.name = "Max 15 characters";
  if (input.name.length < 2) errors.name = "Min 2 characters";
  if (input.lastname && !regexName.test(input.lastname)) errors.lastname = "Can't include special characters";
  if (!input.lastname) errors.lastname = "Last name is required";
  if (input.lastname.length > 15) errors.lastname = "Max 15 characters";
  if (input.lastname.length < 2) errors.lastname = "Min 2 characters";
  if (!input.password) errors.password = "Password is required";
  if (input.password.length > 20) errors.password = "Max 20 characters";
  if (input.password.length < 8) errors.password = "Min 8 characters, 1 uppercase, 1 lowercase";
  if (input.passwordConfirm !== input.password) errors.passwordConfirm = "Passwords must match";
  if (input.email && !regexEmail.test(input.email)) errors.email = "Invalid email format";
  if (!input.email) errors.email = "Email is required";

  return errors;
}

export const Register = () => {
  const navigate = useNavigate();
  const regexName = /^([a-zA-Z ]+)$/i;
  const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{8,20}$/;
  const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.name || !input.lastname || !input.password || !input.email) {
      return swal('Invalid', 'Missing required fields!', 'error');
    }

    if (!regexEmail.test(input.email)) return swal('Invalid', 'Email is invalid', 'error');
    if (!regexName.test(input.name)) return swal('Invalid', 'Name is invalid', 'error');
    if (!regexName.test(input.lastname)) return swal('Invalid', 'Last name is invalid', 'error');
    if (!regexPassword.test(input.password)) {
      return swal('Invalid', 'Password is invalid, must include uppercase and lowercase', 'error');
    }
    if (input.password !== input.passwordConfirm) {
      return swal('Invalid', 'Passwords must match', 'error');
    }

    try {
      const response = await axiosClient.post('/users/register', input);
      if (response.status === 200) {
        swal('Success', 'Cuenta Creada!', 'success');
        setInput({
          name: '',
          lastname: '',
          email: '',
          password: '',
          passwordConfirm: '',
        });
        navigate('/Login');
      } else {
        swal('Error', 'Inténtalo de nuevo', 'error');
      }
    } catch (error) {
      swal('Contacta al Administrador', 'Se ha Producido un Error', 'error');
    }
  }

  return (
    <div className="container-all-form">
      <form className="container-form" onSubmit={handleSubmit}>
        <div className="register-header">
          <h2>Register</h2>
        </div>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={input.name} onChange={handleChange} type="text" placeholder="User Name" />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="lastname">LastName</label>
          <input id="lastname" name="lastname" value={input.lastname} onChange={handleChange} type="text" placeholder="User Lastname" />
          {errors.lastname && <p className="error-text">{errors.lastname}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={input.email} onChange={handleChange} type="email" placeholder="Enter email" />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" value={input.password} onChange={handleChange} type="password" placeholder="Password" />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input id="passwordConfirm" name="passwordConfirm" value={input.passwordConfirm} onChange={handleChange} type="password" placeholder="Confirm Password" />
          {errors.passwordConfirm && <p className="error-text">{errors.passwordConfirm}</p>}
        </div>
        <button className="btn-register" type="submit">Register</button>
        <div className="login-link">
          <h5>
            Already have an account? <Link to="/Login">Login here</Link>
          </h5>
        </div>
      </form>
    </div>
  );
};
