import React, { useContext } from "react";
import PropTypes from "prop-types";

import Recipe from "./Recipe";

import { RecetasContext } from "../context/RecetasContext";

const RecipeList = () => {
  //extrae desde el context recetas
  const { recetas } = useContext(RecetasContext);

  return (
    <div className="row mt-5">
      {recetas.map(receta => (
        <Recipe key={receta.idDrink} receta={receta} />
      ))}
    </div>
  );
};

RecipeList.propTypes = {
  recetas: PropTypes.array.isRequired
};

export default RecipeList;
