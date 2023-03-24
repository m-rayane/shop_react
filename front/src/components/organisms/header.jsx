import '../../utils/styles/App.scss'

import { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { LogoSvg } from '../atoms/svg/logo'
import { CartSvg } from '../atoms/svg/cart'
import { ProfileSvg } from '../atoms/svg/profile'
import { ContactSvg } from '../atoms/svg/contact'
import { BackOfficeSvg } from '../atoms/svg/backOffice'

import { Context } from '../../utils/Context'

export default function Header() {
  const { userData, cartData, setCartData } = useContext(Context)

  let totalQuantity = 0
  if (cartData) {
    for (let i = 0; i < cartData.length; i++) {
      totalQuantity += cartData[i].quantity
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [setCartData])

  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo">
          <LogoSvg />
        </div>
      </Link>
      <div className="header__nav">
        <Link to="/boutique" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="header__nav__btn">BOUTIQUE</div>
        </Link>
        <Link to="/panier" style={{ fill: 'white' }}>
          <div className="header__nav__cartSvg">
            <CartSvg />
          </div>
          <div className="header__nav__cartSvg__cartQty">{totalQuantity}</div>
        </Link>
        <Link to="" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="header__nav__contactSvg">
            <ContactSvg />
          </div>
        </Link>
        {userData.role !== 'admin' && (
          <Link to="/compte" style={{ textDecoration: 'none', color: 'white' }}>
            <div className="header__nav__profileSvg">
              <ProfileSvg />
            </div>
          </Link>
        )}
        {userData.role === 'admin' && (
          <Link
            to="/back-office"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <div className="header__nav__backSvg">
              <BackOfficeSvg />
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}
