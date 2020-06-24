import React from "react";
import { Provider as StoreProvider } from 'react-redux'
import { NativeRouter, BackButton } from "react-router-native";
import store from "./redux/store";
import AppContainer from "./AppContainer";
import { DrawerLayoutAndroid, Text, View, StyleSheet, Button } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MenuDrawer from "./components/MenuAppBar/MenuDrawer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  navigationContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    padding: 8
  }
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  const drawerRef = React.useRef(null);

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NativeRouter>
          <BackButton>
            <DrawerLayoutAndroid
              ref={drawerRef}
              drawerWidth={200}
              drawerPosition={"left" as any}
              renderNavigationView={() => <MenuDrawer drawerRef={drawerRef} />}
            >
              <AppContainer />
            </DrawerLayoutAndroid>
          </BackButton>
        </NativeRouter>
      </PaperProvider>
    </StoreProvider>
  )
}

export default App;