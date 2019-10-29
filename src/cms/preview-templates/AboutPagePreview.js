import React from "react"
import PropTypes from "prop-types"
import AboutPageTemplate from "../../templates/contentpage"

const AboutPagePreview = ({ entry, widgetFor }) => {
  console.log(entry, widgetFor)
  return (
    <AboutPageTemplate
      data={{
        frontmatter: entry.getIn(["data"]).toJS(),
        html: entry.getIn(["data"], "body"),
        bodyIsMarkdown: true,
      }}
    />
  )
}

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
