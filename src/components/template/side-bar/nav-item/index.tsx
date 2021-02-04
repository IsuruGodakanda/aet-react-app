import React from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  navId: string;
  path: string;
  active: string;
  icon: string;
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
      className="no-underline relative text-brand-nav-font-size flex flex-row"
      activeClassName="font-PoppinsBold border-r-2 border-brand-primary-color mr-2px"
    >
      <div className="w-12 flex justify-center ml-4">
        <i
          className={`text-xl h-10 flex pt-3 ${
            active === navId ? 'text-brand-primary-color fas' : 'text-brand-icon-color fal'
          } ${icon}`}
        />
      </div>
      <span className="mt-0 ml-4">{` ${label}`}</span>
    </NavLink>
  );
};

export default NavItem;
