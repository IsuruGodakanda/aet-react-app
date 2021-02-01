import './index.css';

import React from 'react';

interface IProps {
  id: string;
  name: string;
  label?: string;
  falseLabel: string;
  trueLabel: string;
  defaultValue?: boolean;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch: React.FC<IProps> = (props: IProps) => {
  const { id, name, label, falseLabel, trueLabel, defaultValue, onToggle } = props;

  const [checked, setChecked] = React.useState(defaultValue);

  return (
    <div className="">
      <div className="flex">
        {label && (
          <label htmlFor={id} className="w-1/4 text-right pt-1 mr-10 text-brand-primary-font-color">
            {label}
          </label>
        )}
        <div className="flex-grow w-3/4 pt-1">
          <label htmlFor={id} className="flex items-center cursor-pointer">
            {falseLabel && (
              <div className={`mr-2 font-medium ${!checked ? 'text-primaryBlue font-extrabold' : 'text-white'}`}>
                {falseLabel}
              </div>
            )}
            <div className="relative">
              <input
                id={id}
                name={name}
                onChange={(event) => {
                  onToggle(event);
                  setChecked(!checked);
                }}
                type="checkbox"
                checked={checked}
                className="hidden"
              />
              <div className="toggle__line w-30px h-5 border-gray-400 bg-gray-500 rounded-full shadow-inner box-content">
                <div className="toggle__dot absolute w-4 h-4  bg-white rounded-full shadow" />
              </div>
            </div>
            {trueLabel && (
              <div className={`ml-2 font-medium ${checked ? 'text-primaryBlue font-extrabold' : 'text-white'}`}>
                {trueLabel}
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

Switch.defaultProps = {
  label: '',
  defaultValue: false,
};

export default Switch;
