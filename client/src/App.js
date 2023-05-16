import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from "./components/Layout"
import NotFound from "./pages/NotFound"
import ProtectedRoute from './components/ProtectedRoute'
import Home from "./pages/Home"
import About from "./pages/About"
import FilteredRecipes from "./pages/FilteredRecipes"
import RecipesList from "./pages/RecipesList"
import SingleRecipe from "./pages/SingleRecipe"

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/about"
              element={<About />}
            />
            <Route 
              path="/recipes"
              element={<RecipesList />}
            />
            <Route 
              path="/recipes/:recipeId" 
              element={<SingleRecipe />}
            />
            <Route 
              path="/search" 
              element={<FilteredRecipes />}
            />
            <Route 
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}