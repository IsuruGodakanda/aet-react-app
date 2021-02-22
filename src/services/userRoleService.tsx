import React from 'react';
import { getSession, SessionKey } from 'Services/securityService';
import { decodeJWT } from 'Utils/commonUtil';

// Set user roles
export enum UserRole {
  MANAGER = 'MANAGER',
  WORKER = 'WORKER',
}

// Validate user route
export const validateUserRole = (path: string | string[] | undefined): boolean => {
  const token = getSession(SessionKey.AUTH_TOKEN);

  if (decodeJWT(token).role === UserRole.WORKER) {
    return path !== '/employee';
  }
  return true;
};

// Show hide component according to permission
const permission = (ComposedComponent) => {
  const ShowHideComponent = (props: { id: string; roles: string[]; children: React.ReactNode }) => {
    const { id, roles } = props;
    const token = getSession(SessionKey.AUTH_TOKEN);
    const [hideable, setHideable] = React.useState(false);

    React.useEffect(() => {
      if (roles.includes(decodeJWT(token).role)) {
        setHideable(false);
      } else {
        setHideable(true);
      }
    }, []);

    return hideable ? null : <ComposedComponent {...props} />;
  };

  return ShowHideComponent;
};

export const PermissionHOC = permission(React.Profiler);
