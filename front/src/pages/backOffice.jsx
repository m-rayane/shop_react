import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../utils/styles/account.scss'

import Login from '../components/organisms/login'
import Logout from '../components/molecules/logout'
import DashBoardAdmin from '../components/organisms/backoffice/dashboard'
import Customers from '../components/organisms/backoffice/customers'
import Products from '../components/organisms/backoffice/products'
import AllOrders from '../components/organisms/backoffice/allOrders'
import ShippingCosts from '../components/organisms/backoffice/shippingCosts'
import {
  toAddShippingAddress,
  toHandleTestField,
} from '../components/atoms/Services/accountServices'

import { Context } from '../utils/Context'

export default function BackOffice() {
  const {
    userData,
    ordersByUser,
    getShippingAddress,
    targetCategory,
    setTargetOrder,
    accountCategories,
    getUser,
    isEditedProduct,
    setIsEditedProduct,
  } = useContext(Context)
  const [showSection, setShowSection] = useState('dashboard')
  const [errorMsg, setErrorMsg] = useState('')
  const [category, setCategory] = useState('')
  const [customerId, setCustomerId] = useState()
  const [customerData, setCustomerData] = useState()
  const [showAddProductForm, setShowAddProductForm] = useState(false)

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
              <div className="backOffice">
                <div className="backOffice__main">
                  <div className="backOffice__main__nav">
                    <nav className="">
                      <ul>
                        <li
                          className="backOffice__main__nav__adminBoard"
                          onClick={() => {
                            handleShowSection('dashboard')
                            setTargetOrder('')
                          }}
                        >
                          Tableau de bord
                        </li>
                        <li
                          className="backOffice__main__nav__orders"
                          onClick={() => {
                            handleShowSection('orders')
                            setTargetOrder('')
                          }}
                        >
                          Commandes
                        </li>
                        <li
                          className="backOffice__main__nav__products"
                          onClick={() => {
                            handleShowSection('products')
                            setShowAddProductForm(false)
                            setIsEditedProduct(false)
                          }}
                        >
                          Produits
                        </li>
                        <li
                          className="backOffice__main__nav__customers"
                          onClick={() => {
                            handleShowSection('customers')
                            setCustomerId('')
                            setCustomerData('')
                          }}
                        >
                          Comptes client
                        </li>
                        <li
                          className="backOffice__main__nav__customers"
                          onClick={() => {
                            handleShowSection('shippingCosts')
                            setCustomerId('')
                            setCustomerData('')
                          }}
                        >
                          Frais de port
                        </li>
                      </ul>
                    </nav>
                    <Logout
                      name="logout"
                      className="backOffice__logout"
                      origin="back-office"
                    />
                  </div>
                  <div className="backOffice__main__content">
                    {showSection === 'dashboard' && (
                      <DashBoardAdmin
                        className={'backOffice__main__content__dashBoard'}
                        userData={userData}
                        orders={ordersByUser}
                      />
                    )}
                    {showSection === 'orders' && (
                      <AllOrders
                        className={'backOffice__main__content__allOrders'}
                      />
                    )}
                    {showSection === 'products' && (
                      <Products
                        className={'backOffice__main__content__products'}
                        showAddProductForm={showAddProductForm}
                        setShowAddProductForm={setShowAddProductForm}
                        isEditedProduct={isEditedProduct}
                        setIsEditedProduct={setIsEditedProduct}
                      />
                    )}
                    {showSection === 'customers' && (
                      <Customers
                        className={'backOffice__main__content__customers'}
                        customerData={customerData}
                        customerId={customerId}
                        setCustomerData={setCustomerData}
                        setCustomerId={setCustomerId}
                      />
                    )}
                    {showSection === 'shippingCosts' && (
                      <ShippingCosts
                        className={'backOffice__main__content__shippingCosts'}
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
