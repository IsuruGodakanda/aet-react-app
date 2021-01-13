import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from 'Components/error-boundary';
import Store from './redux/Store';

interface PropsForm {
  children: React.ReactNode;
}

const App = (props: PropsForm): JSX.Element => {
  const { children } = props;

  return (
    <div className="flex flex-col h-screen justify-between">
      <Provider store={Store}>
        <Router>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
