import React from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import useSiteMetadata from "../hooks/useSiteMetadata"
import Header from "./header"
import Footer from "./footer"

const theme = {
  primary1: "#330065",
  primary2: "#4D0891",
  primary3: "#6714B8",
  primary4: "#8026D9",
  primary5: "#9A5CD6",
  primary6: "#B37DE8",
  primary7: "#CCA3F5",
  primary8: "#E6CFFC",
  primary9: "#F2E6FF",
  accent1: "#213003",
  accent2: "#426105",
  accent3: "#618A0F",
  accent4: "#7EAD1F",
  accent5: "#99CC33",
  accent6: "#B1E052",
  accent7: "#C7F075",
  accent8: "#DBFA9E",
  accent9: "#EEFFCC",
  grey1: "#222222",
  grey2: "#3B3B3B",
  grey3: "#535353",
  grey4: "#6E6E6E",
  grey5: "#878787",
  grey6: "#A1A1A1",
  grey7: "#BABABA",
  grey8: "#D4D4D4",
  grey9: "#EDEDED",
  grey10: "#F6F6F6",
  warning1: "#FFC2D3",
  warning2: "#FB93AF",
  warning3: "#EC3B6B",
  warning4: "#C10135",
  warning5: "#5B0019",
  info1: "#CDFBFE",
  info2: "#71EDF4",
  info3: "#20D6E1",
  info4: "#0B878E",
  info5: "#012F32",
  fontSize: {
    smallPrint: "11px",
    information: "14px",
    reading: "18px",
    emphasis: "24px",
    highLevel: "29px",
    subHeading: "36px",
    title: "48px",
    display: "64px",
    banner: "68px",
  },
  maxWidth: "800px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)",
  borderRadius: "1000px",
}

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.8rem;
        line-height: 1;
        font-family: "Roboto", Arial, Helvetica, sans-serif;
    }
    /* Remove margin for the main div that Gatsby mounts into*/
    > div {
        margin-top: 0;
    }
    svg {
      width: 32px;
      height: 1%;
      margin: 0px 8px;
    }
    a {
        text-decoration: none;
        
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
      color: ${props => props.theme.primary1};
      & * {
          margin-top: 0.5rem;
      }
    }
    strong {
        color: ${props => props.theme.grey3};
    }
`

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed"
            rel="stylesheet"
          />
        </Helmet>
        <Header siteTitle={title} />

        <main>{children}</main>

        <Footer />
        <GlobalStyle />
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
