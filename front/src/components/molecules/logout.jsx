import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import ConfirmBox from './confirmBox'
import { Button } from '../atoms/form/button'
import UserService from '../../api/Services/UserServices'
import { Context } from '../../utils/Context'
const userServices = new UserService()

export default function Logout({ className, name, origin }) {
  const { getUser } = useContext(Context)
  const navigate = useNavigate()
  const [confirmLogout, setConfirmLogout] = useState(false)

  const handleCancel = (e) => {
    e.preventDefault()
    setConfirmLogout(false)
    navigate(`/${origin}`, { replace: true })
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      setConfirmLogout('')
      window.location.reload()
      await userServices.logoutUser()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={className}>
      <Button
        className={className + '__logoutBtn'}
        onClick={() => setConfirmLogout(true)}
        name="logoutBtn"
        children="Se déconnecter"
      />
      {confirmLogout && (
        <>
          <div className={className + '__layout'}></div>
          <ConfirmBox
            message="Êtes-vous sûr de vouloir vous déconnecter ?"
            name={name}
            className={className + '__confirmBox'}
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
          />
        </>
      )}
    </div>
  )
}
