import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import { render } from "@testing-library/react";

var firebaseConfig = {
  apiKey: "AIzaSyAXPCAkFI7QK34JyJeV85AnE3CRwxi-WQI",
  authDomain: "transaccionapp.firebaseapp.com",
  projectId: "transaccionapp",
  storageBucket: "transaccionapp.appspot.com",
  messagingSenderId: "171047776259",
  appId: "1:171047776259:web:8a03a1eb50ecbcc6d19e36",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();
const current_date = moment().format("DD/MM/YYYY");
let dinero;
let texto;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
}));

function renderAhorro(doc) {
  const totales = document.getElementById("totales1");
  const ahorro = doc.data().total;
  totales.innerHTML = ahorro;
}
function renderGastos(doc) {
  const totales = document.getElementById("totales2");
  const gastos = doc.data().total;
  totales.innerHTML = gastos;
}

const totalAhorro = () => {
  db.collection("ahorro")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        renderAhorro(doc);
      });
    });
};
const totalGastos = () => {
  db.collection("gastos")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        renderGastos(doc);
      });
    });
};

const actualiza = () => {
  let cuanto = db
    .collection("ahorro")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        let cuanto = doc.data().total;
        cuanto = parseInt(cuanto) + parseInt(dinero);
        db.collection("ahorro")
          .doc("TuIFhhekmt1GCNx0GrwH")
          .update({
            total: cuanto,
          })
          .then((docRef) => {
            console.log("Document update: ", cuanto);
            totalAhorro();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      });
    });
};

export default function ButtonAppBar() {
  const dataInit = {
    Monto: "",
    Fecha: "",
    Descripcion: "",
  };
  const [data, setData] = useState(dataInit);
  useEffect(() => {
    totalAhorro();
    totalGastos();
  }, []);

  const primero = (e) => {
    e.preventDefault();
    dinero = e.target.valor.value;
    texto = e.target.descripcion.value;
    if (texto === null || texto === "" || texto === undefined) {
      texto = "Vacio";
    }

    setData({ ...data, Monto: dinero, Fecha: current_date, Descripcion: texto });

    db.collection("pagos")
      .add({
        Monto: dinero,
        Fecha: current_date,
        Descripcion: texto,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        actualiza();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    e.target.valor.value = "";
    e.target.descripcion.value = "";
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Ingreso &nbsp; <Icon fontSize="small">add_circle</Icon>
          </Typography>
          <Button color="inherit">
            Egreso &nbsp; <Icon fontSize="small">remove_circle</Icon>
          </Button>
        </Toolbar>
      </AppBar>
      <br />
      <Container maxWidth="sm">
        <form className={classes.root} noValidate autoComplete="on" onSubmit={primero}>
          <TextField id="valor" label="Cuanto paga?" type="number" name="valor" />
          <TextField id="descripcion" label="Descripcion" type="text" name="descripcion" />
          <Button variant="contained" color="primary" type="submit">
            Enter
          </Button>
        </form>
        <p>Monto: {data.Monto}</p>
        <p>Fecha: {data.Fecha}</p>
        <p>Descripción: {data.Descripcion}</p>
        <h4>Totales hasta ahora</h4>
        <p id="totales1"></p>
        <p id="totales2"></p>
      </Container>
    </div>
  );
}
