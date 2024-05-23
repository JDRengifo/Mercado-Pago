import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const Producto = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("YOUR_PUBLIC_KEY", {
    locale: "es-AR",
  });

  const crearPago = async () => {
    try {
      const response = await axios.post("http://localhost:3000/crearPago", {
        producto: "pagoHonorarios",
        cantidad: 1,
        precio: 1000,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePago = async () => {
    const id = await crearPago();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <>
      <div>
        <h1>Aca Va El Producto A Cobrar</h1>
        <button onClick={handlePago}>Comprar</button>
        {preferenceId && (
          <Wallet initialization={{ preferenceId: preferenceId }} />
        )}
        {/* <Wallet
          initialization={{ preferenceId: "<PREFERENCE_ID>" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />; */}
      </div>
    </>
  );
};

export default Producto;
