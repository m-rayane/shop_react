import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../utils/Context'

import ProductServices from '../../../api/Services/ProductServices'

import ConfirmBox from '../../molecules/confirmBox'
import { ConfirmButtons } from '../../molecules/confirmButtons'
import { ModifyButtons } from '../../molecules/modifyButtons'

import AddProduct from '../product/addProduct'
import ProductDetail from '../product/productDetail'
import { Button } from '../../atoms/form/button'

export default function Products({
  className,
  showAddProductForm,
  setShowAddProductForm,
}) {
  const {
    getProducts,
    productsData,
    targetProduct,
    setTargetProduct,
    isEditedProduct,
    setIsEditedProduct,
    technicalData,
  } = useContext(Context)
  const productServices = new ProductServices()

  const [confirmStatus, setConfirmStatus] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className={className}>
      <div className={`${className}__addProduct`}>
        {showAddProductForm && (
          <>
            <AddProduct
              className={`${className}__addProduct`}
              props={{}}
              requestType="create"
            />
            <Button
              name="cancelAddProduct"
              className={`${className}__addProduct__addProductBtn`}
              onClick={() => setShowAddProductForm(false)}
              children="Annuler"
            />
          </>
        )}
        {!showAddProductForm && (
          <>
            <Button
              name="addProduct"
              className={`${className}__addProduct__addProductBtn`}
              onClick={() => setShowAddProductForm(true)}
              children="Ajouter un produit"
            />
            <div className={`${className}__list`}>
              <h2>Liste des produits</h2>
              <div className={`${className}__list__table`}>
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
                      const priceTTC = product._price.toFixed(2)
                      const priceHT = ((product._price * 100) / 120).toFixed(2)

                      const handleDeleteProduct = async () => {
                        try {
                          await productServices.deleteProduct(product._id)
                          setConfirmStatus(false)
                          await getProducts()
                        } catch (error) {
                          console.log(error)
                        }
                      }
                      return (
                        <>
                          <tr key={product._id}>
                            <td
                              className="link"
                              onClick={() => {
                                setTargetProduct(product._id)
                                setShowDetails(true)
                              }}
                              style={{ color: 'blue' }}
                            >
                              {product._name}
                            </td>
                            <td>{product._brand}</td>
                            <td>{product._model}</td>
                            <td>{product._category}</td>
                            <td>{priceTTC}€</td>
                            <td>{priceHT}€</td>
                          </tr>
                          {showDetails && targetProduct === product._id && (
                            <>
                              <tr>
                                <td colSpan="6" style={{ textAlign: 'right' }}>
                                  <button
                                    onClick={() => {
                                      setTargetProduct(product._id)
                                      setIsEditedProduct(
                                        isEditedProduct ? false : true
                                      )
                                    }}
                                  >
                                    {!isEditedProduct ? 'Modifier' : 'Annuler'}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setConfirmStatus(true)
                                      setIsEditedProduct(false)
                                    }}
                                  >
                                    Supprimer
                                  </button>
                                  {confirmStatus &&
                                    targetProduct === product._id && (
                                      <ConfirmBox
                                        message="Confirmer supprimer produit ?"
                                        className={`${className}__confirmBox`}
                                        handleCancel={() =>
                                          setConfirmStatus(false)
                                        }
                                        handleConfirm={handleDeleteProduct}
                                      />
                                    )}
                                </td>
                              </tr>
                              <tr>
                                {!isEditedProduct && (
                                  <td colSpan="6">
                                    <ProductDetail
                                      className={`${className}__productDetail`}
                                      product={product}
                                      technicalData={technicalData}
                                    />
                                  </td>
                                )}

                                {isEditedProduct &&
                                  targetProduct === product._id && (
                                    <td colSpan="7">
                                      <AddProduct
                                        setIsEditedProduct={setIsEditedProduct}
                                        isEditing="true"
                                        className={`${className}__editedProduct`}
                                        requestType="edit"
                                        props={{
                                          productId: product._id,
                                          nameValue: product._name,
                                          descValue: product._description,
                                          shortDescValue:
                                            product._shortDescription,
                                          techValue: product._technical,
                                          brandValue: product._brand,
                                          modelValue: product._model,
                                          priceValue: product._price,
                                          weightValue: product._weight,
                                          categoryValue: product._category,
                                          stockValue: product._stock,
                                          image: product._image,
                                        }}
                                      />
                                    </td>
                                  )}
                              </tr>
                            </>
                          )}
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
