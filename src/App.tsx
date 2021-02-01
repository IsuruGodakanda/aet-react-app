import ErrorBoundary from 'Components/error-boundary';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from 'Redux/Store';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import { SessionKey, setSession } from 'Services/securityService';

import formattedMessages from 'Data/FormattedMessage.json';

interface IProps {
  children: React.ReactNode;
}

const App: React.FC<IProps> = (props: IProps) => {
  const { children } = props;
  const globalStore = useSelector((state: RootStore) => state.global);

  React.useEffect(() => {
    setSession({ [SessionKey.LANG]: globalStore.lang });
  }, [globalStore.lang]);

  return (
    <IntlProvider messages={formattedMessages[globalStore.lang]} locale={globalStore.lang} defaultLocale="en">
      <div className="flex flex-col h-screen justify-between">
        <Router>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Router>
      </div>
    </IntlProvider>
  );
};

export default App;
