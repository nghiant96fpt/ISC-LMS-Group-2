import React from 'react';
import './style.css';
import { FooterProps } from './type';

const Footer: React.FC<FooterProps> = ({ year = new Date().getFullYear(), company = 'ISC' }) => {
  return (
    <footer className="footer">
      <p className='pb-0'>&copy;{year} Copyright by {company} Company</p>
    </footer>
  );
};

export default Footer;
