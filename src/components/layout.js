/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="w-10/12 mx-auto mt-10 min-h-full">
        <main>{children}</main>

      </div>
      <footer className="h-40 bg-purple-800 text-gray-300 text-xs font-extralight grid grid-cols-4 gap-4">
        <div className="flex justify-center items-center">No © {new Date().getFullYear()}, Built with</div>
        <div className="flex justify-center items-center"><a href="https://www.gatsbyjs.com">Gatsby</a></div>
        <div className="flex justify-center items-center"><a href="https://www.graphcms.com">GraphCMS</a></div>
        <div className="flex justify-center items-center"><a href="https://www.tailwindcss.com">Tailwind CSS</a></div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
