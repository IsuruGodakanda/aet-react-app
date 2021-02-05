import Loader from 'Components/loader';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import RouteHandleHOC from './routeHandleHOC';

const Login = lazy(() => import('Pages/auth/login'));
const Dashboard = lazy(() => import('Pages/dashboard'));
const Employee = lazy(() => import('Pages/employee'));
const Profile = lazy(() => import('Pages/employee/profile'));
const NotFound = lazy(() => import('Pages/not-found'));

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <RouteHandleHOC exact path="/" routeType="public" component={Login} />
        <RouteHandleHOC exact path="/dashboard" routeType="protected" component={Dashboard} />
        <RouteHandleHOC exact path="/employee" routeType="protected" component={Employee} />
        <RouteHandleHOC exact path="/employee/profile" routeType="protected" component={Profile} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
