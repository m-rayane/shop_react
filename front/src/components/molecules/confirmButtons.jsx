import { Button } from '../atoms/form/button'

export const ConfirmButtons = ({
  name,
  className,
  handleCancel,
  handleConfirm,
  message,
}) => {
  return (
    <div className={`${className}`}>
      <Button
        name={name}
        className={`${className}__cancelBtn`}
        onClick={handleCancel}
        children="Annuler"
      />
      <Button
        name={name}
        className={`${className}__confirmBtn`}
        onClick={handleConfirm}
        children={message}
      />
    </div>
  )
}
