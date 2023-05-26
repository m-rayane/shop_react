import { useContext } from 'react'

import { Context } from '../../../utils/Context'

import Orders from '../orders'

export default function AllOrders({ className }) {
  const { allOrders } = useContext(Context)
  return <Orders orders={allOrders} className={`${className}__orders`} />
}
