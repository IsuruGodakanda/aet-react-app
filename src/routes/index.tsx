import Loader from 'Components/loader';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import RouteHandleHOC from './routeHandleHOC';

const Login = lazy(() => import('Pages/auth/login'));
const Dashboard = lazy(() => import('Pages/dashboard'));
const Employee = lazy(() => import('Pages/employee'));
const NotFound = lazy(() => import('Pages/not-found'));

const Routes = (): JSX.Element => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <RouteHandleHOC exact path="/" routeType="public" component={Login} />
        <RouteHandleHOC exact path="/dashboard" routeType="protected" component={Dashboard} />
        <RouteHandleHOC exact path="/employee" routeType="protected" component={Employee} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
