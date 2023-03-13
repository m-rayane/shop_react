import { Button } from '../atoms/form/button'

export default function ConfirmBox({
  message,
  cancelName,
  confirmName,
  className,
  handleCancel,
  handleConfirm,
}) {
  return (
    <div className={className}>
      <div className={className + '__title'}>{message}</div>
      <div className={className + '__btn'}>
        <Button
          className={className + '__btn__cancel'}
          onClick={handleCancel}
          name={cancelName}
          children="Annuler"
        />
        <Button
          className={className + '__btn__confirm'}
          onClick={handleConfirm}
          name={confirmName}
          children="Confirmer"
        />
      </div>
    </div>
  )
}
