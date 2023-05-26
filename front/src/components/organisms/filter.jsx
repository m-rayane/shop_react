import React, { useState, useEffect } from 'react'

export default function Filter({
  classeName,
  productsData,
  setFilteredProducts,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [minRating, setMinRating] = useState(0)
  const [sortType, setSortType] = useState('default')

  useEffect(() => {
    const results = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= minPrice
      // && product.rating >= minRating
    )

    switch (sortType) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        results.sort((a, b) => b.price - a.price)
        break
      // case 'rating-asc':
      //   results.sort((a, b) => a.rating - b.rating)
      //   break
      // case 'rating-desc':
      //   results.sort((a, b) => b.rating - a.rating)
      //   break
      default:
        // Pas de tri
        break
    }

    setFilteredProducts(results)
  }, [
    searchTerm,
    minPrice,
    minRating,
    sortType,
    productsData,
    setFilteredProducts,
  ])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePriceChange = (e) => {
    setMinPrice(parseInt(e.target.value))
  }

  const handleRatingChange = (e) => {
    setMinRating(parseFloat(e.target.value))
  }

  const handleSortChange = (e) => {
    setSortType(e.target.value)
  }

  return (
    <>
      <label>
        Recherche :
        <input type="text" value={searchTerm} onChange={handleSearch} />
      </label>
      <label>
        Trier par :
        <select value={sortType} onChange={handleSortChange}>
          <option value="default">-- Pas de tri --</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating-asc">Avis croissant</option>
          <option value="rating-desc">Avis décroissant</option>
        </select>
      </label>
      <label>
        Prix minimum :
        <input type="number" value={minPrice} onChange={handlePriceChange} />
      </label>
      <label>
        Avis minimum :
        <input
          type="number"
          step="0.1"
          value={minRating}
          onChange={handleRatingChange}
        />
      </label>
    </>
  )
}
