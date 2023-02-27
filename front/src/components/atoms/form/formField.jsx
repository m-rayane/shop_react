export const FormField = ({
  className,
  name,
  defaultValue,
  onChange,
  type,
  children,
  style,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{children}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        style={style}
      />
    </div>
  )
}
