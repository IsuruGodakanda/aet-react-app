import React from 'react';

import Footer from './footer';
import Header from './header';

interface IProps {
  children: React.ReactNode;
}

const Template = (props: IProps): JSX.Element => {
  const { children } = props;

  return (
    <div className="absolute inset-0 min-w-full">
      <Header />
      <div className="h-full relative">
        <main className="main bg-brand-bg-color">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Template;
