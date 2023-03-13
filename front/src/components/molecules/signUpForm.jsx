import { FormField } from '../atoms/form/formField'

export const SignUpForm = ({
  className,
  handleChange,
  handleEmailChange,
  isCreating,
}) => {
  return (
    <div className={className + '__fields'}>
      <FormField
        name="firstName"
        className={className + '__fields__field'}
        type="text"
        onChange={handleChange}
      >
        Prénom
      </FormField>
      <FormField
        name="lastName"
        className={className + '__fields__field'}
        type="text"
        onChange={handleChange}
      >
        Nom
      </FormField>
      <FormField
        name="signUpEmail"
        className={className + '__fields__field'}
        type="email"
        onChange={handleEmailChange}
      >
        Adresse Email
      </FormField>
      {isCreating && (
        <>
          <FormField
            name="signUpPassword"
            className={className + '__fields__field'}
            type="password"
            onChange={handleChange}
          >
            Mot de passe
          </FormField>
          <FormField
            name="confirmPassword"
            className={className + '__fields__field'}
            type="password"
            onChange={handleChange}
          >
            Confirmez votre mot de passe
          </FormField>
        </>
      )}
    </div>
  )
}
