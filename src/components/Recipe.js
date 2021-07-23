import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import PropTypes from "prop-types";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

//estilos del modal dese Material-UI
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//aplica los estilos
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Recipe = ({ receta }) => {
  //extrae desde el context modal
  const { setIdReceta, info, setInfo } = useContext(ModalContext);

  //[estado, actualizador]
  const [modalStyle] = useState(getModalStyle);
  //[esatdo,actualizador]
  const [open, setOpen] = useState(false);

  //inicia las clases del modal
  const classes = useStyles();

  //pone el modal en true
  const handleOpen = () => {
    setOpen(true);
  };

  //pone el modal en false
  const handleClose = () => {
    setOpen(false);
  };

  //muestra los ingredientes con sus medidas desde la respuesta de la API
  const mostrarIngredientes = (info) => {
    //crea un array vacio
    let ingredientes = [];

    //crea un loop por cada elemento existente
    for (let i = 1; i < 16; i++) {
      //valida si valor de el elemento existe
      if (info[`strIngredient${i}`]) {
        //al existir lo agrega al array con el nombre y la cantidad
        ingredientes.push(
          <li>
            {info[`strIngredient${i}`]} -{">"} {info[`strMeasure${i}`]}
          </li>
        );
      }
    }
    //retorna el array
    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          src={receta.strDrinkThumb}
          alt={`${receta.strDrink}`}
          className="card-img-top"
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver receta
          </button>
          <Modal
            open={open}
            onClose={() => {
              handleClose();
              setIdReceta(null);
              setInfo({});
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{info.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{info.strInstructions}</p>
              <img
                src={info.strDrinkThumb}
                alt={info.strDrink}
                className="img-fluid my-4"
              />
              <h3>Ingredientes y cantidades</h3>
              <ul>{mostrarIngredientes(info)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

Recipe.propTypes = {
  receta: PropTypes.object.isRequired,
  setIdReceta: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  setInfo: PropTypes.func.isRequired,
};

export default Recipe;
