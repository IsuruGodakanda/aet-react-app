import React from 'react';
import { NavLink } from 'react-router-dom';

interface ISubItems {
  subId: string;
  subLabel: string;
  subPath: string;
}

interface IProps {
  navId: string;
  toggle: string;
  active: string;
  icon: string;
  label: string;
  subItems: ISubItems[];
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
          active === navId ? 'font-PoppinsBold border-r-2 border-brand-primary-color mr-2px' : 'font-PoppinsRegular'
        } no-underline text-brand-primary-font-color relative text-brand-nav-font-size flex flex-row`}
      >
        <div className="w-12 flex justify-center ml-4">
          <i
            className={`text-xl h-10 flex pt-3 ${
              active === navId ? 'text-brand-primary-color fas' : '`text-brand-icon-color fal'
            } ${icon}`}
          />
        </div>
        <span className=" mt-0 ml-4">{` ${label}`}</span>
      </a>
      <div>
        <ul
          className={`p-0 list-none text-xs relative bg-brand-sub-menu-color shadow-brand-side-bar-shadow mt-5 -mb-5 ${
            toggle === navId ? 'hidden hover:h-auto group-hover:block' : 'h-0 hidden'
          }`}
        >
          {subItems.map(({ subId, subLabel, subPath }, index) => (
            <li
              key={subId}
              className={`list-none leading-10 bg-brand-sub-menu-color submenu ${
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
                className="font-PoppinsRegular no-underline text-brand-primary-font-color text-brand-nav-font-size flex flex-row ml-12"
              >
                <span className="mt-2 ml-8 label">{` ${subLabel}`}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SubMenuItem;
