import { FormField } from '../atoms/form/formField'

export const AddressForm = ({ className, handleChange }) => {
  return (
    <div className={className + '__fields'}>
      <FormField
        name="address"
        className={className + '__fields__field'}
        type="text"
        onChange={handleChange}
      >
        Numéro et nom de rue
      </FormField>
      <FormField
        name="zipCode"
        className={className + '__fields__field'}
        type="text"
        onChange={handleChange}
      >
        Code postal
      </FormField>
      <FormField
        name="city"
        className={className + '__fields__field'}
        type="text"
        onChange={handleChange}
      >
        Ville
      </FormField>
    </div>
  )
}
