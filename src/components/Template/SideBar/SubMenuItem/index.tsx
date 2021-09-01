import React from 'react';
import { NavLink } from 'react-router-dom';

import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  navId: string;
  toggle: string;
  active: string;
  icon: IconName;
  label: string;
  subItems: ISubItem[];
  onActiveHandle: (id: string, isSubMenuItem: boolean) => void;
  onToggleHandle: (id: string) => void;
}

const SubMenuItem: React.FC<IProps> = (props: IProps) => {
  const { navId, toggle, active, icon, label, subItems, onToggleHandle, onActiveHandle } = props;
  return (
    <>
      <a
        id={navId}
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
          event.preventDefault();
          onToggleHandle(navId);
        }}
        href="/#"
        className={`${
          active === navId ? 'font-primaryFont font-bold border-r-2 border-primaryBlue mr-2px' : 'font-primaryFont'
        } no-underline text-gray-900 relative flex flex-row pb-3`}
      >
        <div className="w-12 flex justify-center ml-4">
          <FontAwesomeIcon
            icon={[active === navId ? 'fas' : 'far', icon]}
            size="sm"
            key={icon}
            className={`text-xl h-10 flex pt-3 ${active === navId ? 'text-primaryBlue' : 'text-greyDarkest'}`}
          />
        </div>
        <span className=" mt-4 ml-4">{` ${label}`}</span>
      </a>
      <div>
        <ul
          className={`p-0 list-none text-xs relative bg-gray-200 mb-5 ${
            toggle === navId ? 'hidden hover:h-auto group-hover:block' : 'h-0 hidden'
          }`}
        >
          {subItems.map(({ subId, subLabel, subPath }: ISubItem, index) => (
            <li
              key={subId}
              className={`list-none leading-10 submenu border-r border-gray-900 ${
                subItems.length === index + 1 ? 'bgsingle mb-14px' : 'bgdouble'
              } `}
            >
              <NavLink
                id={subId}
                strict
                to={subPath}
                onClick={() => {
                  onActiveHandle(navId, true);
                }}
                className="font-primaryFont no-underline text-gray-900 flex flex-row ml-12"
              >
                <span className="mt-4 ml-8 label font-primaryFont font-bold">{` ${subLabel}`}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SubMenuItem;
