import { EditSvg } from '../atoms/svg/edit'
import { DeleteSvg } from '../atoms/svg/delete'

export const ModifyButtons = ({ className, handleDelete, handleEdit }) => {
  return (
    <div className={`${className}`}>
      <div className={`${className}__editBtn svgButton`} onClick={handleEdit}>
        <EditSvg />
      </div>
      <div
        className={`${className}__deleteBtn svgButton`}
        onClick={handleDelete}
      >
        <DeleteSvg />
      </div>
    </div>
  )
}
