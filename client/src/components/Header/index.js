import React from 'react';
import image from '../../assets/jj(header).png';

const Header = () => {
  return (
    <header className="header">
      <img src={image} alt='headerimage' className='header-img'></img>
    </header>
  );
};

export default Header;
