import React from "react"
import Layout from "../components/layout"
import ArchiveCard from "../components/archiveCard"
import "../styles/blog-listings.css"
import BackButton from "../components/backButton"

function ArchivePage() {
  return (
    <Layout>
      <ArchiveCard></ArchiveCard>
      <BackButton />
    </Layout>
  )
}

export default ArchivePage
