/* import {useState} from 'react' */
import {Header, Footer} from "./components"
import ProductDetail from './screens/ProductDetails/ProductDetail'
import Products from './screens/Products/Products'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreacionDeProducto from "./screens/CreacionDeProducto/CreacionDeProducto"
import UpdateProduct from "./screens/UpdateProduct/UpdateProduct"
import Delete from "./screens/Delete/Delete"

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/product/:pid' element={<ProductDetail/>}/>
        <Route path='/CreacionDeProducto' element={<CreacionDeProducto/>}/>
        <Route path='/UpdateProduct/:pid' element={<UpdateProduct />} />
        <Route path='/Delete' element={<Delete/>}/>
      </Routes>
      <Footer/>

    </>
  )
}

export default App
