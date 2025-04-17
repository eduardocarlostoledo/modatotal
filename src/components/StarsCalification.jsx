import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import "../styles/StarsCalification.css";

const StarsCalification = ({ calif, setCalif, width }) => {
    const [calification, setCalification] = useState(calif || 5); // Inicializa en 5 si no se recibe prop
    const [hover, setHover] = useState('');
    const size = width ? width : 50;

    useEffect(() => {
        if (setCalif) setCalif(calification); // Establece calificación si setCalif está definido
    }, [calification, setCalif]);

    // Se obtiene la parte entera y decimal de la calificación
    const intPart = Math.floor(calification);
    const decimalPart = calification - intPart;

    return (
        <div className="starsCalification">
            {[...new Array(5)].map((_, i) => {
                const califValue = i + 1;
                let starComponent = null;

                if (califValue <= intPart) {
                    // Mostrar estrella completa
                    starComponent = <FaStar color="yellow" size={size} />;
                } else if (califValue === intPart + 1 && decimalPart > 0) {
                    // Mostrar estrella parcialmente amarilla
                    starComponent = <FaStarHalfAlt color="yellow" size={size} />;
                } else {
                    // Mostrar estrella gris
                    starComponent = <FaStar color="gray" size={size} />;
                }

                return calif || calif === 0 ? (
                    <span key={califValue}>{starComponent}</span>
                ) : (
                    <label key={califValue}>
                        <input
                            type="radio"
                            name="calification"
                            value={califValue}
                            onClick={() => setCalification(califValue)}
                        />
                        <FaStar
                            className="star"
                            color={califValue <= (hover || calification) ? "yellow" : "gray"}
                            size={size}
                            onMouseEnter={() => setHover(califValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarsCalification;
