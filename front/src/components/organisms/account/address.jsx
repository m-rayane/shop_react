import { useState, useContext } from 'react'

import '../../../utils/styles/account.scss'

import { AddressForm } from '../../molecules/addressForm'
import { BillingAddress } from '../../molecules/billingAddress'
import { ShippingAddress } from '../../molecules/shippingAddress'
import { ModifyButtons } from '../../molecules/modifyButtons'
import ConfirmBox from '../../molecules/confirmBox'

import UserService from '../../../api/Services/UserServices'
import { Context } from '../../../utils/Context'

export default function Address({
  className,
  userData,
  shippingAddress,
  onSubmitBillingAddress,
  onSubmitShippingAddress,
  handleBlur,
  handleChange,
  errorMsg,
  categories,
}) {
  const userServices = new UserService()
  const { getShippingAddress } = useContext(Context)

  const [targetAddress, setTargetAddress] = useState()
  const [isDelete, setIsDelete] = useState()
  const [isEdit, setIsEdit] = useState()

  const handleDelete = (id) => {
    setIsDelete(!isDelete)
    setTargetAddress(id)
    console.log(isDelete, targetAddress)
  }

  const handleEdit = (id) => {
    setIsEdit(!isEdit)
    setTargetAddress(id)
  }

  const deleteAddress = async (id) => {
    try {
      await userServices.deleteShippingAddress(id)
      setIsDelete('')
      getShippingAddress()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <BillingAddress
        className={`${className}`}
        userData={userData}
        onSubmitBillingAddress={onSubmitBillingAddress}
        handleBlur={handleBlur}
        handleChange={handleChange}
        categories={categories}
      />

      <h2>Vos adresses de livraisons</h2>
      <ShippingAddress
        className={`${className}__shippingAddress`}
        categories={categories}
        handleBlur={handleBlur}
        handleChange={handleChange}
        onSubmitShippingAddress={onSubmitShippingAddress}
        errorMsg={errorMsg}
        shippingAddress={shippingAddress}
      />
    </>
  )
}
