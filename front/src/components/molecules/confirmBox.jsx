import { Button } from '../atoms/form/button'

export default function ConfirmBox({
  message,
  cancelName,
  confirmName,
  className,
  handleCancel,
  handleCconfirm,
}) {
  return (
    <div className={className + '__confirmBox'}>
      <div className={className + '__confirmBox__title'}>{message}</div>
      <div className={className + '__confirmBox__btn'}>
        <Button
          className={className + '__confirmBox__btn__cancel'}
          onClick={handleCancel}
          name={cancelName}
          children="Annuler"
        />
        <Button
          className={className + '__confirmBox__btn__confirm'}
          onClick={handleCconfirm}
          name={confirmName}
          children="Confirmer"
        />
      </div>
    </div>
  )
}
