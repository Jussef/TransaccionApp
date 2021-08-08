import { React, useState } from "react";
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

export default function ButtonAppBar() {
const [state, setState] = useState({
  valor: "",
});

const handleSubmit = (e) => {
  e.preventDefault();
  const dinero = e.target.valor.value;
  
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
        <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit}>
          <TextField id="valor" label="Cuanto paga?" type="number" name="valor"/>
          <Button variant="contained" color="primary" type="submit">
            Enter
          </Button>
        </form>
      </Container>
    </div>
  );
}
