import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import actionCable from 'actioncable';
import { GoogleOAuthProvider } from '@react-oauth/google';
const { REACT_APP_SERVER_URL, REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const CableApp = {};

const actionCableEndpoint = 'ws://' + REACT_APP_SERVER_URL.slice(7) + '/cable';
CableApp.cable = actionCable.createConsumer(actionCableEndpoint);

let persistor = persistStore(store);

const link = createUploadLink({
  uri: REACT_APP_SERVER_URL + '/graphql',
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
          <PersistGate loading={null} persistor={persistor}>
            <App cable={CableApp.cable} />
          </PersistGate>
        </GoogleOAuthProvider>
      </Provider>
    </ApolloProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
