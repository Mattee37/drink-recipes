import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//carga el nuevo contexto a la constante
export const CategoriasContext = createContext();

//crea el proveedor del contexto y le pasa como argumento las props
const CategoriasProvider = props => {
  //[estado, actualizador]
  const [categorias, setCategorias] = useState([]);

  //cada vez que cargue el componente, pide a la API y la misma responde
  useEffect(() => {
    //consulta la API con la lista de categorias
    const obtenerCategorias = async () => {
      const url = "https://thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const categorias = await axios.get(url);
      //pasa las categorias hacia el estado
      setCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);

  return (
    /*retorna el provider con todos los valores a utilizar por medio del metodo value*/
    <CategoriasContext.Provider value={{ categorias }}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
