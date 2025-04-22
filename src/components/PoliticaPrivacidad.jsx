import React from 'react';
import '../styles/PoliticaPrivacidad.css'; // Reutilizamos el CSS de tarjetas

export const PoliticaPrivacidad = () => {
  const sections = [
    {
      title: '1. Aceptación de términos',
      content: (
        <p>
          Al utilizar nuestra plataforma, aceptás nuestras condiciones de servicio y políticas asociadas. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices nuestros servicios.
        </p>
      ),
    },
    {
      title: '2. Servicios ofrecidos',
      content: (
        <p>
          Moda Total ofrece productos de moda a través de su tienda online. Nos reservamos el derecho de modificar, actualizar o discontinuar productos sin previo aviso.
        </p>
      ),
    },
    {
      title: '3. Uso adecuado del sitio',
      content: (
        <ul>
          <li>No realizar actividades fraudulentas ni manipular el sistema.</li>
          <li>No violar la seguridad o integridad del sitio.</li>
          <li>Utilizar la tienda solo con fines lícitos y personales.</li>
        </ul>
      ),
    },
    {
      title: '4. Información de cuenta',
      content: (
        <p>
          Es responsabilidad del usuario mantener segura su cuenta y sus credenciales. Moda Total no se hace responsable por accesos no autorizados si se deben a negligencia del usuario.
        </p>
      ),
    },
    {
      title: '5. Compras y pagos',
      content: (
        <ul>
          <li>Los precios están expresados en pesos argentinos e incluyen IVA.</li>
          <li>Las compras se realizan mediante plataformas seguras como Mercado Pago.</li>
          <li>Moda Total se reserva el derecho de rechazar o cancelar pedidos por motivos de stock, validación de identidad o sospechas de fraude.</li>
        </ul>
      ),
    },
    {
      title: '6. Envíos y devoluciones',
      content: (
        <p>
          Los envíos se realizan a todo el país a través de operadores logísticos confiables. Los tiempos y costos pueden variar según ubicación. Consultá nuestra <a href="/PoliticaEnvios">Política de Envíos</a> y <a href="/CambiosDevoluciones">Cambios y Devoluciones</a> para más detalles.
        </p>
      ),
    },
    {
      title: '7. Propiedad intelectual',
      content: (
        <p>
          Todo el contenido del sitio (textos, imágenes, diseño, logos) es propiedad de Moda Total o sus proveedores. No está permitido copiar, distribuir o modificar sin autorización expresa.
        </p>
      ),
    },
    {
      title: '8. Modificaciones del servicio',
      content: (
        <p>
          Podemos actualizar estos términos en cualquier momento. Si hay cambios sustanciales, lo notificaremos en nuestra web o por correo electrónico.
        </p>
      ),
    },
    {
      title: '9. Contacto',
      content: (
        <p>
          Para cualquier duda sobre estas condiciones, escribinos a <a href="mailto:legal@modatotal.com">legal@modatotal.com</a>.
        </p>
      ),
    },
  ];

  return (
    <div className="politica-privacidad-container">
      <h1>Condiciones del Servicio</h1>
      <div className="cards-container">
        {sections.map((section, index) => (
          <div className="card" key={index}>
            <h2>{section.title}</h2>
            <div>{section.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


