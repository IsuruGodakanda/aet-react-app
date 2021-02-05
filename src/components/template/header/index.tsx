import DropDown from 'Components/drop-down';
import HamburgerMenu from 'Components/hamburger-menu';
import Switch from 'Components/input-fields/switch';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RootStore } from 'Redux/Store';
import { setLanguage } from 'Actions/GlobalActions';
import { PermissionHOC, UserRole } from 'Services/userRoleService';

const Header: React.FC = () => {
  const authStore = useSelector((state: RootStore) => state.auth);
  const globalStore = useSelector((state: RootStore) => state.global);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const onClickHandle = (): void => {
    setOpen(!open);
  };

  const onToggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      dispatch(setLanguage('fr'));
    } else {
      dispatch(setLanguage('en'));
    }
  };

  return (
    <header className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 fixed w-full z-10">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div className="sm:hidden">
          <HamburgerMenu onToggle={onClickHandle} open={open} />
        </div>
      </div>
      <nav className={`${open ? 'block' : 'hidden'} sm:block`}>
        <div className="px-2 pt-2 pb-4 sm:flex sm:p-0">
          <div className="mr-10">
            <Switch
              id="change-lang"
              name="change-lang"
              trueLabel="FR"
              falseLabel="EN"
              onToggle={onToggle}
              defaultValue={globalStore.lang === 'fr'}
            />
          </div>
          <NavLink
            strict
            to="/dashboard"
            className="mt-1 block px-2 py-1 text-white font-semibold rounded no-underline hover:bg-gray-800 sm:mt-0 sm:ml-2 font-primaryFont"
            activeClassName="border-b-2 font-primaryFont"
          >
            Dashboard
          </NavLink>
          <PermissionHOC roles={[UserRole.MANAGER]}>
            <NavLink
              strict
              to="/employee"
              className="mt-1 block px-2 py-1 text-white font-semibold rounded no-underline hover:bg-gray-800 sm:mt-0 sm:ml-2 font-primaryFont"
              activeClassName="border-b-2 font-primaryFont"
            >
              Employees
            </NavLink>
          </PermissionHOC>
          <DropDown />
        </div>
        <div className="px-4 py-5 border-t border-gray-800 sm:hidden">
          <div className="flex items-center">
            <img
              className="h-8 w-8 border-2 border-gray-600 rounded-full object-cover"
              src={authStore.authUser?.avatar}
              alt="Your avatar"
            />
            <span className="ml-3 font-semibold text-white">John Dave</span>
          </div>
          <div className="mt-4">
            <Link to="/#" className="block text-gray-400 hover:text-white">
              Account settings
            </Link>
            <Link to="/#" className="mt-2 block text-gray-400 hover:text-white">
              Support
            </Link>
            <Link to="/#" className="mt-2 block text-gray-400 hover:text-white">
              Sign out
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
