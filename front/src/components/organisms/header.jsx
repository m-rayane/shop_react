import '../../utils/styles/App.scss'

import { Link } from 'react-router-dom'

import { LogoSvg } from '../atoms/svg/logo'

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
          <div className="header__nav__btn">NOS PRODUITS</div>
        </Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="header__nav__btn">PANIER</div>
        </Link>
        <Link to="/account" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="header__nav__btn">COMPTE</div>
        </Link>
        <Link to="" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="header__nav__btn">CONTACT</div>
        </Link>
      </div>
    </header>
  )
}
