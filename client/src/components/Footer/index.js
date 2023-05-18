import React from 'react';

import './footer.css';
import { SocialIcon } from 'react-social-icons';
function DisplayFooter() {
  return (
    <footer
      id="footer"
      className="bg-dark text-center d-flex footer justify-content-center"
    >
      <div className="m-2">
        <SocialIcon url="mailto:fchoi@outlook.com" />
      </div>
      <div className="m-2">
        <SocialIcon url="https://fabio-portfolio.herokuapp.com/" />
      </div>
      <div className="m-2">
        <SocialIcon url="https://www.linkedin.com/in/fabio-choi-6a325676/" />
      </div>
      <div className="m-2">
        <SocialIcon url="https://github.com/fchoi1/Jibber-Jabber" />
      </div>
    </footer>
  );
}

export default DisplayFooter;
