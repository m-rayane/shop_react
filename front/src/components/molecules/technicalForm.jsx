import { FormField } from '../atoms/form/formField'
import { TextField } from '../atoms/form/textField'

export default function TechnicalForm({
  className,
  technicalItem,
  onSubmit,
  btnChildren,
  onChangeContent,
  onChangeCategoryList,
}) {
  return (
    <form className={className} onSubmit={onSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <FormField
                name="technicalRank"
                className={`${className}__rank`}
                children="Rang"
                defaultValue={technicalItem ? technicalItem._technicalRank : ''}
              />
            </td>
            <td>
              <FormField
                name="technicalTitle"
                className={`${className}__title`}
                children="Titre"
                defaultValue={technicalItem ? technicalItem._title : ''}
              />
            </td>
            <td>
              <label htmlFor="technicalCategory">Catégorie :</label>
              <select
                defaultValue={technicalItem ? technicalItem._category : ''}
                onchange={onChangeCategoryList}
                id="technicalCategory"
              >
                <option value="">-- Choisissez une catégorie --</option>
                <option value="presentation">Présentation</option>
                <option value="advantage">Avantages / points forts</option>
                <option value="description">Description</option>
                <option value="dimension">Dimensions</option>
                <option value="technical">Techniques / matériaux</option>
                <option value="assembly">Installation</option>
                <option value="guarantee">Garantie</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <TextField
                name="technicalContent"
                className={`${className}__content`}
                children="Description"
                defaultValue={technicalItem ? technicalItem._content : ''}
                onChange={onChangeContent}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button>{btnChildren}</button>
    </form>
  )
}
