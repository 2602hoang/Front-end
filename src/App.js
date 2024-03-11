// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./page/Login"
import Home from "./page/Home"
import ProtectedRoute from "./routing/ProtectedRoute"
import ProtectedRouteNoLogin from "./routing/ProtectedRouteNoLogin"

function App() {
  return (
    <div  >
     <BrowserRouter>
     <Routes>
        <Route path='/Admin'element={
            <ProtectedRouteNoLogin>
              <Login/>
            </ProtectedRouteNoLogin>
          }  />
        <Route path='/' element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          
          
          

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
