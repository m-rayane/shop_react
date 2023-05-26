import { useContext, useState, useEffect } from 'react'
import { Context } from '../../../utils/Context'

import ShippingCostForm from '../../molecules/shippingCostForm'

import OrderServices from '../../../api/Services/OrderServices'

export default function ShippingCosts({ className }) {
  const { shippingCostData } = useContext(Context)
  const orderServices = new OrderServices()

  const [showForm, setShowForm] = useState(false)
  const [fieldLength, setFieldLength] = useState([])

  useEffect(() => {
    setFieldLength(shippingCostData ? shippingCostData.length : 0)
  }, [shippingCostData])

  const handleSubmitShippingCosts = async (e) => {
    e.preventDefault()
    const newShippingCostsData = []
    // for (let i = 0; i <= fieldLength; i++) {
    //   const data = {
    //     weight: e.target[`shippingWeight--${i}`].value,
    //     price: e.target[`shippingPrice--${i}`].value,
    //   }
    //   newShippingCostsData.push(data)
    // }
    console.log(e.target['shippingCompany'].value)
    console.log(newShippingCostsData)
    const colissimo = {
      company: 'Colissimo',
      item: [
        { weight: 5, price: 1465 },
        { weight: 10, price: 2130 },
        { weight: 15, price: 2695 },
        { weight: 30, price: 3340 },
      ],
    }
    const dpd = {
      company: 'DPD',
      item: [
        { weight: 5, price: 1088 },
        { weight: 10, price: 1277 },
        { weight: 20, price: 1757 },
        { weight: 30, price: 2248 },
      ],
    }
    await orderServices.postShippingCosts(dpd)
  }

  const companyData = {}
  for (const obj of shippingCostData) {
    const company = obj.company
    if (!companyData[company]) {
      companyData[company] = {
        company: company,
        item: [],
      }
    }
    companyData[company].item.push({ weight: obj.weight, price: obj.price })
  }
  const companyDataArray = Object.values(companyData)
  console.log(companyDataArray)

  return (
    <>
      <button onClick={() => setShowForm(true)}>Ajouter un transporteur</button>
      {showForm && (
        <ShippingCostForm
          className={`${className}__form`}
          onSubmit={handleSubmitShippingCosts}
          fieldLength={fieldLength}
          setFieldLength={setFieldLength}
          companyDataArray={companyDataArray}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Transporteur</th>
            <th>Prix / poids</th>
          </tr>
        </thead>
        <tbody>
          {companyDataArray.map((item, index) => (
            <tr key={index}>
              <td>{item.company}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Poids</th>
                      <th>Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.item.map((subItem, subIndex) => (
                      <tr key={subIndex}>
                        <td>jusqu'à {subItem.weight} kg</td>
                        <td>
                          {(subItem.price / 100).toFixed(2).replace('.', ',')} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
