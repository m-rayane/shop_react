import accountCategories from '../api/Datas/categories.json'
import React, { createContext, useState, useEffect } from 'react'

import UserService from '../api/Services/UserServices'
import ProductService from '../api/Services/ProductServices'
import OrderService from '../api/Services/OrderServices'
const userServices = new UserService()
const productServices = new ProductService()
const orderServices = new OrderService()

export const Context = createContext({})

export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [usersEmails, setUsersEmails] = useState([])
  const [productsData, setProductsData] = useState([])
  const [shippingAddress, setShippingAddress] = useState([])
  const [ordersByUser, setOrdersByUser] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [reviewsData, setReviewsData] = useState([])
  const userId = localStorage.getItem('userId')
  const expirationDate = localStorage.getItem('expirationDate')
  const userRole = localStorage.getItem('role')
  const [isLoading, setIsLoading] = useState(true)
  const [targetProduct, setTargetProduct] = useState('')
  const [targetCategory, setTargetCategory] = useState('')
  const [targetAddress, setTargetAddress] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [additionnalComment, setAdditionnalComment] = useState()
  const [shippingAddressChecked, setShippingAddressChecked] = useState(false)
  const [selectedShippingAddress, setSelectedShippingAddress] = useState()
  const [orderDetailByUser, setOrderDetailByUser] = useState([])
  const [orderDetailByOrder, setOrderDetailByOrder] = useState([])
  const [cartData, setCartData] = useState()
  const [totalQuantity, setTotalQuantity] = useState()

  // to disconnect if token expired
  useEffect(() => {
    if (expirationDate && expirationDate * 1000 < Date.now()) {
      userServices.logoutUser()
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('role')
      window.location.reload()
    }
  }, [expirationDate])

  // to get ONE user data
  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        setIsLoading(true)
        await userServices
          .getUser(userId)
          .then((response) => {
            setUserData(response)
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error)
          })
      }
      getUser()
    }
  }, [userId])

  // to get ALL users data
  useEffect(() => {
    if (userRole && userRole === 'admin') {
      const getUsers = async () => {
        setIsLoading(true)
        const response = await userServices.getUsers()
        if (response) {
          setUsersData(response)
          setIsLoading(false)
        } else {
          await userServices.logoutUser()
          console.log('no data')
        }
      }
      getUsers()
    }
  }, [userRole])

  // to get ALL users emails
  useEffect(() => {
    const getEmails = async () => {
      setIsLoading(true)
      const response = await userServices.getEmails()
      setUsersEmails(response)
      setIsLoading(false)
    }
    getEmails()
  }, [])

  // to get products data
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      const response = await productServices.getProduct()
      setProductsData(response.reverse())
      setIsLoading(false)
    }
    getProducts()
  }, [userId])

  // to get shipping address data
  useEffect(() => {
    if (userId) {
      const getShippingAddress = async () => {
        setIsLoading(true)
        const response = await userServices.getShippingAddress(userId)
        setShippingAddress(response)
        setIsLoading(false)
      }
      getShippingAddress()
    }
  }, [userId])

  // useEffect(() => {
  //   const getAllAddress = async () => {
  //     setIsLoading(true)
  //     const response = await userServices.getAllAddress()
  //     setShippingAddress(response)
  //     setIsLoading(false)
  //   }
  //   getAllAddress()
  // }, [userId])

  // to get all orders
  useEffect(() => {
    if (userRole && userRole === 'admin') {
      const getAllOrders = async () => {
        setIsLoading(true)
        const response = await orderServices.getAllOrders()
        setAllOrders(response)
        setIsLoading(false)
      }
      getAllOrders()
    }
  }, [userRole])

  // to get orders by user data
  useEffect(() => {
    if (userId) {
      const getOrdersByUser = async () => {
        setIsLoading(true)
        const response = await orderServices.getOrdersByUser(userId)
        setOrdersByUser(response.reverse())
        setIsLoading(false)
      }
      getOrdersByUser()
    }
  }, [userId])

  // to get orders details by user
  useEffect(() => {
    if (userId) {
      const getOrderDetailByUser = async () => {
        setIsLoading(true)
        const response = await orderServices.getOrderDetailByUser(userId)
        setOrderDetailByUser(response.reverse())
        setIsLoading(false)
      }
      getOrderDetailByUser()
    }
  }, [userId])

  useEffect(() => {
    let totalQuantity = 0
    if (cartData) {
      for (let i = 0; i < cartData.length; i++) {
        totalQuantity += cartData[i].quantity
      }
      setTotalQuantity(totalQuantity)
    }
  }, [cartData])

  // functions for re-rendering on every new api call
  const getProducts = async () => {
    const reRender = async () => {
      const reqRes = await productServices.getProduct()
      setProductsData(reqRes.reverse())
    }
    reRender()
  }

  const getReview = async () => {
    const reRender = async (id) => {
      const reqRes = await productServices.getReview(id)
      setReviewsData(reqRes)
    }
    reRender(targetProduct)
  }

  const getUser = async (id) => {
    const reRender = async () => {
      const reqRes = await userServices.getUser(id)
      setUserData(reqRes)
    }
    reRender()
  }

  const getUsers = async () => {
    const reRender = async () => {
      const reqRes = await userServices.getUsers()
      setUsersData(reqRes)
    }
    reRender()
  }

  const getEmails = async () => {
    const reRender = async () => {
      const reqRes = await userServices.getEmails()
      setUsersEmails(reqRes)
    }
    reRender()
  }

  const getShippingAddress = async () => {
    if (userId) {
      const reRender = async () => {
        const reqRes = await userServices.getShippingAddress(userId)
        setShippingAddress(reqRes)
      }
      reRender()
    }
  }

  const getAllOrders = async () => {
    if (userId) {
      const reRender = async () => {
        const reqRes = await orderServices.getAllOrders()
        setAllOrders(reqRes)
      }
      reRender()
    }
  }

  const getOrdersByUser = async () => {
    if (userId) {
      const reRender = async () => {
        const reqRes = await orderServices.getOrdersByUser(userId)
        setShippingAddress(reqRes)
      }
      reRender()
    }
  }

  const getOrderDetailByUser = async () => {
    if (userId) {
      const reRender = async () => {
        const reqRes = await orderServices.getOrderDetailByUser(userId)
        setOrderDetailByUser(reqRes)
      }
      reRender()
    }
  }

  const getOrderDetailByOrder = async (orderId) => {
    if (userId) {
      const reRender = async () => {
        const reqRes = await orderServices.getOrderDetailByOrder(orderId)
        setOrderDetailByOrder(reqRes)
      }
      reRender()
    }
  }

  return (
    <Context.Provider
      value={{
        userData,
        usersData,
        usersEmails,
        productsData,
        reviewsData,
        userId,
        userRole,
        isLoading,
        targetProduct,
        targetCategory,
        targetAddress,
        shippingAddress,
        allOrders,
        ordersByUser,
        orderDetailByUser,
        orderDetailByOrder,
        accountCategories,
        errorMsg,
        additionnalComment,
        shippingAddressChecked,
        selectedShippingAddress,
        cartData,
        totalQuantity,
        getProducts,
        getReview,
        getUser,
        getUsers,
        getEmails,
        getOrderDetailByUser,
        getOrderDetailByOrder,
        setIsLoading,
        setTargetProduct,
        setTargetCategory,
        setTargetAddress,
        getShippingAddress,
        getAllOrders,
        getOrdersByUser,
        setErrorMsg,
        setAdditionnalComment,
        setShippingAddressChecked,
        setSelectedShippingAddress,
        setCartData,
        setTotalQuantity,
      }}
    >
      {children}
    </Context.Provider>
  )
}
