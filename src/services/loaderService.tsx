import React from 'react';
import { setLoaderStatus } from 'Actions/GlobalActions';
import Loader from 'Components/loader';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from 'Redux/Store';

interface WithLoadingProps {
  loading: boolean;
}

const LoaderHOC = <P extends Record<string, unknown>>(
  ComposedComponent: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => {
  const LoaderComponent = ({ ...props }: WithLoadingProps) => {
    const globalStore = useSelector((state: RootStore) => state.global);
    const dispatch = useDispatch();

    const setLoader = (status: boolean): void => {
      dispatch(setLoaderStatus(status));
    };

    return (
      <>
        {globalStore.loading && <Loader />}
        <ComposedComponent {...((props as unknown) as P)} setLoader={setLoader} />
      </>
    );
  };

  return LoaderComponent;
};

export default LoaderHOC;
