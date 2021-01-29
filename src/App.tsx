import ErrorBoundary from 'Components/error-boundary';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Store from './redux/Store';

interface IProps {
  children: React.ReactNode;
}

const App: React.FC<IProps> = (props: IProps) => {
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
