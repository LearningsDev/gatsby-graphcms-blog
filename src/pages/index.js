import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image";


const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Seo title="Home" />
      <div>
        {data.cms.posts.map((v, i) => {
          const image = getImage(v.author.picture.authorAvatar[0].picture.node)
          console.log(v.author);
          return (
            <div className="min-h-40 grid grid-rows-5 gap-4 mb-6 bg-purple-50 rounded-md  text-black" key={i}>

              <div className="row-span-4 grid grid-rows-2 gap-0  text-2xl font-bold p-3 ">
                <Link
                  to={`/posts/${v.slug}`}
                  className="text-gray-900"
                >
                  <div className=" row-span-1 p-3 text-2xl  font-bold text-gray-900"> {v.title} </div>
                </Link>
                <div className=" row-span-1 p-3 text-base  font-normal text-black">
                  {v.excerpt}


                  <div className="  p-3 text-base w-auto text-sm font-black text-purple-600">
                    <Link
                      to={`/posts/${v.slug}`}
                      className="text-purple-700"
                    >
                      {`Read More ->`}
                    </Link>

                  </div>
                </div>
              </div>

              <div className="row-span-1 p-3 grid grid-cols-4 gap-4 text-xs">
                <div className=" flex justify-center items-center">
                  {v.author.name}
                </div>
                <div className="h-12 ">
                  <GatsbyImage image={image} alt={"one"} imgStyle={{ objectFit: 'contain', width: "40px", height: "40px", borderRadius: "50% 50% 50% 50%" }} />
                </div>

                <div className=" flex justify-center items-center">{v.date}</div>

                <div className="grid grid-flow-col auto-cols-max text-xs gap-4 flex justify-center items-center">
                  {v.tags.map((u, j) => <div className="bg-gray-100 rounded px-4 py-1 " key={j}>{u}</div>)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
 query {
   cms {
    posts {
      id
      title
      excerpt
      date
      author {
        name
        picture {
          authorAvatar {
            picture {
              url
              node{
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
          }
        }
      }
      slug
      stage
      tags
      coverImage {
        url
      }
    }
   }
 }
 `
