import Loader from 'Components/loader';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from 'Redux/Store';

const LoaderHistoryService = <P extends Record<string, unknown>>(
  ComposedComponent: React.ComponentType<P>
): React.FC<P> => {
  const LoaderHistoryComponent = ({ ...props }) => {
    const globalStore = useSelector((state: RootStore) => state.global);

    return (
      <>
        {globalStore.loading && <Loader />}
        <ComposedComponent {...((props as unknown) as P)} />
      </>
    );
  };

  return LoaderHistoryComponent;
};

export default LoaderHistoryService;
