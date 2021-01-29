import MainCard from 'Components/cards/main';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <MainCard>
      <div className="container mx-auto p-6 sm:pt-0 sm:pb-6 lg:px-32">
        <div className="sm:pt-12">
          <div className="md:w-3/5">
            <h2 className="text-mb-title sm:text-title">404 Page Not Found</h2>
            <h4 className="mt-6 sm:mt-4 text-2xl sm:text-subtitle">Sorry, this page does not exist</h4>
          </div>
        </div>
      </div>
    </MainCard>
  );
};

export default NotFound;
