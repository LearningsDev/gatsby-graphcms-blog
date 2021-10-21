import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => (

  <Layout>
    <Seo title="Home" />
    <div>
      {data.cms.posts.map((v, i) => {
        return (
          <div className="h-24 grid grid-cols-3 gap-4 border bg-blue-50 text-black" key={i}>
            <div className=" bg-gray-50 p-3">
              {v.title}
            </div>
            <div className=" p-3">
              {v.author.name}
            </div>
            <div className="bg-gray-50 p-3">
              {v.tags}
            </div>
          </div>
        )
      })}
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
 query {
   cms {
     posts {
       title
       tags
       author {
         name
       }
     }
   }
 }
 `
