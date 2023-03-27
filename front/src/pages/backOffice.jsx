import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../utils/styles/account.scss'

import Login from '../components/organisms/login'
import Logout from '../components/molecules/logout'
import DashBoardAdmin from '../components/organisms/backoffice/dashboard'
import Customers from '../components/organisms/backoffice/customers'
import Products from '../components/organisms/backoffice/products'
import AllOrders from '../components/organisms/backoffice/allOrders'
import {
  toAddShippingAddress,
  toHandleTestField,
} from '../components/atoms/Services/accountServices'

import { Context } from '../utils/Context'

export default function BackOffice() {
  const {
    userData,
    usersData,
    shippingAddress,
    ordersByUser,
    getShippingAddress,
    targetCategory,
    accountCategories,
    getUser,
  } = useContext(Context)
  const [showSection, setShowSection] = useState('dashboard')
  const [errorMsg, setErrorMsg] = useState('')
  const [category, setCategory] = useState('')
  const [customerId, setCustomerId] = useState()
  const [customerData, setCustomerData] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    setCategory(targetCategory)
  }, [targetCategory])

  const handleShowSection = (section) => {
    setShowSection(section)
  }

  const handleSubmitErrorMsg = (errorMsg) => {
    setErrorMsg(errorMsg)
  }

  const handleAddBillingAddress = async (e) => {
    toAddShippingAddress(
      e,
      accountCategories.billing,
      userData,
      {
        errorMsg: handleSubmitErrorMsg,
      },
      'billing'
    )
    getUser()
  }

  const handleAddShippingAddress = async (e) => {
    toAddShippingAddress(e, accountCategories.shipping, userData, {
      errorMsg: handleSubmitErrorMsg,
    })
    getShippingAddress()
  }

  const handleTestFields = () => {
    toHandleTestField(
      targetCategory.category,
      targetCategory.name,
      targetCategory.message,
      {
        errorMsg: handleSubmitErrorMsg,
      }
    )
  }

  return (
    <>
      {userData.role !== 'admin' ? (
        navigate('/compte', { replace: true })
      ) : (
        <>
          {!userData.id && <Login />}
          {userData.id && (
            <>
              <div className="account">
                <div className="account__main">
                  <div className="account__main__nav">
                    <nav className="">
                      <ul>
                        <li
                          className="account__main__nav__adminBoard"
                          onClick={() => handleShowSection('dashboard')}
                        >
                          Tabeau de bord
                        </li>
                        <li
                          className="account__main__nav__orders"
                          onClick={() => handleShowSection('orders')}
                        >
                          Commandes
                        </li>
                        <li
                          className="account__main__nav__products"
                          onClick={() => handleShowSection('products')}
                        >
                          Produits
                        </li>
                        <li
                          className="account__main__nav__customers"
                          onClick={() => {
                            handleShowSection('customers')
                            setCustomerId('')
                            setCustomerData('')
                          }}
                        >
                          Comptes client
                        </li>
                      </ul>
                    </nav>
                    <Logout
                      name="logout"
                      className="account__logout"
                      origin="back-office"
                    />
                  </div>
                  <div className="account__main__content">
                    {showSection === 'dashboard' && (
                      <DashBoardAdmin
                        className={'account__main__content__dashBoard'}
                        userData={userData}
                        orders={ordersByUser}
                      />
                    )}
                    {showSection === 'customers' && (
                      <Customers
                        className={'account__main__content__customers'}
                        customerData={customerData}
                        customerId={customerId}
                        setCustomerData={setCustomerData}
                        setCustomerId={setCustomerId}
                      />
                    )}
                    {showSection === 'orders' && (
                      <AllOrders
                        className={'account__main__content__allOrders'}
                      />
                    )}
                    {showSection === 'products' && (
                      <Products
                        className={'account__main__content__products'}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
