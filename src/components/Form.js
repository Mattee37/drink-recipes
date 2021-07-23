import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { CategoriasContext } from "../context/CategoriaContext";
import { RecetasContext } from "../context/RecetasContext";

const Form = () => {
  //[esatdo, actualizador]
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: ""
  });

  //extrae desde el contex de categoria
  const { categorias } = useContext(CategoriasContext);
  //extrae desde el contex de recetas
  const { setBusquedaRecetas, setConsultar } = useContext(RecetasContext);

  //copia el array de la busqueda y agrega cada valor respectivamente a su nombre
  const obtenerDatos = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={e => {
        e.preventDefault();
        setBusquedaRecetas(busqueda);
        setConsultar(true);
      }}
    >
      <fieldset className="text-center">
        <legend>Busque bebidas por categoria o ingrediente</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Buscar por ingrediente"
            onChange={obtenerDatos}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatos}
          >
            <option value="">-- Seleccione Categoria --</option>
            {categorias.map(categoria => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar bebida"
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  setBusquedaRecetas: PropTypes.func.isRequired,
  setConsultar: PropTypes.func.isRequired
};

export default Form;
