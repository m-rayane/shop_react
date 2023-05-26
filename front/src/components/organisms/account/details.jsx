import '../../../utils/styles/account.scss'

import { useContext, useEffect } from 'react'
import { Context } from '../../../utils/Context'
import CustomerInfo from '../customerInfo'

import { toHandleTestField } from '../../atoms/Services/accountServices'

export default function AccountDetails({ shippingAddressChecked, className }) {
  const {
    userData,
    errorMsg,
    setErrorMsg,
    targetAddress,
    setSelectedShippingAddress,
    shippingAddress,
    targetCategory,
  } = useContext(Context)

  const selectedAddress = shippingAddress.find(
    (address) => address.id === targetAddress
  )

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

  const handleSubmitErrorMsg = (errorMsg) => {
    setErrorMsg(errorMsg)
  }

  useEffect(() => {
    if (targetAddress !== null && shippingAddressChecked) {
      setSelectedShippingAddress(selectedAddress)
    } else {
      setSelectedShippingAddress({
        address: userData.address,
        zipCode: userData.zipCode,
        city: userData.city,
      })
    }
  }, [
    selectedAddress,
    setSelectedShippingAddress,
    shippingAddressChecked,
    targetAddress,
    userData,
  ])

  return (
    <div className={className}>
      <CustomerInfo
        className={`${className}__customerInfo`}
        userData={userData}
        errorMsg={errorMsg}
        handleBlur={handleTestFields}
        handleChange={() => setErrorMsg('')}
        origin="account"
        hideTitle="true"
      />
    </div>
  )
}
