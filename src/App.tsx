import ErrorBoundary from 'Components/ErrorBoundary';
import formattedMessages from 'Data/formatted-message.json';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootStore } from 'Redux/Store';
import LoaderHistoryHOC from 'Services/loaderHistoryService';
import { SessionKey, setSession } from 'Services/securityService';

import Routes from './routes';

const App: React.FC = () => {
  const globalStore = useSelector((state: RootStore) => state.global);

  React.useEffect(() => {
    setSession({ [SessionKey.LANG]: globalStore.lang });
  }, [globalStore.lang]);

  return (
    <IntlProvider messages={formattedMessages[globalStore.lang]} locale={globalStore.lang} defaultLocale="en">
      <div className="flex flex-col h-screen justify-between">
        <Router>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </Router>
      </div>
    </IntlProvider>
  );
};

export default LoaderHistoryHOC(App);
