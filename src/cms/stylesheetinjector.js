import React, { useState, useEffect } from "react"
import { StyleSheetManager, ThemeProvider } from "styled-components"

import { theme } from "../components/layout"

const StyleSheetInjector = ({ children }) => {
  const [iframeRef, setIFrameRef] = useState(undefined)

  useEffect(() => {
    const iframe = document.querySelector("#nc-root iframe")
    const iframeHeadElem = iframe && iframe.contentDocument.head

    setIFrameRef(iframeHeadElem)
  })

  return (
    <>
      {iframeRef && (
        <ThemeProvider theme={theme}>
          <StyleSheetManager target={iframeRef}>{children}</StyleSheetManager>
        </ThemeProvider>
      )}
    </>
  )
}

export default StyleSheetInjector
