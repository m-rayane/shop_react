import { useContext, useEffect } from 'react'

import { FormField } from '../atoms/form/formField'
import { Context } from '../../utils/Context'

export const AddressForm = ({
  categories,
  className,
  handleChange,
  handleBlur,
}) => {
  const { setTargetCategory, targetCategory } = useContext(Context)
  return (
    <div className={`${className}__fields`}>
      {categories &&
        categories.map((item, index) => {
          const isPhoneNumber = item.category.includes('phone')
          return (
            <FormField
              name={item.category}
              className={`${className}__fields__${item.category}`}
              type={isPhoneNumber ? 'phone' : 'text'}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => setTargetCategory(item)}
              placeholder={`${item.name}*`}
              index={index}
            ></FormField>
          )
        })}
    </div>
  )
}
