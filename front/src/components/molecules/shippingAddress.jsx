import { useState, useContext } from 'react'

import UserService from '../../api/Services/UserServices'
import { Context } from '../../utils/Context'

import { AddressForm } from './addressForm'
import { ModifyButtons } from './modifyButtons'
import ConfirmBox from './confirmBox'

export const ShippingAddress = ({
  className,
  shippingAddress,
  handleBlur,
  handleChange,
  categories,
  onSubmitShippingAddress,
  errorMsg,
  origin,
}) => {
  const userServices = new UserService()
  const { getShippingAddress, targetAddress, setTargetAddress } =
    useContext(Context)

  const [isDelete, setIsDelete] = useState()
  const [isEdit, setIsEdit] = useState()

  const handleDelete = (id) => {
    setIsDelete(!isDelete)
    setTargetAddress(id)
  }

  const handleEdit = (id) => {
    setIsEdit(!isEdit)
    setTargetAddress(id)
  }

  return (
    <>
      <div className={`${className}`}>
        <div className={`${className}__content`}>
          {shippingAddress &&
            shippingAddress.map((address, index) => {
              const deleteAddress = async () => {
                try {
                  await userServices.deleteShippingAddress(address.id)
                  setIsDelete('')
                  getShippingAddress()
                } catch (error) {
                  console.log(error)
                }
              }
              return (
                <li
                  className={`${className}__content__address ${
                    targetAddress === address.id
                      ? 'selected__shipping-address'
                      : ''
                  }`}
                  key={index}
                  onClick={() => setTargetAddress(address.id)}
                  style={
                    targetAddress === address.id
                      ? {
                          background: 'white',
                        }
                      : {}
                  }
                >
                  <div className={`${className}__content__address__info`}>
                    <div
                      className={`${className}__content__address__info__name`}
                    >
                      <p
                        id={
                          targetAddress === address.id
                            ? 'selected--firstName'
                            : ''
                        }
                      >
                        {address.firstName}
                      </p>
                      <p
                        id={
                          targetAddress === address.id
                            ? 'selected--lasttName'
                            : ''
                        }
                      >
                        {`${address.lastName.toUpperCase()}`}
                      </p>
                    </div>
                    <p
                      id={
                        targetAddress === address.id ? 'selected--address' : ''
                      }
                    >
                      {address.address}
                    </p>
                    <p
                      id={
                        targetAddress === address.id ? 'selected--zipcode' : ''
                      }
                    >
                      {address.zipCode}
                    </p>
                    <p
                      id={targetAddress === address.id ? 'selected--city' : ''}
                    >
                      {address.city}
                    </p>
                    <p
                      id={targetAddress === address.id ? 'selected--phone' : ''}
                    >
                      {`0${address.phoneNumber}`}
                    </p>
                  </div>
                  {!isDelete && (
                    <ModifyButtons
                      className={`${className}__content__modifyBtn`}
                      handleDelete={() => handleDelete(address.id)}
                      handleEdit={() => handleEdit(address.id)}
                    />
                  )}

                  {isDelete && targetAddress === address.id && (
                    <ConfirmBox
                      message="Êtes-vous sûr de vouloir supprimer ?"
                      name={'delete address'}
                      className="confirmBox"
                      handleCancel={() => {
                        setIsDelete(!isDelete)
                      }}
                      handleConfirm={deleteAddress}
                    />
                  )}
                </li>
              )
            })}
        </div>
        {origin && (
          <form
            className={`${className}__form`}
            onSubmit={onSubmitShippingAddress}
          >
            <h3 className="">Ajouter une nouvelle adresse de livraison</h3>
            <AddressForm
              categories={categories.shipping}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <button type="submit">
              Ajouter une nouvelle adresse de livraison
            </button>
            <p className={`${className}__form__message`}>
              * champs obligatoires
            </p>
            <p className={`${className}__form__errorMsg`}>{errorMsg}</p>
          </form>
        )}
      </div>
    </>
  )
}
