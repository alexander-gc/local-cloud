import { AppRouter } from "./router/AppRouter";

import React from 'react'
import { DirProvider } from "./context/DirContext";

export const App = () => {
  return (
    <DirProvider>
      <AppRouter />
    </DirProvider>
  )
}

//render={(props) => <Dir key={props.match.params.path} {...props} />}

