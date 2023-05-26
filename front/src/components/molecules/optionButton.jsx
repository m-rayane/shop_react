import { useState, useEffect } from 'react'

export default function OptionButton({
  className,
  optionName,
  index,
  buttonStyle,
}) {
  const [optionKey, setOptionKey] = useState()

  useEffect(() => {
    if (optionName === 'Small') {
      setOptionKey('S')
    } else if (optionName === 'Moyen') {
      setOptionKey('M')
    } else if (optionName === 'Large') {
      setOptionKey('L')
    } else if (optionName === 'XLarge') {
      setOptionKey('XL')
    } else if (optionName === 'XXLarge') {
      setOptionKey('XXL')
    }
  }, [])

  return (
    <button key={index} style={buttonStyle}>
      {optionKey}
    </button>
  )
}
