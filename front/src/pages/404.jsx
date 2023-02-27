import React, { useContext, useState } from 'react'

import '../utils/styles/shop.scss'

import { Link } from 'react-router-dom'
import { Context } from '../utils/Context'

export default function Nowhere() {
  return (
    <>
      <h1>ÊTES VOUS PERDUS ?</h1>
      <h2>
        REBROUSSEZ CHEMIN OU REJOIGNEZ LA PAGE D’ACCUEIL PAR{' '}
        <Link to="/" style={{ textDecoration: 'none', color: 'green' }}>
          LÀ
        </Link>{' '}
        !
      </h2>
    </>
  )
}
