import "./App.scss";
import'react-toastify/dist/ReactToastify.css';
import Movies from "./components/Movies/Movies";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./components/MoviePage/MoviePage";
import ChangeMovie from "./components/ChangeMovie/ChangeMovie";
import { ToastContainer,toast}from'react-toastify';


function App() {

  return (
    <div className="main container">
      <Routes>
        <Route path="/" element={ <Movies /> } />
        <Route path="/movie/:movieId" element={ <MoviePage /> } />
        <Route path="/movie/add" element={ <ChangeMovie isNewFilm={true}/> } />
        <Route path="/movie/change/:movieId" element={ <ChangeMovie isNewFilm={false}  /> } />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
