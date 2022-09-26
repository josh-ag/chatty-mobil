import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './navigators/authStack';
import {AppStack} from './navigators/stack';
import {useSelector} from 'react-redux';

const Main = () => {
  const {login} = useSelector(state => state.globals);

  return login.isLoggedIn && login.user ? <AppStack /> : <AuthStack />;
};

const App = () => (
  <NavigationContainer>
    <Main />
  </NavigationContainer>
);

export default App;
