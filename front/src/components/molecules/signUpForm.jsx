import { useContext } from 'react'

import { FormField } from '../atoms/form/formField'

import { Context } from '../../utils/Context'

export const SignUpForm = ({
  className,
  handleChange,
  handleEmailChange,
  isCreating,
  handleBlur,
  defaultValue,
}) => {
  const { setTargetCategory, accountCategories } = useContext(Context)
  return (
    <div className={className + '__fields'}>
      <FormField
        name="firstName"
        className={className + '__fields__field'}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() =>
          setTargetCategory(
            accountCategories.signup.find(
              (item) => item.category === 'firstName'
            )
          )
        }
        placeholder="Prénom*"
        defaultValue={defaultValue ? defaultValue.lastName : ''}
      />
      <FormField
        name="lastName"
        className={className + '__fields__field'}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() =>
          setTargetCategory(
            accountCategories.signup.find((item) => item.key === 'lastName')
          )
        }
        placeholder="Nom*"
        defaultValue={defaultValue ? defaultValue.firstName : ''}
      />
      <FormField
        name="signUpEmail"
        className={className + '__fields__field'}
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() =>
          setTargetCategory(
            accountCategories.signup.find((item) => item.key === 'email')
          )
        }
        placeholder="Adresse email*"
        defaultValue={defaultValue ? defaultValue.email : ''}
      />
      {isCreating && (
        <>
          <FormField
            name="signUpPassword"
            className={className + '__fields__field'}
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={() =>
              setTargetCategory(
                accountCategories.signup.find((item) => item.key === 'password')
              )
            }
            placeholder="Mot de passe*"
          />
          <FormField
            name="confirmPassword"
            className={className + '__fields__field'}
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={() =>
              setTargetCategory(
                accountCategories.signup.find((item) => item.key === 'password')
              )
            }
            placeholder="Confirmez votre mot de passe*"
          />
        </>
      )}
    </div>
  )
}
