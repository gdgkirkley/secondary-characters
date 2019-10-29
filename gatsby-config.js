require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Secondary Characters`,
    description: `The official site of Secondary Characters`,
    author: `Gabe Kirkley`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        htmlTitle: "SC Admin",
        htmlFavicon: `${__dirname}/static/img/sc-logo-no-background_1.png`,
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://secondarycharacters.us7.list-manage.com/subscribe/post?u=2f54245a577f34db39743347e&id=37f2aae127",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `@dylanvann/gatsby-transformer-cloudinary`,
            options: {
              cloudName: process.env.CLOUDINARY_CLOUD_NAME,
              apiKey: process.env.CLOUDINARY_API_KEY,
              apiSecret: process.env.CLOUDINARY_API_SECRET,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `secondary-characters`,
        short_name: `sc`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/sc-logo-no-background_1.png`,
      },
    },
  ],
}
