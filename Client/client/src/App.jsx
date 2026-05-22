import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ShowProduct from './components/product/ShowProduct'
import ProductDetails from "./components/product/ProductDetails"
import Navbar from "./components/Navbar"
import SearchProducts from "./components/product/SearchProducts"
import Register from "./components/user/Register"
import Login from "./components/user/Login"
import Profile from "./components/user/Profile"
import Cart from "./components/Cart"
import Address from "./components/Address"
import CheckOut from "./components/CheckOut"

import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>  
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<ShowProduct/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/product/search/:term' element={<SearchProducts/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/shipping' element={<Address/>} />
        <Route path='/checkout' element={<CheckOut/>} />

      </Routes>
    </Router>
  )
}

export default App
