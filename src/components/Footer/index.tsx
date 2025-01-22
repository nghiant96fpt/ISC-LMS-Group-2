import React from 'react';
import './style.css';
import { FooterProps } from './type';

const Footer: React.FC<FooterProps> = ({ year = new Date().getFullYear(), company = 'ISC' }) => {
  return (
    <footer className="footer">
      <p>
        &copy; {year} {company}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
