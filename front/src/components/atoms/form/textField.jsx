export const TextField = ({
  value,
  className,
  name,
  rows,
  cols,
  wrap,
  placeHolder,
  defaultValue,
  children,
  onChange,
  onBlur,
  onFocus,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{children}</label>
      <textarea
        value={value}
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        wrap={wrap}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        required
        style={{ width: '100%' }}
      ></textarea>
    </div>
  )
}
