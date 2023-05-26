import { useState, useContext } from 'react'

import UserService from '../../api/Services/UserServices'
import { Context } from '../../utils/Context'

import { AddressForm } from './addressForm'
import { ModifyButtons } from './modifyButtons'
import ConfirmBox from './confirmBox'
import { FormField } from '../atoms/form/formField'
import { DeleteSvg } from '../atoms/svg/delete'

export const ShippingAddress = ({
  className,
  shippingAddress,
  handleBlur,
  handleChange,
  categories,
  onSubmitShippingAddress,
  onSubmitEditedAddress,
  errorMsg,
  origin,
}) => {
  const userServices = new UserService()
  const {
    getShippingAddress,
    targetAddress,
    setTargetAddress,
    showAddShippingForm,
    setShowAddShippingForm,
  } = useContext(Context)

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
                <>
                  {!isEdit && (
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
                              background: '#fed137',
                              fontSize: '1rem',
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
                            targetAddress === address.id
                              ? 'selected--address'
                              : ''
                          }
                        >
                          {address.address}
                        </p>
                        <p
                          id={
                            targetAddress === address.id
                              ? 'selected--zipcode'
                              : ''
                          }
                        >
                          {address.zipCode}
                        </p>
                        <p
                          id={
                            targetAddress === address.id ? 'selected--city' : ''
                          }
                        >
                          {address.city}
                        </p>
                        <p
                          id={
                            targetAddress === address.id
                              ? 'selected--phone'
                              : ''
                          }
                        >
                          {`0${address.phoneNumber}`}
                        </p>
                      </div>
                      {!isDelete && (
                        <div
                          className={`${className}__deleteBtn svgButton`}
                          onClick={handleDelete}
                        >
                          <DeleteSvg />
                        </div>
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
                  )}
                  {isEdit && targetAddress === address.id && (
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
                      <form
                        className={`${className}__content__address__form`}
                        onSubmit={onSubmitEditedAddress}
                      >
                        <p
                          id={
                            targetAddress === address.id
                              ? 'selected--firstName'
                              : ''
                          }
                        >
                          <FormField
                            defaultValue={address.firstName}
                            name="editedFirstName"
                          />
                        </p>
                        <p
                          id={
                            targetAddress === address.id
                              ? 'selected--lasttName'
                              : ''
                          }
                        >
                          <FormField
                            defaultValue={address.lastName}
                            name="editedLastName"
                          />
                        </p>
                        <p
                          id={
                            targetAddress === address.id
                              ? 'selected--address'
                              : ''
                          }
                        >
                          <FormField
                            defaultValue={address.address}
                            name="editedAddress"
                          />
                        </p>
                        <p
                          id={
                            targetAddress === address.id
                              ? 'selected--zipcode'
                              : ''
                          }
                        >
                          <FormField
                            defaultValue={address.zipCode}
                            name="editedZipCode"
                          />
                        </p>
                        <p
                          id={
                            targetAddress === address.id ? 'selected--city' : ''
                          }
                        >
                          <FormField
                            defaultValue={address.city}
                            name="editedCity"
                          />
                        </p>
                        <p
                          id={
                            targetAddress === address.id
                              ? 'selected--phone'
                              : ''
                          }
                        >
                          <FormField
                            defaultValue={`0${address.phoneNumber}`}
                            name="editedPhone"
                          />
                        </p>
                        <div
                          className={`${className}__content__address__form__btn`}
                        >
                          <button onClick={() => setIsEdit(false)}>
                            Annuler
                          </button>
                          <button>Modifier</button>
                        </div>
                      </form>
                    </li>
                  )}
                </>
              )
            })}
        </div>
        {origin && !showAddShippingForm && (
          <button onClick={() => setShowAddShippingForm(true)}>
            Ajouter une nouvelle adresse de livraison
          </button>
        )}
        {origin && showAddShippingForm && (
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
            <div className={`${className}__form__btn`}>
              <button type="submit">Ajouter</button>
              <button onClick={() => setShowAddShippingForm(false)}>
                Annuler
              </button>
            </div>
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
