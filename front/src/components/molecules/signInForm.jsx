import { FormField } from '../atoms/form/formField'

export const SignInForm = ({ className, handleChange }) => {
  return (
    <div className={className + '__fields'}>
      <FormField
        name="signInEmail"
        className={className + '__fields__field'}
        type="email"
        onChange={handleChange}
      >
        Email
      </FormField>
      <FormField
        name="signInPassword"
        className={className + '__fields__field'}
        type="password"
        onChange={handleChange}
      >
        Password
      </FormField>
    </div>
  )
}
