import './index.css';

import NavList from 'Data/nav-list.json';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import NavItem from './NavItem';
import SubMenuItem from './SubMenuItem';

const SideBar: React.FC = () => {
  const history = useHistory();
  const [active, setActive] = React.useState(history.location.pathname.split('/')[1]);
  const [toggle, setToggle] = React.useState(history.location.pathname.split('/')[1]);

  const onActiveHandle = (id: string, isSubMenuItem: boolean): void => {
    if (id !== active || isSubMenuItem) {
      setActive(id);
    }
  };

  const onToggleHandle = (id: string): void => {
    if (id !== toggle) {
      setToggle(id);
    } else {
      setToggle('');
    }
  };

  const renderItemList = (): React.ReactNode => {
    const list = NavList.map(({ navId, label, icon, path, subItems }: INavItem) => (
      <li key={navId} className="leading-10 mb-4 w-full relative">
        {isEmpty(subItems) ? (
          <NavItem
            navId={navId}
            path={path}
            active={active}
            icon={icon}
            label={label}
            onToggleHandle={onToggleHandle}
            onActiveHandle={onActiveHandle}
          />
        ) : (
          <SubMenuItem
            navId={navId}
            toggle={toggle}
            active={active}
            icon={icon}
            label={label}
            subItems={subItems}
            onToggleHandle={onToggleHandle}
            onActiveHandle={onActiveHandle}
          />
        )}
      </li>
    ));

    return list;
  };

  React.useEffect(() => {
    renderItemList();
  }, [active]);

  React.useEffect(() => {
    if (history.location.pathname.split('/')[1] !== active) {
      setActive(history.location.pathname.split('/')[1]);
    }
  });

  return (
    <div className="sm:block hidden">
      <aside className="group side-bar bg-white fixed inset-y-0 left-0 h-full w-20 hover:w-220px overflow-y-auto overflow-x-hidden duration-200 opacity-100 z-20 block cursor-pointer">
        <div className="flex flex-col h-full z-30 w-full bg-white border-r border-gray-900">
          <nav>
            <div className="bg-gray-900 py-3 border-b-2 border-gray-900">
              <Link to="/#">
                <div className="bg-logo-sign group-hover:bg-logo-hor w-10 group-hover:w-full h-8 mx-5 bg-no-repeat" />
              </Link>
            </div>

            <div>
              <ul className="list-none flex-auto w-220px absolute pt-4">{renderItemList()}</ul>
            </div>
          </nav>
        </div>
      </aside>
      <div className="overlay fixed inset-0 z-10 bg-black opacity-40 w-full" />
    </div>
  );
};

export default SideBar;
