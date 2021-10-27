import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
export default function BlogPost({ data }) {

  return (
    <Layout>
      <div>
        <h1>{data.cms.post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.cms.post.content.html }} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostQuery($id: ID!) {
    cms {
      post(where: { id: $id }) {
        content {
          html
        }
        slug
        tags
        title
      }
    }
  }
  `;



