export const FormField = ({
  className,
  name,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  type,
  children,
  style,
  placeholder,
  value,
  index,
}) => {
  return (
    <div className={`${className} field`} index={index}>
      <label htmlFor={name}>{children}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        style={style}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}
