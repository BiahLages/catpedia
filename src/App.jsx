import Catpedia from "./components/Catpedia";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Header/Footer";

function App() {
  return (
    <>
      <Header />
      <Catpedia />
      <Footer />
    </>
  );
}

export default App;
