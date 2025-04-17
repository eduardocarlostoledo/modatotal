import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/CreateProduct.css";
import swal from 'sweetalert';
import { NavAdmin } from "./navAdmin";
import {
  getAllBrands,
  getAllTypes,
  createProduct,
} from "../redux/slices/productSlice.js";
import { useNavigate } from "react-router-dom";

function validate(input) {
  let errors = {};
  const regexName = /^[A-Za-z0-9\s]+$/g;
  
  if (input.name && !regexName.test(input.name)) {
    errors.name = "No se permiten caracteres especiales";
  }
  if (!input.name) {
    errors.name = "Nombre es requerido";
  }
  if (input.name.length > 35) {
    errors.name = "Máximo 35 caracteres";
  }
  if (input.name.length < 6) {
    errors.name = "Mínimo 6 caracteres";
  }
  
  if (!input.description) {
    errors.description = "Descripción es requerida";
  }
  
  if (input.description.length < 10) {
    errors.description = "Mínimo 10 caracteres";
  }
  
  if (isNaN(input.stock)) 
    errors.stock = "Stock debe ser un número";
  
  if(!input.stock) 
    errors.stock = "Stock es requerido";
  
  if(input.stock < 1 || input.stock > 1000) 
    errors.stock = "Stock entre 1 y 1000";
  
  if (!input.price) {
    errors.price = "Precio es requerido";
  }
  
  if(!input.type.length){
    errors.type = 'Selecciona o crea un tipo'    
  }
  
  if(!input.brand.length){
    errors.brand = 'Selecciona o crea una marca'    
  }
  
  return errors;
}

