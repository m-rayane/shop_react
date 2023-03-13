import '../../utils/styles/App.scss'

import { Link } from 'react-router-dom'

import { LogoSvg } from '../atoms/svg/logo'
import { CartSvg } from '../atoms/svg/cart'
import { ProfileSvg } from '../atoms/svg/profile'
import { ContactSvg } from '../atoms/svg/contact'

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo">
          <LogoSvg />
        </div>
      </Link>
      <div className="header__nav">
        <Link to="/shop" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="header__nav__btn">BOUTIQUE</div>
        </Link>
        <Link to="/cart" style={{ fill: 'white' }}>
          <div className="header__nav__cartSvg">
            <CartSvg />
          </div>
        </Link>
        <Link to="/account" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="header__nav__profileSvg">
            <ProfileSvg />
          </div>
        </Link>
        <Link to="" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="header__nav__contactSvg">
            <ContactSvg />
          </div>
        </Link>
      </div>
    </header>
  )
}
