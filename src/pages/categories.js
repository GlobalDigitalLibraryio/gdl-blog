//@flow
import React from "react"
import Layout from "../components/layout"
import "../styles/blog-listings.css"
import CategoryCard from "../components/categoriesCard"
import BackButton from "../components/backButton"

function CategoriesPage() {
  return (
    <Layout>
      <CategoryCard more={false} />
      <BackButton />
    </Layout>
  )
}

export default CategoriesPage