export const CreateProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = useSelector((state) => state.brands);
  const types = useSelector((state) => state.types);

  console.log("estado de brands y types", brands, types);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllTypes());
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    stock: 1,
    brand: [],
    type: [],
    info_adicional: { "socket": "" }
  });

  const [typeInput, setTypeInput] = useState('');
  const [brandInput, setBrandInput] = useState('');

  const handleChange = (e) => {
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setInput({ ...input, image: file });
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = document.getElementById('image-preview');
        preview.src = event.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      // Si no se seleccionó archivo, ocultar preview
      document.getElementById('image-preview').style.display = 'none';
    }
  }

  const handleSocketChange = (e) => {
    setInput({
      ...input,
      info_adicional: { "socket": e.target.value }
    });
  };
  
  const handleChangeStock = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: name === "stock" ? parseInt(value) : value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(input);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return swal('Error en el formulario', 'Por favor corrige los errores', 'error');
    }
    
    try {
      const data = new FormData();
      data.append("name", input.name);
      data.append("image", input.image);
      data.append("price", input.price);
      data.append("description", input.description);
      data.append("brand", input.brand);
      data.append("type", input.type);
      data.append("stock", input.stock);
      data.append("info_adicional", input.info_adicional.socket);
      
      await dispatch(createProduct(data));
      
      swal('Producto creado', "", 'success')
        .then(() => {
          // Limpiar formulario
          setInput({
            name: "",
            image: "",
            price: "",
            description: "",
            stock: 1,
            brand: [],
            type: [],
            info_adicional: { "socket": "" }
          });
          document.getElementById('image-preview').style.display = 'none';
          
          // Abrir nueva pestaña con los productos
          window.open('/Products', '_blank');
        });
    } catch (error) {
      swal('Error', 'No se pudo crear el producto', 'error');
    }
  }

  return (
    <div className="p-createproduct-container">
      <NavAdmin />
      
      <div className="p-createproduct-main">
        <div className='p-createproduct-form'>
          <h1 className='p-createproduct-title'>Crear Producto</h1>
          
          <form onSubmit={handleSubmit} className="p-createproduct-form-container">
            {/* Nombre del Producto */}
            <div className='p-createproduct-field'>
              <label className='p-createproduct-label'>Nombre del Producto</label>
              <input 
                className={`p-createproduct-input ${errors.name ? 'p-createproduct-input-error' : ''}`} 
                type='text' 
                value={input.name} 
                name='name' 
                placeholder="Ej: Procesador Intel Core i9" 
                onChange={handleChange}
              />                   
              {errors.name && <span className='p-createproduct-error'>{errors.name}</span>}
            </div>

            {/* Imagen del Producto */}
            <div className='p-createproduct-field'>
  <label className='p-createproduct-label'>Imagen del Producto</label>
  <div className="p-createproduct-image-upload">
    <label htmlFor="product-image-upload" className="p-createproduct-file-label">
      Seleccionar Imagen
    </label>
    <input 
      id="product-image-upload"
      className='p-createproduct-file-input' 
      type='file' 
      name='image' 
      accept="image/*"
      onChange={handleChangeImage} 
    />
    <img 
      id="image-preview" 
      className="p-createproduct-image-preview" 
      alt="Vista previa" 
      style={{ display: input.image ? 'block' : 'none' }} 
    />
    {input.image && (
      <span className="p-createproduct-file-name">
        {input.image.name}
      </span>
    )}
  </div>
</div>

            {/* Precio y Stock */}
            <div className="p-createproduct-row">
              <div className='p-createproduct-field p-createproduct-half'>
                <label className='p-createproduct-label'>Precio ($)</label>
                <input 
                  className={`p-createproduct-input ${errors.price ? 'p-createproduct-input-error' : ''}`} 
                  type='number' 
                  value={input.price} 
                  min="1" 
                  name='price' 
                  placeholder="Ej: 299.99" 
                  onChange={handleChange} 
                />                  
                {errors.price && <span className='p-createproduct-error'>{errors.price}</span>}
              </div>
              
              <div className='p-createproduct-field p-createproduct-half'>
                <label className='p-createproduct-label'>Stock</label>
                <input 
                  className={`p-createproduct-input ${errors.stock ? 'p-createproduct-input-error' : ''}`} 
                  type='number' 
                  value={input.stock} 
                  min="1" 
                  max="1000" 
                  name='stock' 
                  onChange={handleChangeStock} 
                />                  
                {errors.stock && <span className='p-createproduct-error'>{errors.stock}</span>}
              </div>
            </div>

            {/* Descripción */}
            <div className='p-createproduct-field'>
              <label className='p-createproduct-label'>Descripción</label>
              <textarea 
                className={`p-createproduct-textarea ${errors.description ? 'p-createproduct-input-error' : ''}`} 
                name='description' 
                placeholder="Describe las características del producto..." 
                onChange={handleChange}
              ></textarea>                 
              {errors.description && <span className='p-createproduct-error'>{errors.description}</span>}
            </div>

            {/* Tipo y Marca */}
            <div className="p-createproduct-row">
              <div className='p-createproduct-field p-createproduct-half'>
                <label className='p-createproduct-label'>Tipo de Producto</label>
                <div className="p-createproduct-select-container">
                  <input 
                    className='p-createproduct-new-input' 
                    type='text' 
                    value={typeInput} 
                    placeholder="Nuevo tipo (opcional)" 
                    onChange={(e) => setTypeInput(e.target.value)}
                  /> 
                  <select 
                    className={`p-createproduct-select ${errors.type ? 'p-createproduct-input-error' : ''}`} 
                    name='type' 
                    onChange={handleChange} 
                    value={input.type}
                  >
                    <option value="">Seleccionar tipo</option>
                    {types?.map((type, index) => (
                      <option key={index} value={type.name}>{type.name}</option>
                    ))}
                    {typeInput && <option value={typeInput}>{typeInput} (nuevo)</option>}
                  </select>
                  {errors.type && <span className='p-createproduct-error'>{errors.type}</span>}
                </div>
              </div>
              
              <div className='p-createproduct-field p-createproduct-half'>
                <label className='p-createproduct-label'>Marca</label>
                <div className="p-createproduct-select-container">
                  <input 
                    className='p-createproduct-new-input' 
                    type='text' 
                    value={brandInput} 
                    placeholder="Nueva marca (opcional)" 
                    onChange={(e) => setBrandInput(e.target.value)}
                  /> 
                  <select 
                    className={`p-createproduct-select ${errors.brand ? 'p-createproduct-input-error' : ''}`} 
                    name='brand' 
                    onChange={handleChange} 
                    value={input.brand}
                  >
                    <option value="">Seleccionar marca</option>
                    {brands?.map((brand, index) => (
                      <option key={index} value={brand.name}>{brand.name}</option>
                    ))}
                    {brandInput && <option value={brandInput}>{brandInput} (nueva)</option>}
                  </select>
                  {errors.brand && <span className='p-createproduct-error'>{errors.brand}</span>}
                </div>
              </div>
            </div>

            {/* Socket (condicional) */}
            {(input.type === "Processor" || input.type === "Motherboard") && 
              <div className="p-createproduct-field">
                <label className="p-createproduct-label">Socket</label>
                <input 
                  className="p-createproduct-input" 
                  type="text" 
                  name="socket" 
                  value={input.info_adicional.socket} 
                  placeholder="Ej: LGA 1200, AM4"
                  onChange={handleSocketChange} 
                />
              </div>
            }
            
            <button className='p-createproduct-submit' type="submit">
              Crear Producto
            </button>                          
          </form>
        </div>                  
      </div>
    </div>
  );
};