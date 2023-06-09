import React, { useEffect, useState } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import { Image, Spinner, Button } from 'react-bootstrap'
import axios from "axios"

export default function SingleRecipe() {
  const {recipeId} = useParams()
  const [thisRecipe, setThisRecipe] = useState([])
  const [loading, setLoading] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const getThisRecipe = () => {
      setLoading(true)
      axios 
        .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/lookup.php?i=${recipeId}`)
        .then(res => {
          setThisRecipe(res.data.meals[0])
          setLoading(false)
        })
        .catch(error => console.log(error))
    }
    getThisRecipe()
  }, [recipeId])

  const search = location.state?.search || ""

  // const allIngredients = Object.keys(thisRecipe)
  //   .filter(key => {
  //     return key.indexOf("strIngredient") == 0
  //   })
  //   .reduce((newData, key) => {
  //     newData[key] = thisRecipe[key]
  //     return newData
  //   }, {})

  // const ingredientsNoEmptyValues = Object.values(allIngredients).filter(value => {
  //   return value !== ""
  // })

  // console.log(ingredientsNoEmptyValues)

  return (
    loading ? 
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
      <div className="single-recipe">
        <h1 >{thisRecipe.strMeal}</h1>
        <Image style={{ "width": "24rem" }} src={thisRecipe.strMealThumb}></Image>
        
        <h4>Instructions:</h4>
        <div className="instructions-cont">
          <p>{thisRecipe.strInstructions}</p>
        </div>

        {/* <h4>Ingredients:</h4> */}

        <div className="buttons-cont">
          {thisRecipe.strYoutube ? 
            <Button 
              style={{ "backgroundColor": "#D50000", "borderColor": "#E0E0E0" }} 
              href={thisRecipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >YouTube
            </Button>
            : null
          }

          <Button 
            href={thisRecipe.strSource} 
            target="_blank" 
            rel="noopener noreferrer"
          >Source
          </Button>
        </div>
        {search ? 
          <Link
            to={`..?${search}`}
            relative="path"
            className="back-button"
          >
            Back to results
          </Link>
          : 
          <Link
            to={`../..`}
            relative="path"
            className="back-button"
          >
            Back to Home
          </Link> 
        }
      </div>
  )
}