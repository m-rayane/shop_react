import { FormField } from '../atoms/form/formField'
import { TextField } from '../atoms/form/textField'

export default function OptionForm({
  className,
  optionItem,
  onSubmit,
  btnChildren,
}) {
  return (
    <>
      <form className={className} onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <FormField
                  name="optionName"
                  className={`${className}__name`}
                  children="Nom"
                  defaultValue={optionItem ? optionItem._name : ''}
                />
              </td>
              <td>
                <FormField
                  name="optionPrice"
                  className={`${className}__price`}
                  children="Prix"
                  defaultValue={optionItem ? optionItem._price : ''}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <TextField
                  name="optionDescription"
                  className={`${className}__description`}
                  children="Description"
                  defaultValue={optionItem ? optionItem._description : ''}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>{btnChildren}</button>
      </form>
    </>
  )
}
