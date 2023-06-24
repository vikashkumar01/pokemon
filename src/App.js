
import './App.css';

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import Listpokemon from './pages/Listpokemon'
import Navbar from './component/Navbar';
import Pokemondetails from './pages/Pokemondetails'
import Search from './pages/Search';
import Bookmark  from './pages/Bookmark';


function App() {
  return (
    <Router>
       <Navbar/>
       <Routes>
        <Route exact path={"/"} element = {<Listpokemon/>}/>
        <Route exact path={"/pokemondetail/:id"} element = {<Pokemondetails/>}/>
        <Route exact path={"/serach"} element = {<Search/>}/>
        <Route exact path={"/bookmark"} element = {<Bookmark/>}/>
       </Routes>
       
    </Router>
  );
}

export default App;
