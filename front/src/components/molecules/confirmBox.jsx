import { Button } from '../atoms/form/button'

export default function ConfirmBox({
  message,
  cancelName,
  confirmName,
  handleCancel,
  handleConfirm,
}) {
  return (
    <div className="confirmBox">
      <div className="confirmBox__title">{message}</div>
      <div className="confirmBox__btn">
        <Button
          className="confirmBox__btn__cancel"
          onClick={handleCancel}
          name={cancelName}
          children="Annuler"
        />
        <Button
          className="confirmBox__btn__confirm"
          onClick={handleConfirm}
          name={confirmName}
          children="Confirmer"
        />
      </div>
    </div>
  )
}
