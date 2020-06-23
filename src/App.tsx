import React from "react";
import { Provider as StoreProvider } from 'react-redux'
import { NativeRouter } from "react-router-native";
import store from "./redux/store";
import AppContainer from "./AppContainer";

const App = () => {
  return (
    <StoreProvider store={store}>
      <NativeRouter>
        <AppContainer />
      </NativeRouter>
    </StoreProvider>
  )
}

export default App;