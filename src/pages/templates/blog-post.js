import React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"


import Layout from "../../components/layout"
export default function BlogPost({ data }) {
  const image = data.cms.post.coverImage.node.childImageSharp.fluid.src
  return (
    <Layout>
      <div>
        <h1>{data.cms.post.title}</h1>
        <img src={image} alt="A dinosaur" />
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
        coverImage {
          url
          id
          size
          node {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
  `;



