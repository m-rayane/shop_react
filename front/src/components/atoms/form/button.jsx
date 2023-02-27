export const Button = ({
  className,
  type,
  name,
  value,
  onClick,
  children,
  style,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} />
      <button
        type={type}
        id={name}
        name={name}
        value={value}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}
