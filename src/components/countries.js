import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Countries() {
  const data = useStaticQuery(graphql`
    query CountriesQuery {
      allCountry {
        edges {
          node {
            iso
            name
          }
        }
      }
    }
  `);

  return (
    <ul>
      {data.allCountry.edges.map(({ node }) => <li>{node.name}</li>)}
    </ul>
  )
}
