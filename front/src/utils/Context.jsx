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
  const [reviewsData, setReviewsData] = useState([])
  const userId = localStorage.getItem('userId')
  const expirationDate = localStorage.getItem('expirationDate')
  const [isLoading, setIsLoading] = useState(true)
  const [targetProduct, setTargetProduct] = useState('')
  const [targetCategory, setTargetCategory] = useState('')

  // console.log(document.cookie.indexOf('jwt'))
  // if (document.cookie.indexOf('jwt') !== -1) {
  //   console.log('jwt cookie ok')
  // } else {
  //   console.log('jwt cookie dont exist')
  // }

  // to disconnect if token expired
  useEffect(() => {
    if (expirationDate && expirationDate * 1000 < Date.now()) {
      userServices.logoutUser()
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
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
    } else {
    }
  }, [userId])

  // to get ALL users data
  useEffect(() => {
    if (userId) {
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
  }, [userId])

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
      console.log(id)
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
        const reqRes = await orderServices.getAllOrders(userId)
        setShippingAddress(reqRes)
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

  return (
    <Context.Provider
      value={{
        userData,
        usersData,
        usersEmails,
        productsData,
        reviewsData,
        userId,
        isLoading,
        targetProduct,
        targetCategory,
        shippingAddress,
        ordersByUser,
        accountCategories,
        getProducts,
        getReview,
        getUser,
        getUsers,
        getEmails,
        setIsLoading,
        setTargetProduct,
        setTargetCategory,
        getShippingAddress,
        getAllOrders,
        getOrdersByUser,
      }}
    >
      {children}
    </Context.Provider>
  )
}
