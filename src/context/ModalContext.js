import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

//carga el nuevo contexto a la constante
export const ModalContext = createContext();

//crea el proveedor del contexto y les pasa como argumento las props
const ModalProvider = props => {
  //[esatdo, actualizador]
  const [idreceta, setIdReceta] = useState(null);
  //[estado, actualizador]
  const [info, setInfo] = useState({});

  //cada vez que idreceta cambie, le consulta a la API la receta
  useEffect(() => {
    //consulta a la API
    const consultarAPI = async () => {
      //valida la existencia del estado
      if (!idreceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await axios.get(url);
      //pasa el resultado al estado
      setInfo(resultado.data.drinks[0]);
    };
    consultarAPI();
  }, [idreceta]);

  return (
    /*retorna el provider con todos los valores a utilizar por medio del metodo value*/
    <ModalContext.Provider value={{ setIdReceta, info, setInfo }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
