import { FormField } from '../atoms/form/formField'
import { TextField } from '../atoms/form/textField'
import { Button } from '../atoms/form/button'

export default function ProductForm({
  className,
  onSubmit,
  product,
  handleImage,
  descValue,
  techValue,
  onChangeDesc,
  onChangeTech,
}) {
  return (
    <>
      <form className={className} action="" onSubmit={onSubmit}>
        <FormField
          name={product.name}
          className={`${className}__formField`}
          children="Nom"
        />
        <TextField
          name={product.description}
          className={`${className}__textField`}
          children="Description"
          value={descValue}
          onChange={onChangeDesc}
        />
        <TextField
          name={product.technical}
          className={`${className}__textField`}
          children="Caractéristiques techniques"
          value={techValue}
          onChange={onChangeTech}
        />
        <FormField
          name={product.brand}
          className={`${className}__formField`}
          children="Marque"
        />
        <FormField
          name={product.model}
          className={`${className}__formField`}
          children="Modèle"
        />
        <FormField
          name={product.price}
          className={`${className}__formField`}
          children="Prix unitaire"
        />
        <FormField
          name={product.weight}
          className={`${className}__formField`}
          children="Poids unitaire"
        />
        <FormField
          name={product.category}
          className={`${className}__formField`}
          children="Catégorie"
        />
        <FormField
          name={product.stock}
          className={`${className}__formField`}
          children="Stock"
        />
        <FormField
          name={product.image}
          className={`${className}__formField`}
          type="file"
          children="Photo principale"
          onChange={handleImage}
        />
        <Button children="Ajouter" />
      </form>
    </>
  )
}
