import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetails";
import FavoriteList from "./components/FavoriteList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NavBar from "./components/NavBar";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          pauseOnHover={false}
          closeOnClick
          draggable
        />
        <NavBar />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:idOrName" element={<PokemonDetail />} />
          <Route path="/favorites" element={<FavoriteList />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
