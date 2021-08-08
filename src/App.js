import "./App.css";
import AppBar from "./Components/AppBar";
import {Container, Button} from "@material-ui/core";
import { MakeStyles } from "@material-ui/core/styles";


function App() {
  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <h2>APP</h2>
        <Button variant="contained" color="primary">
          Hola Mundo!
        </Button>
      </Container>
    </>
  );
}

export default App;
