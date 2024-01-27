import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import i18next from './services/i18next';

import store from './src/Redux/Store';
import NavigationApp from './src/UI/Navigation/NavigationApp';
import OverlayComponent from './src/Components/OverlayComponent';
import ToastComponent from './src/Components/ToastComponent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import QRCameraComponent from './src/Components/QRCameraComponent';
import ModalWarningComponent from './src/Components/ModalWarningComponent';

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationApp />
            <OverlayComponent />
            <ToastComponent />
            <QRCameraComponent />
            <ModalWarningComponent />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
