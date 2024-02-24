import './App.css';
// import Home from './components/Home';
import {Routes,Route} from 'react-router-dom';
import Signup from './components/Signup';
import Loginpage from './components/Loginpage';
import Login from './components/Login';
import Home from './components/Home';




function App() {
  return (
    <>

      <Routes>
  
        <Route path='/'element={<Loginpage />}/>
        <Route path='/login'element={<Login />}/>
        <Route path='/signup'element={<Signup />}/>
        <Route path='/home'element={<Home />}/>

      </Routes>
    </>
  );
}


export default App;
