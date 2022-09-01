import React from 'react';
import Login from './Pages/Login';
import Add from './Pages/Add';
import Home from './Pages/Home'
import Edit from './Pages/Edit'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
// import {useSelector, useDispatch} from 'react-redux';
// import {increment, decrement} from './actions';
function App() {
  // const counter = useSelector((state) => state.counterReducer);
  // const isLogged = useSelector((state) => state.isLogged)
  // const dispatch = useDispatch();
  return (
    <div className="App">
     <Router>
      <Routes>
     <Route path = "/" element = {<Login />}/>
     <Route path = "/login" element = {<Login />}/>
     <Route path = "/add" element = {<Add />}/>
     <Route path = "/home" element = {<Home />}/>
     <Route path = "/edit" element = {<Edit />}/>
     </Routes>
    </Router>

    </div>
  );
}

export default App;
