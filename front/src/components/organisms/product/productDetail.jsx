import '../../../utils/styles/App.scss'

import { useState, useContext } from 'react'

import ProductServices from '../../../api/Services/ProductServices'
import { Context } from '../../../utils/Context'

import { ModifyButtons } from '../../molecules/modifyButtons'
import ConfirmBox from '../../molecules/confirmBox'
import TechnicalForm from '../../molecules/technicalForm'
import OptionForm from '../../molecules/optionForm'

export default function ProductDetail({ className, product, technicalData }) {
  const {
    getProducts,
    getTechnicalsByProduct,
    getOptionsByProduct,
    optionData,
  } = useContext(Context)
  const [targetTechnical, setTargetTechnical] = useState()
  const [isEditedTechnical, setIsEditedTechnical] = useState(false)
  const [targetOption, setTargetOption] = useState()
  const [isEditedOption, setIsEditedOption] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [message, setMessage] = useState(false)

  const productServices = new ProductServices()

  const handleAddTechnical = async (e, id) => {
    e.preventDefault()
    const newTechnicalData = {
      productId: product._id,
      technicalRank: e.target['technicalRank'].value,
      category: e.target['technicalCategory'].value,
      title: e.target['technicalTitle'].value,
      content: e.target['technicalContent'].value,
    }
    try {
      await productServices.postTechnical(newTechnicalData)
      await getTechnicalsByProduct(product._id)
      setMessage('Ajout réussi !')
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddOption = async (e, id) => {
    e.preventDefault()
    const newOptionData = {
      productId: product._id,
      name: e.target['optionName'].value,
      price: e.target['optionPrice'].value,
      description: e.target['optionDescription'].value,
    }
    try {
      await productServices.postOption(newOptionData)
      await getOptionsByProduct(product._id)
      setMessage('Ajout réussi !')
    } catch (error) {
      console.log(error)
    }
  }

  const handleTextareaChange = (e, cat) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <div className={`${className}`}>
      <div className={`${className}__main`}>
        <table>
          <tbody>
            <tr>
              <td>ID :</td>
              <td>{product._id}</td>
            </tr>
            <tr>
              <td>Nom :</td>
              <td>{product._name}</td>
            </tr>
            <tr>
              <td>Description courte :</td>
              <td>{product._shortDescription}</td>
            </tr>
            <tr>
              <td>Description :</td>
              <td>{product._description}</td>
            </tr>
            <tr>
              <td>Marque :</td>
              <td>{product._brand}</td>
            </tr>
            <tr>
              <td>Modèle :</td>
              <td>{product._model}</td>
            </tr>
            <tr>
              <td>Prix :</td>
              <td>{product._price}</td>
            </tr>
            <tr>
              <td>Poids :</td>
              <td>{product._weight}</td>
            </tr>
            <tr>
              <td>Catégorie :</td>
              <td>{product._category}</td>
            </tr>
            <tr>
              <td>Stock :</td>
              <td>{product._stock}</td>
            </tr>
            <tr>
              <td>Photo principale</td>
              <td style={{ textAlign: 'center' }}>
                <img
                  src={product._image}
                  alt={`${product._category} ${product._name}`}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`${className}__technical`}>
        <table className="product__card__technical__content__table">
          <tbody>
            {!isEditedTechnical && (
              <>
                <tr>
                  <td colSpan="4">
                    <TechnicalForm
                      className={`${className}__technical__form`}
                      onSubmit={handleAddTechnical}
                      btnChildren="Ajouter"
                      onChangeContent={(e) => {
                        handleTextareaChange(e)
                        setMessage('')
                      }}
                    />
                    <p
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {message}
                    </p>
                  </td>
                </tr>
              </>
            )}
            {technicalData &&
              technicalData.map((technicalItem) => {
                const handleDeleteTechnical = async () => {
                  setConfirmDelete(false)
                  await productServices.deleteTechnical(technicalItem._id)
                  await getTechnicalsByProduct(product._id)
                }

                const handleEditTechnical = async (e, id) => {
                  e.preventDefault()
                  const newTechnicalData = {
                    technicalRank: e.target['technicalRank'].value,
                    category: e.target['technicalCategory'].value,
                    title: e.target['technicalTitle'].value,
                    content: e.target['technicalContent'].value,
                  }
                  setIsEditedTechnical(false)
                  await productServices.putTechnical(id, newTechnicalData)
                  await getTechnicalsByProduct(product._id)
                }
                return (
                  <>
                    {!isEditedTechnical && (
                      <>
                        <tr>
                          <td>Rang : {technicalItem._technicalRank}</td>
                          <td>Titre : {technicalItem._title}</td>
                          <td>Categorie : {technicalItem._category}</td>
                        </tr>
                        <tr>
                          <td colSpan="3">
                            <div className={`${className}__technical__bottom`}>
                              <div
                                className={`${className}__technical__bottom__content`}
                              >
                                {technicalItem._content}
                              </div>
                              <div
                                className={`${className}__technical__bottom__modifyBtn`}
                              >
                                <ModifyButtons
                                  className=""
                                  handleEdit={() => {
                                    setTargetTechnical(technicalItem._id)
                                    setIsEditedTechnical(
                                      isEditedTechnical ? false : true
                                    )
                                  }}
                                  handleDelete={() => {
                                    setTargetTechnical(technicalItem._id)
                                    setConfirmDelete(true)
                                    setIsEditedTechnical(false)
                                  }}
                                />
                                {confirmDelete &&
                                  targetTechnical === technicalItem._id && (
                                    <ConfirmBox
                                      message={`Confirmer supprimer "${technicalItem._content}" ?`}
                                      className={`${className}__confirmBox`}
                                      handleCancel={() =>
                                        setConfirmDelete(false)
                                      }
                                      handleConfirm={handleDeleteTechnical}
                                      right="10px"
                                    />
                                  )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                    {isEditedTechnical &&
                      targetTechnical === technicalItem._id && (
                        <>
                          <tr>
                            <td>
                              <TechnicalForm
                                technicalItem={technicalItem}
                                onSubmit={(e) =>
                                  handleEditTechnical(e, technicalItem._id)
                                }
                                btnChildren="Modifier"
                                onChangeContent={(e) => handleTextareaChange(e)}
                              />
                            </td>
                          </tr>
                        </>
                      )}
                  </>
                )
              })}
          </tbody>
        </table>
      </div>
      <div className={`${className}__option`}>
        <table className="product__card__option__content__table">
          <tbody>
            {!isEditedOption && (
              <>
                <tr>
                  <td colSpan="4">
                    <OptionForm
                      className={`${className}__option__form`}
                      onSubmit={handleAddOption}
                      btnChildren="Ajouter"
                      onChangeContent={(e) => {
                        handleTextareaChange(e)
                        setMessage('')
                      }}
                    />
                    <p
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {message}
                    </p>
                  </td>
                </tr>
              </>
            )}
            {optionData &&
              optionData.map((optionItem) => {
                const handleDeleteOption = async () => {
                  setConfirmDelete(false)
                  await productServices.deleteOption(optionItem._id)
                  await getOptionsByProduct(product._id)
                }

                const handleEditOption = async (e, id) => {
                  e.preventDefault()
                  const newOptionData = {
                    name: e.target['optionName'].value,
                    price: e.target['optionPrice'].value,
                    description: e.target['optionDescription'].value,
                  }
                  setIsEditedOption(false)
                  await productServices.putOption(id, newOptionData)
                  await getOptionsByProduct(product._id)
                }
                return (
                  <>
                    {!isEditedOption && (
                      <>
                        <tr>
                          <td>Nom : {optionItem._name}</td>
                          <td>Prix : {optionItem._price}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <div className={`${className}__option__bottom`}>
                              <div
                                className={`${className}__option__bottom__content`}
                              >
                                {optionItem._description}
                              </div>
                              <div
                                className={`${className}__option__bottom__modifyBtn`}
                              >
                                <ModifyButtons
                                  className=""
                                  handleEdit={() => {
                                    setTargetOption(optionItem._id)
                                    setIsEditedOption(
                                      isEditedOption ? false : true
                                    )
                                  }}
                                  handleDelete={() => {
                                    setTargetOption(optionItem._id)
                                    setConfirmDelete(true)
                                    setIsEditedOption(false)
                                  }}
                                />
                                {confirmDelete &&
                                  targetOption === optionItem._id && (
                                    <ConfirmBox
                                      message={`Confirmer supprimer "${optionItem._content}" ?`}
                                      className={`${className}__confirmBox`}
                                      handleCancel={() =>
                                        setConfirmDelete(false)
                                      }
                                      handleConfirm={handleDeleteOption}
                                      right="10px"
                                    />
                                  )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                    {isEditedOption && targetOption === optionItem._id && (
                      <>
                        <tr>
                          <td>
                            <OptionForm
                              optionItem={optionItem}
                              onSubmit={(e) =>
                                handleEditOption(e, optionItem._id)
                              }
                              btnChildren="Modifier"
                              onChangeContent={(e) => handleTextareaChange(e)}
                            />
                          </td>
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
  )
}
