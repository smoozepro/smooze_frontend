import React, { useContext, useState } from 'react';
import { TiSocialFacebook } from 'react-icons/ti';
import { FcGoogle } from 'react-icons/fc';
import signin from './login.module.css';
import { AllContext } from '../../useContext/interface';
import { DataContext } from '../../useContext';
import ButtonLoader from '../Loader/buttonLoader';
import config from '../../utils/config/config';

const Login = (props: { openModal: any; openForgotModal: any }) => {
  const initialData: any = {
    email: '',
    password: ''
  };

  const [userData, setData] = useState(initialData);
  const { loginSubmitHandler, hasRememberMe, modifyRemember, authLoading } =
    useContext(DataContext) as AllContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (authLoading) return;
    e.preventDefault();
    void loginSubmitHandler(userData);
    setData(initialData);
  };

  return (
    <>
      <div className={signin.form_container}>
        <span className={signin.headerText}>
          What will you listen to today?
        </span>
        <div className={signin.social2}>
          <span className={signin.socialbtn}>
            <a
              className={signin.facebook}
              href={`${config.VITE_SERVER_URL}/facebook`}
            >
              <span className={signin.icon}>
                <TiSocialFacebook />
              </span>{' '}
              <span className={signin.fbtext}>Facebook</span>
            </a>
          </span>

          <span className={signin.google}>
            <a href={`${config.VITE_SERVER_URL}/auth/google`}>
              <span className={signin.google_icon_text_container}>
                <span className={signin.google_icon}>
                  <FcGoogle />
                </span>{' '}
                <span className={signin.googleText}>Google</span>
              </span>
            </a>
          </span>
        </div>
      </div>
      <span className={signin.bottom_contatiner}>
        <div className={signin.custom_control_input}>
          <input
            className={signin.custom_control2_input}
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className={signin.custom_control_input}>
          <input
            type="password"
            id="password"
            className={signin.custom_control2_input}
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <span className={signin.login_remember_container}>
          <span className={signin.remember}>
            <input
              type="checkbox"
              defaultChecked={hasRememberMe}
              name="rememberMe"
              onChange={(e) => {
                modifyRemember(!hasRememberMe);
              }}
              className={signin.checkbox}
            />
            <span className={signin.text}>Remember me</span>
          </span>

          <span
            onClick={handleSubmit}
            className={[
              signin.onSubmitBtn,
              authLoading && signin.disabled
            ].join(' ')}
          >
            {authLoading && <ButtonLoader />}
            LOG IN
          </span>
        </span>

        <span
          className={signin.forgot_password}
          onClick={props.openForgotModal}
        >
          Forgot your password?
        </span>

        <p className={signin.accountText}>Don't have an account?</p>
        <div className={signin.sign}>
          <span onClick={props.openModal} className={signin.sigupBtn}>
            <span className={signin.btntext}>SIGN UP FOR SMOOZE</span>
          </span>
        </div>
      </span>
    </>
  );
};

export default Login;
