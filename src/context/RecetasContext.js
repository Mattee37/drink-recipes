import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//carga el nuevo contexto a la constante
export const RecetasContext = createContext();

//crea el proveedor del contexto y les pasa como argumento las props
const RecetasProvider = props => {
  //[esatdo, actualizador]
  const [recetas, setRecetas] = useState([]);
  //[esatdo, actualizador]
  const [busquedarecetas, setBusquedaRecetas] = useState({
    nombre: "",
    categoria: ""
  });
  //[esatdo, actualizador]
  const [consultar, setConsultar] = useState(false);

  //desestructura los valores del estado
  const { nombre, categoria } = busquedarecetas;

  //cada vez que cambie el estado, consulta la API
  useEffect(() => {
    //valida el estado del estado
    if (consultar) {
      //de ser asi consulta la API
      const consultarAPI = async () => {
        const url = `https://www.thecocktaildb.com/api//json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const resultado = await axios.get(url);
        //pasa la respuesta al estado
        setRecetas(resultado.data.drinks);
      };
      consultarAPI();
    }
  }, [busquedarecetas]);

  return (
    /*retorna el provider con todos los valores a utilizar por medio del metodo value*/
    <RecetasContext.Provider
      value={{ recetas, setBusquedaRecetas, setConsultar }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
