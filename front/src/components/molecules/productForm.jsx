import { useEffect, useState } from 'react'

import { FormField } from '../atoms/form/formField'
import { TextField } from '../atoms/form/textField'
import { Button } from '../atoms/form/button'

export default function ProductForm({
  className,
  onSubmit,
  productValue,
  handleImage,
  onChangeShortDesc,
  onChangeDesc,
  propsValue,
  isEditing,
  fileDataURL,
}) {
  return (
    <>
      <form className={className} action="" onSubmit={onSubmit}>
        <table>
          <tr>
            <td>ID</td>
            <td>{propsValue.id}</td>
          </tr>
          <tr>
            <td>Nom</td>
            <td>
              <FormField
                name={productValue.name}
                className={`${className}__formField`}
                defaultValue={propsValue.nameValue}
              />
            </td>
          </tr>
          <tr>
            <td>Description courte</td>
            <td>
              <TextField
                name={productValue.shortDescription}
                className={`${className}__textField`}
                defaultValue={propsValue.shortDescValue}
                onChange={onChangeShortDesc}
              />
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <TextField
                name={productValue.description}
                className={`${className}__textField`}
                defaultValue={propsValue.descValue}
                onChange={onChangeDesc}
              />
            </td>
          </tr>
          <tr>
            <td>Marque</td>
            <td>
              <FormField
                name={productValue.brand}
                className={`${className}__formField`}
                defaultValue={propsValue.brandValue}
              />
            </td>
          </tr>
          <tr>
            <td>Modèle</td>
            <td>
              <FormField
                name={productValue.model}
                className={`${className}__formField`}
                defaultValue={propsValue.modelValue}
              />
            </td>
          </tr>
          <tr>
            <td>Prix unitaire</td>
            <td>
              <FormField
                name={productValue.price}
                className={`${className}__formField`}
                defaultValue={propsValue.priceValue}
              />
            </td>
          </tr>
          <tr>
            <td>Poids unitaire</td>
            <td>
              <FormField
                name={productValue.weight}
                className={`${className}__formField`}
                defaultValue={propsValue.weightValue}
              />
            </td>
          </tr>
          <tr>
            <td>Catégorie</td>
            <td>
              <FormField
                name={productValue.category}
                className={`${className}__formField`}
                defaultValue={propsValue.categoryValue}
              />
            </td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>
              <FormField
                name={productValue.stock}
                className={`${className}__formField`}
                defaultValue={propsValue.stockValue}
              />
            </td>
          </tr>
          <tr>
            <td>Photo principale</td>
            <td style={{ textAlign: 'center' }}>
              {fileDataURL ? (
                <div className="imagePreview">
                  {<img src={fileDataURL} alt="preview" />}
                </div>
              ) : (
                <div className="imageProduct">
                  <img
                    src={propsValue.image}
                    alt={`${propsValue.categoryValue} ${propsValue.nameValue}`}
                  />
                </div>
              )}
              <FormField
                name={productValue.image}
                className={`${className}__formField`}
                type="file"
                onChange={handleImage}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              <Button
                children={
                  isEditing ? 'Modifier le produit' : 'Ajouter un produit'
                }
              />
            </td>
          </tr>
        </table>
      </form>
    </>
  )
}
