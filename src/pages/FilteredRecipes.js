import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Spinner from "react-bootstrap/Spinner"
import MapRecipePreviews from "../components/MapRecipePreviews"
import axios from "axios"

export default function FilteredRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()

  const categoryFilter = searchParams.get("category")
  const queryFilter = searchParams.get("q")

  console.log(queryFilter)

  const getMealsByCategory = (cat) => {
    setLoading(true)
    axios
      .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/filter.php?c=${cat}`)
      .then(res => {
        const results = res.data.meals.map(meal => meal)
        setRecipes(results)
        setLoading(false)
      })
      .catch(err => setError(err))
  }

  const getMealsBySearchQuery = (search) => {
    setLoading(true)
    axios
      .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/search.php?s=${search}`)
      .then(res => {
        const results = res.data.meals.map(meal => meal)
        setRecipes(results)
        setLoading(false)
      })
      .catch(err => setError(err))
  }

  useEffect(() => {
    if(categoryFilter) {
      setLoading(true)
      getMealsByCategory(categoryFilter)
    }
    if(queryFilter) {
      getMealsBySearchQuery(queryFilter)
    }
  }, [categoryFilter, queryFilter])

  if(error) {
    return (
      <>
        <h1 style={{ color: "red" }}>There was an error: {error.message}</h1>
        <h2 style={{ color: "red" }}>
          Please try a different search query or check back later.
        </h2>
      </>
    )
  }

  return (
    <>
      <h1 style={{ margin: 0, padding: 20 }} className={`text-center`}>
        Search Results: {queryFilter ? `${queryFilter}` : `${categoryFilter}`} 
      </h1>
      {loading ?
        <div className="loader-container">
          <Spinner  
            animation="border" 
            variant="primary" 
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      :
        <div className={`-bg-primary container`}>
          <MapRecipePreviews recipes={recipes} search={searchParams} query={queryFilter} category={categoryFilter}/>
        </div>
      }
    </>
  )
}