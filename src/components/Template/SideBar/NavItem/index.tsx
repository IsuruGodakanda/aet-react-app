import React from 'react';
import { NavLink } from 'react-router-dom';

import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  navId: string;
  path: string;
  active: string;
  icon: IconName;
  label: string;
  onActiveHandle: (id: string, isSubMenuItem: boolean) => void;
  onToggleHandle: (id: string) => void;
}

const NavItem: React.FC<IProps> = (props: IProps) => {
  const { navId, path, active, icon, label, onActiveHandle, onToggleHandle } = props;

  return (
    <NavLink
      id={navId}
      strict
      to={path}
      onClick={() => {
        onActiveHandle(navId, false);
        onToggleHandle('');
      }}
      className="no-underline relative flex flex-row font-primaryFont pb-3"
      activeClassName="font-primaryFont font-bold border-r-2 border-primaryBlue mr-2px"
    >
      <div className="w-12 flex justify-center ml-4">
        <FontAwesomeIcon
          icon={[active === navId ? 'fas' : 'far', icon]}
          size="sm"
          key={icon}
          className={`text-xl h-10 flex pt-3 ${active === navId ? 'text-primaryBlue' : 'text-gray-200'}`}
        />
      </div>
      <span className="mt-4 ml-4">{` ${label}`}</span>
    </NavLink>
  );
};

export default NavItem;
