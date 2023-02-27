import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ConfirmBox from './confirmBox'
import { Button } from '../atoms/form/button'
import UserService from '../../api/Services/UserServices'
const userServices = new UserService()

export default function Logout({ className, name, origin }) {
  const navigate = useNavigate()
  const [confirmLogout, setConfirmLogout] = useState(false)

  const handleCancel = (e) => {
    e.preventDefault()
    setConfirmLogout(false)
    navigate(`/${origin}`, { replace: true })
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    localStorage.clear()
    setConfirmLogout('')
    navigate('/', { replace: true })
    window.location.reload()
    await userServices.logoutUser()
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
            className={className}
            handleCancel={handleCancel}
            handleCconfirm={handleConfirm}
          />
        </>
      )}
    </div>
  )
}
