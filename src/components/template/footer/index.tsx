import React from 'react';
import { Link } from 'react-router-dom';
import { fb, logoWhite, twitter } from 'Utils/AssetUtil';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-10 sm:py-10 sm:ml-20">
      <div className="text-center sm:text-left sm:flex-col px-4 py-3">
        <Link to="/">
          <img className="inline" src={logoWhite} alt="" />
        </Link>
        <p className="mt-2 cursor-default text-copyrightGray">Copyright © 2021 Aeturnum, Inc.</p>
      </div>

      <div className="sm:flex sm:flex-row sm:mt-0 px-4 py-3 mx-auto text-xs tracking-wide leading-loose border-t border-gray-800 sm:border-none text-white">
        <div className="flex flex-col sm:mr-4">
          <ul className="list-reset text-center sm:text-left cursor-pointer">
            <li className="hover:underline hover:font-bold">Privacy Policy</li>
            <li className="hover:underline hover:font-bold">Terms of Service</li>
            <li className="hover:underline hover:font-bold">Licences</li>
          </ul>
        </div>
        <div className="flex flex-col sm:ml-4 text-xs tracking-si-body3 leading-si-leading1">
          <ul className="list-reset text-center sm:text-left cursor-pointer">
            <li className="hover:underline hover:font-bold">Help Center</li>
            <li className="hover:underline hover:font-bold">Report a Claim</li>
            <li className="hover:underline hover:font-bold">Contact Us</li>
          </ul>
        </div>
      </div>

      <div className="text-center flex-col px-4 py-3 sm:mt-0 border-t border-gray-800 sm:border-none">
        <Link to="/#">
          <img src={fb} alt="Surround Insurance on Facebook" className="inline rounded w-6 mr-1 hover:bg-fbBlue" />
        </Link>
        <Link to="/#">
          <img
            src={twitter}
            alt="Surround Insurance on Twitter"
            className="inline rounded w-6 ml-1 hover:bg-twitterBlue"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
