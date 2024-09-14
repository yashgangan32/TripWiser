import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  const creatPage = location.pathname === '/create-trip';

  return (
    <div >
      {(isLoginPage || creatPage) && (<div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <img src='/trpwise.png' alt='logo' className="w-20" />
        {
          isLoginPage && (
          <Link to="/login">
            <button
              type="button"
              className="text-white focus:outline-none focus:ring-4 bg-[#f56551] focus:ring-[#b83827] hover:bg-[#b83827] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign In
            </button>
          </Link>
        )}
      </div>)}

    </div>

  );
}

export default Header;
