import './utils/styles/App.scss'

import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Account from './pages/account'
import Header from './components/organisms/header'
import Footer from './components/organisms/footer'
import Shop from './pages/shop'
import Product from './pages/product'
import Cart from './pages/cart'
import Nowhere from './pages/404'

import { Context } from './utils/Context'
function App() {
  const { productsData } = useContext(Context)
  return (
    <React.StrictMode>
      <div className="screen">
        <Router>
          <Header />
          <div className="main">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/shop" element={<Shop />} />
              <Route path={`/shop/:id`} element={<Product />}></Route>
              <Route exact path="/account" element={<Account />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/*" element={<Nowhere />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </React.StrictMode>
  )
}

export default App
