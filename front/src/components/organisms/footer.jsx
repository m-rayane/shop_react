import '../../utils/styles/App.scss'

import { useEffect, useState, useContext } from 'react'

import { Context } from '../../utils/Context'

export default function Footer() {
  const {} = useContext(Context)

  return (
    <footer className="footer" id="footer">
      FOOTER
    </footer>
  )
}
