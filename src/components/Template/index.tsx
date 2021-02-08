import './index.css';

import React from 'react';

import Footer from './Footer';
import Header from './Header';
import SideBar from './SideBar';

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
        <main className="main">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Template;
