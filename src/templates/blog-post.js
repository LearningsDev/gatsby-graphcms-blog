import React from "react"
import Layout from "../components/layout";
import Seo from "../components/seo"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image";



export default function BlogPostTemplate({ data, pageContext: { post } }) {

  console.log(data);
  const image = getImage(data.cms.posts[0].coverImage.node)
  return (
    <div>
      <Layout>
        <Seo title={post.title} />
        <div className="min-h-full  bg-purple-50 p-4 mb-10">
          <div className="text-3xl font-bold ">
            {post.title}
          </div>
          <div className="row-span-1 p-3 grid grid-cols-3 gap-4 text-xs">
            <div className=" flex justify-center items-center text-purple-600">{data.cms.post.author.name}</div>
            <div className=" flex justify-center items-center">{data.cms.post.date}</div>

            <div className="grid grid-flow-col auto-cols-max text-xs gap-4 flex justify-center items-center">
              {data.cms.post.tags.map((u, j) => <div className="bg-gray-100 rounded px-4 py-1 " key={j}>{u}</div>)}
            </div>
          </div>

          <div className="object-contain min-h-64 m-10">
            <GatsbyImage image={image} alt={"one"} />
          </div>
          <div className="text-base font-base mt-10 mb-40 text-gray-800">
            <div
              key={`body`}
              id="___gatsby"

              dangerouslySetInnerHTML={{ __html: data.cms.post.content.html }}
            />

          </div>

        </div>

      </Layout>
    </div>
  )
}

export const pageQuery = graphql`
    query($id: ID) {
        cms {
        posts(where: {id: $id}) {
            title
            coverImage {
                url
                node{
                  childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH)
                  }
                }
            }
        }
        post(where: {id: $id}) {
          content {
            html
          }
          author {
            name
          }
          date
          slug
          tags
        }
    }
    }
`;


// <GatsbyImage image={image} alt={"data.blogPost.author"} />