import '../../../utils/styles/backOffice.scss'

import { useContext, useState } from 'react'
import { Context } from '../../../utils/Context'

import ConfirmBox from '../../molecules/confirmBox'
import { ConfirmButtons } from '../../molecules/confirmButtons'
import { EditSvg } from '../../atoms/svg/edit'

import { Rating } from '../../atoms/rating'

export default function Products({ className }) {
  const { usersData, allOrders, productsData } = useContext(Context)
  const [targetProduct, setTargetProduct] = useState('')

  return (
    <div className={className}>
      <h2>Liste des produits</h2>
      <div className={`${className}__table`}>
        <table>
          <thead>
            <tr>
              <th>Nom du produit</th>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Catégorie</th>
              <th>Prix unitaire (TTC)</th>
              <th>Prix unitaire (HT)</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product) => {
              const handleCancel = (e) => {
                e.preventDefault()
              }
              const handleConfirmStatus = async () => {}
              const priceTTC = product.price.toFixed(2)
              const priceHT = ((product.price * 100) / 120).toFixed(2)

              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.model}</td>
                  <td>{product.category}</td>
                  <td>{priceTTC}€</td>
                  <td>{priceHT}€</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
