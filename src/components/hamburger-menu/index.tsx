import React from 'react';

interface IProps {
  onToggle: () => void;
  open: boolean;
}

const HamburgerMenu: React.FC<IProps> = (props: IProps) => {
  const { onToggle, open } = props;

  return (
    <button
      type="button"
      className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
      onClick={onToggle}
    >
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        {open ? (
          <path
            fillRule="evenodd"
            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          />
        )}
      </svg>
    </button>
  );
};

export default HamburgerMenu;
