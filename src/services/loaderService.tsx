import React from 'react';
import Loader from 'Components/loader';
import { useSelector } from 'react-redux';
import { RootStore } from 'Redux/Store';

const LoaderHOC = <P extends Record<string, unknown>>(ComposedComponent: React.ComponentType<P>): React.FC<P> => {
  const LoaderComponent = ({ ...props }) => {
    const globalStore = useSelector((state: RootStore) => state.global);

    return (
      <>
        {globalStore.loading && <Loader />}
        <ComposedComponent {...((props as unknown) as P)} />
      </>
    );
  };

  return LoaderComponent;
};

export default LoaderHOC;
