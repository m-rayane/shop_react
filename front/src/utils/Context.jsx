import React, { createContext, useState, useEffect } from 'react'

import UserService from '../api/Services/UserServices'
import ProductService from '../api/Services/ProductServices'
const userServices = new UserService()
const productServices = new ProductService()

export const Context = createContext({})

export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [productsData, setProductsData] = useState([])
  const [reviewsData, setReviewsData] = useState([])
  const userId = localStorage.getItem('userId')
  const expirationDate = localStorage.getItem('expirationDate')
  const [isLoading, setIsLoading] = useState(true)
  const [targetProduct, setTargetProduct] = useState('')

  // to disconnect if token expired
  useEffect(() => {
    if (expirationDate && expirationDate * 1000 < Date.now()) {
      userServices.logoutUser()
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
        setUsersData(response)
        setIsLoading(false)
      }
      getUsers()
    }
  }, [userId])

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

  // to get reviews data
  // useEffect(() => {
  //   const getReview = async (id) => {
  //     try {
  //       const res = await productServices.getReview(id)
  //       setReviewsData(res)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getReview(targetProduct)
  // }, [targetProduct])

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

  const getUser = async () => {
    const reRender = async () => {
      const reqRes = await userServices.getUser()
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

  return (
    <Context.Provider
      value={{
        userData,
        usersData,
        productsData,
        reviewsData,
        userId,
        isLoading,
        targetProduct,
        getProducts,
        getReview,
        getUser,
        getUsers,
        setIsLoading,
        setTargetProduct,
      }}
    >
      {children}
    </Context.Provider>
  )
}
