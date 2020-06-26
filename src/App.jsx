import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { onError } from 'apollo-link-error';

import UsersContainer from './components/Users/UsersContainer';
import UserPageContainer from './components/UserPage/UserPageContainer';
import AddPageContainer from './components/AddPage/AddPageContainer';

//Icons
import CameraIcon from '@material-ui/icons/Camera';

import './App.css';
import 'materialize-css'; // For addaptive modals

const httpLink = new HttpLink({
  uri: 'http://localhost:3366/graphql'
});
const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )

      response.data = {
        message
      }
      response.errors = null;

      window.M.toast({ html: message, classes: 'modal-error' });
    })
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header>
          <NavLink className='logo' to={'/'}>
            <CameraIcon style={{marginRight: '10px'}} />

            iManager
          </NavLink>
        </header>

        <Switch>
          <Route path={'/'} exact component={UsersContainer} />
          <Route path={'/user/:id?'} component={UserPageContainer} />
          <Route path={'/add'} component={AddPageContainer} />

          <Redirect to={'/'} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
