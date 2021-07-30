import React from "react"
import { graphql } from "gatsby"
import Countries from "../countries";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { html, title } = data.page // data.markdownRemark holds your post data
  return (
    <main>
      <h1>{title}</h1>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <h2>Countries from StaticQuery</h2>
      <Countries />
    </main>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    page(id: { eq: $id }) {
      html
      slug
      title      
    }
  }
`