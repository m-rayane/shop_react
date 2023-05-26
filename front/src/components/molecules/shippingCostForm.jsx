import { useState } from 'react'

import { FormField } from '../atoms/form/formField'

export default function ShippingCostForm({
  className,
  onChangeName,
  companyDataArray,
  onSubmit,
  setFieldLength,
  fieldLength,
}) {
  const [field, setField] = useState([])

  const addField = () => {
    setField([...field, ''])
    setFieldLength(fieldLength + 1)
  }

  return (
    <form className={className} onSubmit={onSubmit}>
      {companyDataArray &&
        companyDataArray.map((item, index) => (
          <>
            <FormField
              name="shippingCompany"
              className={`${className}__company`}
              children="Transporteur"
              onChange={onChangeName}
              defaultValue={item.company}
            />
            {/* {item &&
              item.map((item, index) => (
                <div className={`${className}__item`} key={index}>
                  <FormField
                    name={`shippingWeight--${index}`}
                    className={`${className}__weight`}
                    children="Poids"
                    defaultValue={item.weight}
                  />
                  <FormField
                    name={`shippingPrice--${index}`}
                    className={`${className}price`}
                    children="Prix"
                    defaultValue={item.price}
                  />
                </div>
              ))} */}
          </>
        ))}
      {field.map((input, index) => (
        <div className={`${className}__item`} key={index}>
          <FormField
            name={`shippingWeight--${
              companyDataArray ? companyDataArray.length + index : index
            }`}
            className={`${className}__weight`}
            children="Poids"
          />
          <FormField
            name={`shippingPrice--${
              companyDataArray ? companyDataArray.length + index : index
            }`}
            className={`${className}__price`}
            children="Prix"
          />
        </div>
      ))}
      {/* Bouton pour ajouter un nouvel input text */}
      <p
        onClick={addField}
        style={{
          textDecoration: 'underline',
          cursor: 'pointer',
          textAlign: 'right',
        }}
      >
        Ajouter une ligne
      </p>
      <button>Ajouter</button>
    </form>
  )
}
