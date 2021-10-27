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
          <div className="h-24 grid grid-cols-1 gap-4 " key={i}>
            <Link to={`/posts/${v.slug}`}>
              <div className="  p-3 m-3 border bg-blue-50 text-black text-2xl">
                {v.title}
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
query{
  cms{
    posts{
    id
    title
      author {
        id
        name
      }
      slug
      content{
        markdown
      }
  }}
}   `