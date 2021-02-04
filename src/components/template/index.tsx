import './index.css';

import React from 'react';

import Footer from './footer';
import Header from './header';
import SideBar from './side-bar';

interface IProps {
  children: React.ReactNode;
}

const Template: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return (
    <div className="inset-0 h-screen">
      <Header />
      <SideBar />
      <div className="h-full relative">
        <main className="main bg-brand-bg-color">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Template;
