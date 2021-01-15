import React from 'react';
import { decodeJWT } from 'Utils/commonUtil';
import { getSession, SessionKey } from 'Services/securityService';

// Set user roles
export enum UserRole {
  MANAGER = 'manager',
  WORKER = 'worker',
}

// Validate user route
export const validateUserRole = (path: string | string[] | undefined): boolean => {
  const token = getSession(SessionKey.AUTH_TOKEN);

  if (decodeJWT(token).role === UserRole.WORKER) {
    return path !== '/manager';
  }
  return true;
};

// Show hide component according to permission
const permission = (ComposedComponent) => {
  const ShowHideComponent = (props: { roles: string[]; children: React.ReactNode }) => {
    const { roles } = props;
    const token = getSession(SessionKey.AUTH_TOKEN);
    const [hideable, setHideable] = React.useState(false);

    React.useEffect(() => {
      if (roles.includes(decodeJWT(token).role)) {
        setHideable(false);
      } else {
        setHideable(true);
      }
    }, []);

    return <>{hideable ? null : <ComposedComponent {...props} />}</>;
  };

  return ShowHideComponent;
};

export const PermissionHOC = permission('div');
