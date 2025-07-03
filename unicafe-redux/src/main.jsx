import ReactDOM from 'react-dom/client';

import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App store={store} />);
};

renderApp();
store.subscribe(renderApp);
