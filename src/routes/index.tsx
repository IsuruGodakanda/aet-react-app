import Loader from 'Components/loader';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import RouteHandleHOC from './routeHandleHOC';

const Login = lazy(() => import('Pages/auth/login'));
const Dashboard = lazy(() => import('Pages/dashboard'));
const ManagerDashboard = lazy(() => import('Pages/manager-dashboard'));
const NotFound = lazy(() => import('Pages/NotFound'));

const Routes = (): JSX.Element => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <RouteHandleHOC exact path="/" routeType="public" component={Login} />
        <RouteHandleHOC exact path="/dashboard" routeType="protected" component={Dashboard} />
        <RouteHandleHOC exact path="/manager" routeType="protected" component={ManagerDashboard} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
