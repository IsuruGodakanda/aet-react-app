import { validateJWT } from 'Actions/AuthActions';
import Template from 'Components/template';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

// import { useSelector } from 'react-redux';

// import { RootStore } from 'Redux/Store';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  routeType: 'public' | 'protected';
}

const SetLayout = (props: any) => {
  const { component: Component } = props;
  return (
    <Route
      render={(childProps) => (
        <div>
          <Template {...childProps}>
            <Component />
          </Template>
        </div>
      )}
    />
  );
};

const RouteHandleHOC = (props: PrivateRouteProps): JSX.Element => {
  const { component: Component, routeType, ...rest } = props;
  const dispatch = useDispatch();
  // const authStore = useSelector((state: RootStore) => state.auth);

  return routeType === 'protected' ? (
    <Route
      {...rest}
      render={(routeProps) =>
        dispatch(validateJWT()) ? (
          <SetLayout component={Component} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  ) : (
    <Route
      {...rest}
      render={(routeProps) =>
        dispatch(validateJWT()) ? (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: routeProps.location },
            }}
          />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

export default RouteHandleHOC;
