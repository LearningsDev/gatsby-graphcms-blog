import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"


import Layout from "../../components/layout"
export default function BlogPost({ data }) {

  const image = data.cms.post.coverImage.node.childImageSharp.fluid.src
  return (
    <Layout>
      <div>
        <h1>{data.cms.post.title}</h1>

        <img src={image} alt="A dinosaur" className="rounded-md" />
        <div className="my-2  p-2 grid grid-cols-12 gap-4">
          {
            data.cms.post.tags.map((v, i) => {
              return (
                <div key={i} className="col-span-2 bg-indigo-200 p-2 rounded border border-indigo-600 flex justify-center items-center text-sm">
                  <Link to={`/${v}`}>
                    {v}
                  </Link>
                </div>
              )
            })
          }
        </div>

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



