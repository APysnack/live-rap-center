import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { createHttpLink } from 'apollo-link-http';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import actionCable from 'actioncable';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CableApp = {};
const actionCableEndpoint = 'ws://localhost:3001/cable';
CableApp.cable = actionCable.createConsumer(actionCableEndpoint);

let persistor = persistStore(store);

const link = createUploadLink({
  uri: 'http://localhost:3001/graphql',
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
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
