/* eslint-disable */
//public key
const mercadopago = new window.MercadoPago(import.meta.env.VITE_APP_MERCADOPAGO, {
    locale: 'es-AR', // The most common are: 'pt-BR', 'es-AR' and 'en-US',
    autoOpen: true,
});
  
export default mercadopago;
