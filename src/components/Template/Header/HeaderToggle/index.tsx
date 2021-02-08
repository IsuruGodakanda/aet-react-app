import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStore } from 'Redux/Store';
import { removeSession, SessionKey } from 'Services/securityService';

const HeaderToggle: React.FC = () => {
  const authStore = useSelector((state: RootStore) => state.auth);

  const [open, setOpen] = React.useState(false);

  const onClickHandle = (): void => {
    setOpen(!open);
  };

  const escFunction = (event: KeyboardEvent): void => {
    if (event.keyCode === 27 || event.key === 'Esc' || event.key === 'Escape') {
      setOpen(false);
    }
  };

  const onLogout = (): void => {
    removeSession([SessionKey.AUTH_TOKEN]);
  };

  React.useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return (): void => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <div className="relative hidden sm:block sm:ml-6">
      <button
        type="button"
        className="relative z-20 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
        onClick={onClickHandle}
      >
        <img className="h-full w-full object-cover" src={authStore.authUser?.avatar} alt="Your avatar" />
      </button>
      <button
        type="button"
        aria-label="Click outside"
        tabIndex={-1}
        onClick={(): void => setOpen(false)}
        className={`${open ? 'block' : 'hidden'} fixed inset-0 h-full w-full bg-black opacity-50 cursor-default z-20`}
      />
      <div
        className={`${open ? 'block' : 'hidden'} absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20`}
      >
        <Link to="/#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 no-underline hover:text-white">
          Account settings
        </Link>
        <Link to="/#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 no-underline hover:text-white">
          Support
        </Link>
        <Link
          to="/#"
          onClick={onLogout}
          className="block px-4 py-2 text-gray-800 no-underline hover:bg-indigo-500 hover:text-white"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default HeaderToggle;
