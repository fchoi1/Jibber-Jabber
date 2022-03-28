import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocialIcon } from 'react-social-icons';
function DisplayFooter() {
  return (
    <footer
      id="footer"
      className="bg-dark text-center d-flex footer justify-content-center"
    >
      <div className="m-2">
        <SocialIcon url="https://twitter.com/karansodhi" />
      </div>
      <div className="m-2">
        <SocialIcon url="https://facebook.com/karan.sodhi" />
      </div>
      <div className="m-2">
        <SocialIcon url="https://google.com/karan.sodhi" />
      </div>
      <div className="m-2">
        <SocialIcon url="https://github.com/jaketrent" />
      </div>
    </footer>
  );
}

export default DisplayFooter;
