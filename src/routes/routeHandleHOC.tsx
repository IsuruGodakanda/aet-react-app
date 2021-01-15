import { validateJWT } from 'Actions/AuthActions';
import Template from 'Components/template';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { decodeJWT } from 'Utils/commonUtil';
import { getSession, SessionKey } from 'Services/securityService';

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

const validateUserRole = (path: string | string[] | undefined): boolean => {
  const token = getSession(SessionKey.AUTH_TOKEN);

  if (decodeJWT(token).role === 'worker') {
    return path !== '/manager';
  }
  return true;
};

const RouteHandleHOC = (props: PrivateRouteProps): JSX.Element => {
  const { component: Component, routeType, ...rest } = props;
  const dispatch = useDispatch();

  return routeType === 'protected' ? (
    <Route
      {...rest}
      render={(routeProps) =>
        dispatch(validateJWT()) ? (
          validateUserRole(rest.path) ? (
            <SetLayout component={Component} />
          ) : (
            <Redirect to={{ pathname: '/dashboard' }} />
          )
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
