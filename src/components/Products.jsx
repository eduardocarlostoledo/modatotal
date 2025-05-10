import { motion } from "framer-motion";
import { HiChevronDown, HiMagnifyingGlass } from "react-icons/hi2"; // Icono lupa y flecha

import "../styles/Products.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterByBrands,
  filterByPrice,
  filterByType,
  getAllBrands,
  getAllProducts,
  getAllProductsName,
  getAllTypes,
} from "../redux/slices/productSlice.js";
import Card from "../components/Card";
import Paginado from "./Paginado";
import DOMPurify from "dompurify";

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const brands = useSelector((state) => state.products.brands);
  const types = useSelector((state) => state.products.types);

  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 20;
  const [name, setName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getAllProducts());
      await dispatch(getAllBrands());
      await dispatch(getAllTypes());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

//para depurar busquedas
  useEffect(() => {
  //console.log("🔍 Productos después del search:", products);
}, [products]);

useEffect(() => {
  // Esto asegura que cuando products cambia (después del search), se aplique el nombre actual
  if (name.trim()) {
    const term = name.toLowerCase();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  } else {
    setFilteredProducts(products);
  }
}, [products, name]);


  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [], // No permitir ningún tag HTML
      ALLOWED_ATTR: [], // No permitir ningún atributo
    });
  };

  const handleInputChange = (e) => {
    
    // Sanitizar el valor de entrada
    const sanitizedValue = sanitizeInput(e.target.value);
    setName(sanitizedValue);
    
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const sanitizedName = sanitizeInput(name);
  dispatch(getAllProductsName(sanitizedName));
  setCurrentPage(1);
};


  const handleFilterBrands = (e) => {
    const value = sanitizeInput(e.target.value);
    const filtered = value === "All"
      ? products
      : products.filter((p) => p.brand === value);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };
  
  const handleFilterTypes = (e) => {
    const value = sanitizeInput(e.target.value);
    const filtered = value === "All"
      ? products
      : products.filter((p) => p.type === value);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };
  

  const handleFilterPrice = (e) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    const sortedProducts = [...products].sort((a, b) => {
      if (sanitizedValue === "ASC") return a.price - b.price;
      return b.price - a.price;
    });
    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  };

  const handleClick = () => {
    dispatch(getAllProducts());
    setName("");
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  return (
    <div className="products-container">
      <div className="products-content">
        {loading ? (
          <div className="products-loader"></div>
        ) : (
          <>
            <div className="products-filters-cards">
<div className="products-filters-container">
  <div className="products-search-container">
    <motion.input
      whileFocus={{ scale: 1.02 }}
      className="products-search-input"
      type="text"
      placeholder="Buscar..."
      value={name}
      onChange={handleInputChange}
    />
    <button
      className="products-search-button"
      type="submit"
      onClick={handleSubmit}
      aria-label="Buscar productos"
    >
      <HiMagnifyingGlass className="products-search-icon" />
    </button>
  </div>

  <motion.div
    className="products-filters-group"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    {/* Marcas */}
    <div className="products-filter-wrapper">
      <select
        id="filterBrandsSelect"
        className="products-filter-select"
        onChange={handleFilterBrands}
      >
        <option value="All">Marcas</option>
        {brands.map((b, index) => (
          <option key={index} value={b.name}>{b.name}</option>
        ))}
      </select>
      <HiChevronDown className="products-filter-icon" />
    </div>

    {/* Tipos */}
    <div className="products-filter-wrapper">
      <select
        id="filterTypesSelect"
        className="products-filter-select"
        onChange={handleFilterTypes}
      >
        <option value="All">Tipos</option>
        {types.map((t, index) => (
          <option key={index} value={t.name}>{t.name}</option>
        ))}
      </select>
      <HiChevronDown className="products-filter-icon" />
    </div>

    {/* Precios */}
    <div className="products-filter-wrapper">
      <select
        id="filterPriceSelect"
        className="products-filter-select"
        onChange={handleFilterPrice}
      >
        <option value="all">Precio</option>
        <option value="ASC">Más Barato</option>
        <option value="DES">Más Caro</option>
      </select>
      <HiChevronDown className="products-filter-icon" />
    </div>
  </motion.div>
</div>

              <div className="products-cards-container">
                {currentProducts.map((p, index) => (
                  <Card
                    key={index}
                    id={p.id}
                    name={sanitizeInput(p.name)}
                    price={p.price}
                    image={sanitizeInput(p.image)}
                    description={sanitizeInput(p.description)}
                    calification={p.calification}
                  />
                ))}
              </div>
            </div>
            <Paginado
              charactersPerPage={charactersPerPage}
              product={filteredProducts.length}
              paginado={paginado}
            />
          </>
        )}
      </div>
    </div>
  );
};