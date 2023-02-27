import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../utils/styles/account.scss'

import Login from '../components/organisms/login'
import Logout from '../components/molecules/logout'
import AccountBoard from '../components/organisms/account/board'
import Address from '../components/organisms/account/address'
import AccountDetails from '../components/organisms/account/details'
import OrderList from '../components/organisms/account/orderList'

import { Context } from '../utils/Context'

export default function Account() {
  const { userData } = useContext(Context)
  const [showSection, setShowSection] = useState('accountBoard')

  const primaryColor = '#565656'

  const handleShowSection = (section) => {
    setShowSection(section)
  }

  console.log(userData)

  return (
    <>
      {!userData.id && <Login />}
      {userData.id && (
        <>
          <div className="account">
            <section className="account">
              <h1 className="">VOTRE COMPTE</h1>
              <div className="account__main">
                <nav className="account__main__nav">
                  <ul>
                    <li
                      className="account__main__nav__accountBoard"
                      onClick={() => handleShowSection('accountBoard')}
                    >
                      Tableau de bord
                    </li>
                    <li
                      className="account__main__nav__orderList"
                      onClick={() => handleShowSection('orderList')}
                    >
                      Commandes
                    </li>
                    <li
                      className="account__main__nav__address"
                      onClick={() => handleShowSection('address')}
                    >
                      Adresses
                    </li>
                    <li
                      className="account__main__nav__accountDetails"
                      onClick={() => handleShowSection('accountDetails')}
                    >
                      Details du compte
                    </li>
                    <Logout
                      name="logout"
                      className="account__logout"
                      origin="account"
                    />
                  </ul>
                </nav>
                <div className="account__main__content">
                  {showSection === 'accountBoard' && <AccountBoard />}
                  {showSection === 'orderList' && <OrderList />}
                  {showSection === 'address' && <Address />}
                  {showSection === 'accountDetails' && <AccountDetails />}
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  )
}
