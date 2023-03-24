import { CancelSvg } from '../atoms/svg/cancel'
import { ConfirmSvg } from '../atoms/svg/confirm'

export const ConfirmButtons = ({
  name,
  className,
  handleCancel,
  handleConfirm,
  message,
}) => {
  return (
    <>
      <div className={`${className}`}>
        <div className={`${className}__message`}>{message}</div>
        <div className={`${className}__cancelBtn`}>
          <div className={`${className}__cancelBtn`} onClick={handleCancel}>
            <CancelSvg />
          </div>
          <div className={`${className}__confirmBtn`} onClick={handleConfirm}>
            <ConfirmSvg />
          </div>
        </div>
      </div>
    </>
  )
}
