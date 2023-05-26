import '../../../utils/styles/product.scss'

import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '../../../utils/Context'
import FormData from 'form-data'

import ProductForm from '../../molecules/productForm'
import ProductServices from '../../../api/Services/ProductServices'

export default function AddProduct({
  className,
  props,
  requestType,
  isEditing,
}) {
  const {
    getProducts,
    technicalData,
    optionData,
    isEditedProduct,
    setIsEditedProduct,
    setProductsData,
  } = useContext(Context)
  const postServices = new ProductServices()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [file, setFile] = useState(null)
  const [fileDataURL, setFileDataURL] = useState(null)
  const [descValue, setDescValue] = useState('')
  const [shortDescValue, setShortDescValue] = useState('')
  const [techDataLength, setTechDataLength] = useState()
  const [optionDataLength, setOptionDataLength] = useState()
  const [confirmMsg, setConfirmMsg] = useState()

  useEffect(() => {
    setTechDataLength(technicalData ? technicalData.length : 0)
    setOptionDataLength(optionData ? optionData.length : 0)
  }, [optionData, technicalData])

  const imageMimeType = /image\/(png|jpg|jpeg)/i

  const productValue = {
    name: 'name',
    shortDescription: 'shortDescription',
    description: 'description',
    technical: 'technical',
    brand: 'brand',
    model: 'model',
    price: 'price',
    weight: 'weight',
    category: 'category',
    image: 'image',
    stock: 'stock',
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      alert('Image mime type is not valid')
      return
    }
    setFile(file)
    console.log(file)
  }

  const HandleSubmit = async (e, request, id, oldImage) => {
    e.preventDefault()

    const createdData = new FormData()
    createdData.append('name', e.target['name'].value)
    createdData.append('shortDescription', e.target['shortDescription'].value)
    createdData.append('description', e.target['description'].value)
    createdData.append('brand', e.target['brand'].value)
    createdData.append('model', e.target['model'].value)
    createdData.append('price', e.target['price'].value)
    createdData.append('weight', e.target['weight'].value)
    createdData.append('category', e.target['category'].value)
    createdData.append('stock', e.target['stock'].value)
    createdData.append('image', file)

    const editedData = new FormData()
    editedData.append('productId', id)
    editedData.append('name', e.target['name'].value)
    editedData.append('shortDescription', e.target['shortDescription'].value)
    editedData.append('description', e.target['description'].value)
    editedData.append('brand', e.target['brand'].value)
    editedData.append('model', e.target['model'].value)
    editedData.append('price', e.target['price'].value)
    editedData.append('weight', e.target['weight'].value)
    editedData.append('category', e.target['category'].value)
    editedData.append('stock', e.target['stock'].value)
    editedData.append('oldImage', oldImage)
    editedData.append('image', file)

    try {
      await setIsEditedProduct(false)
      request === 'create'
        ? await postServices.postProduct(createdData)
        : await postServices.putProduct(id, editedData)
      await getProducts()
      await setIsEditedProduct(false)
      setConfirmMsg(
        request === 'create'
          ? 'Produit crée avec succés'
          : 'Produit modifié avec succés'
      )
    } catch (error) {
      console.log(error)
      await getProducts()
      await setIsEditedProduct(false)
    }
  }

  useEffect(() => {
    let fileReader,
      isCancel = false
    if (file) {
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [file])

  const handleTextareaChange = (e, cat) => {
    cat === 'desc'
      ? setDescValue(e.target.value)
      : setShortDescValue(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <>
      {!isEditing && <h2>AJOUTER UN PRODUIT</h2>}
      {isEditing && <h2>MODIFIER LE PRODUIT</h2>}
      <ProductForm
        isEditing={isEditing}
        className={className}
        onSubmit={(e) =>
          requestType === 'create'
            ? HandleSubmit(e, 'create')
            : HandleSubmit(e, 'edit', props.productId, props.image)
        }
        productValue={productValue}
        handleImage={handleImageChange}
        onChangeDesc={(e) => handleTextareaChange(e, 'desc')}
        onChangeShortDesc={(e) => handleTextareaChange(e, 'shortDesc')}
        technicalData={technicalData}
        optionData={optionData}
        setTechDataLength={setTechDataLength}
        techDataLength={techDataLength}
        setOptionDataLength={setOptionDataLength}
        optionDataLength={optionDataLength}
        propsValue={{
          id: props.productId,
          nameValue: props.nameValue,
          shortDescValue: props.shortDescValue,
          descValue: props.descValue,
          techValue: props.techValue,
          brandValue: props.brandValue,
          modelValue: props.modelValue,
          priceValue: props.priceValue,
          weightValue: props.weightValue,
          categoryValue: props.categoryValue,
          stockValue: props.stockValue,
          image: props.image,
        }}
        fileDataURL={fileDataURL}
      />
      <p style={{ color: 'green' }}>{confirmMsg}</p>
    </>
  )
}
