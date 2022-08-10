import React from 'react';
import './App.css';
import Category from 'pages/category';
import store from 'state';
import { Provider as ReduxProvider } from 'react-redux';
import ApplicationUpdater from 'state/application/updater';
import MulticallUpdater from 'state/multicall/updater';
import TransactionUpdater from 'state/transactions/updater';
import UserUpdater from 'state/user/updater';

import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { NetworkContextName } from './constants/misc';
import Web3ReactManager from './components/Web3ReactManager';
import { getLibrary } from 'utils/library';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
      <TransactionUpdater />
      <UserUpdater />
    </>
  );
}

function App() {
  return (
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Web3ReactManager>
            <ReduxProvider store={store}>
              <Updaters />
              <Category />
            </ReduxProvider>
          </Web3ReactManager>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </React.StrictMode>
  );
}

export default App;
