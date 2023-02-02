import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { TiSocialFacebook } from 'react-icons/ti';
import { FcGoogle } from 'react-icons/fc';
import social from './social.module.css';
import { useNavigate } from 'react-router-dom';
import config from '../../utils/config/config';
function SocilalBtn() {
  const navigate = useNavigate();

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    localStorage.setItem('token', response.accessToken);
    navigate('/user-dashboard');
    console.log(response);
  };
  return (
    <div className="social">
      <FacebookLogin
        appId="880499959662436"
        callback={responseFacebook}
        fields="name,email,picture"
        render={(renderProps) => (
          <button className={social.facebook} onClick={renderProps.onClick}>
            {' '}
            <TiSocialFacebook /> Facebook
          </button>
        )}
      />
      <a href={`${config.VITE_SERVER_URL}/auth/google`}>
        <span className={social.google}>
          <FcGoogle /> Google
        </span>
      </a>
    </div>
  );
}

export default SocilalBtn;
