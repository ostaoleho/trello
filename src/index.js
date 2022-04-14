
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
//
import App from './App';
import { store } from './redux/store';
// ----------------------------------------------------------------------


ReactDOM.render(
  <HelmetProvider>
     <ReduxProvider store={store}>
      <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
  </HelmetProvider>,
  document.getElementById('root')
);
