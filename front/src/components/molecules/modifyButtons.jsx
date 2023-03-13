import { Button } from '../atoms/form/button'

export const ModifyButtons = ({
  name,
  className,
  handleDelete,
  handleEdit,
  role,
}) => {
  return (
    <div className={`${className}`}>
      <Button
        name={name}
        className={`${className}__editBtn`}
        onClick={handleEdit}
        children="Modifier"
      />
      {(role === 'admin' || role === 'allUser') && (
        <Button
          name={name}
          className={`${className}__deleteBtn`}
          onClick={handleDelete}
          children="Supprimer"
        />
      )}
    </div>
  )
}
