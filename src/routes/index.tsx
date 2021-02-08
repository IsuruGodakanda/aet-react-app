import Loader from 'Components/Loader';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import RouteHandleHOC from './routeHandleHOC';

const Login = lazy(() => import('Pages/Auth/Login'));
const Dashboard = lazy(() => import('Pages/Dashboard'));
const Employee = lazy(() => import('Pages/Employee'));
const Profile = lazy(() => import('Pages/Employee/Profile'));
const NotFound = lazy(() => import('Pages/NotFound'));

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
