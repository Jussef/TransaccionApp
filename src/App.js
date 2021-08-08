import "./App.css";
import AppBar from "./Components/AppBar";
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAXPCAkFI7QK34JyJeV85AnE3CRwxi-WQI",
  authDomain: "transaccionapp.firebaseapp.com",
  projectId: "transaccionapp",
  storageBucket: "transaccionapp.appspot.com",
  messagingSenderId: "171047776259",
  appId: "1:171047776259:web:8a03a1eb50ecbcc6d19e36",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <AppBar />
    </>
  );
}

export default App;
