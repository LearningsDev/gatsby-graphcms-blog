import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header>
    <div className="w-full bg-purple-800 h-20 grid grid-cols-3 gap-4">
      <div className="col-span-1 p-4 text-white font-bold text-lg md:text-2xl flex justify-center items-center">
        <Link to="/">
          {siteTitle}
        </Link>
      </div>
      <div className="col-span-2">

      </div>


    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
