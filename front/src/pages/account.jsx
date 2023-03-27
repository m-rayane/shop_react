import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../utils/styles/account.scss'

import Login from '../components/organisms/login'
import Logout from '../components/molecules/logout'
import DashBoard from '../components/organisms/account/dashboard'
import Address from '../components/organisms/account/address'
import AccountDetails from '../components/organisms/account/details'
import OrdersByUser from '../components/organisms/account/ordersByUser'
import {
  toAddShippingAddress,
  toHandleTestField,
} from '../components/atoms/Services/accountServices'

import { Context } from '../utils/Context'

export default function Account() {
  const {
    userData,
    ordersByUser,
    shippingAddress,
    getShippingAddress,
    targetCategory,
    accountCategories,
    getUser,
  } = useContext(Context)
  const [showSection, setShowSection] = useState('dashboard')
  const [showDetails, setShowDetails] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [category, setCategory] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setCategory(targetCategory)
  }, [targetCategory])

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
      'billing',
      getUser
    )
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

  console.log(userData)
  return (
    <>
      {userData.role === 'admin' ? (
        navigate('/back-office', { replace: true })
      ) : (
        <>
          {!userData.id && <Login />}
          {userData.id && (
            <>
              <div className="account">
                <div className="account__main">
                  <div className="account__main__nav">
                    <nav>
                      <ul>
                        <li
                          className="account__main__nav__accountBoard"
                          onClick={() => setShowSection('dashboard')}
                        >
                          Tabeau de bord
                        </li>
                        <li
                          className="account__main__nav__orderList"
                          onClick={() => setShowSection('orderList')}
                        >
                          Commandes
                        </li>
                        <li
                          className="account__main__nav__accountDetails"
                          onClick={() => setShowSection('accountDetails')}
                        >
                          Details du compte
                        </li>
                      </ul>
                    </nav>
                    <Logout
                      name="logout"
                      className="account__logout"
                      origin="account"
                    />
                  </div>
                  <div className="account__main__content">
                    {showSection === 'dashboard' && (
                      <DashBoard
                        userData={userData}
                        className="account__dashboard"
                        onSubmitBillingAddress={handleAddBillingAddress}
                        onSubmitShippingAddress={handleAddShippingAddress}
                        errorMsg={errorMsg}
                        handleBlur={handleTestFields}
                        handleChange={() => setErrorMsg('')}
                        categories={accountCategories}
                      />
                    )}
                    {showSection === 'orderList' && (
                      <OrdersByUser
                        userData={userData}
                        orders={ordersByUser}
                        setShowDetails={setShowDetails}
                        showDetails={showDetails}
                      />
                    )}
                    {showSection === 'accountDetails' && (
                      <AccountDetails userData={userData} />
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
