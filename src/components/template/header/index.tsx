import DropDown from 'Components/drop-down';
import HamburgerMenu from 'Components/hamburger-menu';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStore } from 'Redux/Store';
import { logo } from 'Utils/AssetUtil';

const Header = (): JSX.Element => {
  const authStore = useSelector((state: RootStore) => state.auth);
  const [open, setOpen] = React.useState(true);

  const onClickHandle = (): void => {
    setOpen(!open);
  };

  return (
    <header className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <Link to="/">
            <img className="h-8" src={logo} alt="" />
          </Link>
        </div>
        <div className="sm:hidden">
          <HamburgerMenu onToggle={onClickHandle} open={open} />
        </div>
      </div>
      <nav className={`${open ? 'block' : 'hidden'} sm:block`}>
        <div className="px-2 pt-2 pb-4 sm:flex sm:p-0">
          <Link to="/#" className="block px-2 py-1 text-white font-semibold rounded no-underline hover:bg-gray-800">
            Register
          </Link>
          <Link
            to="/#"
            className="mt-1 block px-2 py-1 text-white font-semibold rounded no-underline hover:bg-gray-800 sm:mt-0 sm:ml-2"
          >
            Sign In
          </Link>
          <Link
            to="/#"
            className="mt-1 block px-2 py-1 text-white font-semibold rounded no-underline hover:bg-gray-800 sm:mt-0 sm:ml-2"
          >
            About
          </Link>
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
