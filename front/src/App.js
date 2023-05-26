import './utils/styles/App.scss'

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Account from './pages/account'
import Header from './components/organisms/header'
import Footer from './components/organisms/footer'
import Shop from './pages/shop'
import Product from './pages/product'
import Cart from './pages/cart'
import BackOffice from './pages/backOffice'
import ConfirmOrder from './pages/confirmOrder'
import Contact from './pages/contact'
import Nowhere from './pages/404'

function App() {
  return (
    <React.StrictMode>
      <div className="screen">
        <Router>
          <Header />
          <div
            className="main"
            id="main"
            style={{
              minHeight: window.innerHeight - 167,
            }}
          >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/boutique" element={<Shop />} />
              <Route path={`/boutique/:category`} element={<Shop />} />
              <Route path={`/boutique/:category/:id`} element={<Product />} />
              <Route exact path="/compte" element={<Account />} />
              <Route exact path="/back-office" element={<BackOffice />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/panier" element={<Cart />} />
              <Route
                exact
                path="/confirmation/:orderId"
                element={<ConfirmOrder />}
              />
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
