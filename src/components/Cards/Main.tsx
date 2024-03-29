import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const Main: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <main className="container mx-auto p-6 sm:pt-0 sm:pb-6 lg:px-32">{children}</main>;
};

export default Main;
