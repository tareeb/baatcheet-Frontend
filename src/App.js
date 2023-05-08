import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  return (
    <BrowserRouter>

        {/* <Navbar></Navbar> */}
        
          <Routes>
            <Route path='/' element={<LoginPage></LoginPage>}/>

            <Route path='/login' element={<LoginPage></LoginPage>}/>
            <Route path='/signup' element={<SignupPage></SignupPage>}/>
            <Route path='/home' element={<HomePage></HomePage>}/>

            <Route path='*' element={<p>No Page Found</p>} ></Route>
          </Routes>
       
        {/* <Footer></Footer> */}
        
    </BrowserRouter>
  );
}

export default App;
