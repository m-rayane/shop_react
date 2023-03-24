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
}) => {
  return (
    <div className={`${className} field`}>
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
