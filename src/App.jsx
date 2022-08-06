import Catpedia from "./components/Catpedia";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Header/Footer"

function App() {
  return (
    // <div>
    //   <Routes>
    //     <Route path="/" element={<Catpedia/>}
    //   </Routes>
    // </div>
    <>
      <Header/>
      <Catpedia/>
      <Footer/>
    </>
  );
}

export default App;
