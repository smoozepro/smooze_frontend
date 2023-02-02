import { TiSocialFacebook } from 'react-icons/ti';
import { FcGoogle } from 'react-icons/fc';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import signupcss from './signup.module.css';
import { TfiAngleDown } from 'react-icons/tfi';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DataContext } from '../../useContext';
import { AllContext } from '../../useContext/interface';
import config from '../../utils/config/config';

const Signup = (props: { onChange: any; openLoginModal: any }) => {
  const initialData: any = {
    email: '',
    password: '',
    userName: '',
    date_birth: ''
  };
  const [userData, setData] = useState(initialData);
  const [ReCAPTCHAValue, setReCAPTCHA] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...userData, [name]: value });
  };
  const { registerSubmitHandler } = useContext(DataContext) as AllContext;
  // make register request
  const handleRegisterSubmit = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (ReCAPTCHAValue.length === 0)
      return toast.warning('Please verify that you are not a robot');

    void registerSubmitHandler(userData, props.openLoginModal());
    setData(initialData);
    setReCAPTCHA('');
  };

  useEffect(() => {}, [ReCAPTCHAValue]);
  return (
    <>
      <span className={signupcss.container_modal}>
        <div className={signupcss.form_container}>
          <span className={signupcss.headerText}>Ready to sign up? </span>
          <div className={signupcss.social2}>
            <span className={signupcss.socialbtn}>
              <a
                className={signupcss.facebook}
                href={`${config.VITE_SERVER_URL}/facebook}`}
              >
                <span className={signupcss.icon}>
                  <TiSocialFacebook />
                </span>{' '}
                <span className={signupcss.fbtext}>Facebook</span>
              </a>
            </span>

            <span className={signupcss.google}>
              <a href={`${config.VITE_SERVER_URL}/auth/google`}>
                <span className={signupcss.google_icon_text_container}>
                  <span className={signupcss.google_icon}>
                    <FcGoogle />
                  </span>{' '}
                  <span className={signupcss.googleText}>Google</span>
                </span>
              </a>
            </span>
          </div>
        </div>
        <span className={signupcss.bottom_contatiner}>
          <div className={signupcss.custom_input}>
            <input
              className={signupcss.custom2_input}
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Example@gmail.com"
            />
          </div>
          <div className={signupcss.custom_input}>
            <input
              type="password"
              id="password"
              className={signupcss.custom2_input}
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className={signupcss.custom_input}>
            <input
              className={signupcss.custom2_input}
              type="name"
              placeholder="Username"
              onChange={handleChange}
              name="userName"
            />
          </div>
        </span>
        <span className={signupcss.dob_gender_conainer}>
          <input
            className={signupcss.dob}
            type="Date"
            onChange={handleChange}
            name="date_birth"
          />
          <div className={signupcss.selectdiv}>
            <label>
              <TfiAngleDown
                style={{
                  color: '#161a1a',
                  position: 'absolute',
                  top: '30%',
                  left: '80%',
                  zIndex: 0
                }}
              />
              <select name="gender" onChange={handleChange}>
                <option value="Gender">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female </option>
              </select>
            </label>
          </div>
        </span>

        <span className={signupcss.humanCheck}>
          <ReCAPTCHA
            sitekey={config.VITE_CAPTCHA_KEY}
            onChange={(re: string | null) => setReCAPTCHA(re as any)}
          />
        </span>

        <div className={signupcss.term_conainer}>
          <span className={signupcss.terms}>
            By clicking on "Sign up", you accept the
          </span>
          <span>
            <span className={signupcss.condition}>
              Terms and Conditions of Use.
            </span>
          </span>
        </div>
        <span onClick={handleRegisterSubmit} className={signupcss.onSubmitBtn}>
          SIGN UP
        </span>
        <span className={signupcss.accountText} onClick={props.openLoginModal}>
          Already have an account?{' '}
          <span
            style={{
              textAlign: 'right',
              font: 'normal normal bold 12px/15px Lato',
              letterSpacing: '0.07px',
              color: '#2D9BEF'
            }}
          >
            Login
          </span>
        </span>
      </span>
    </>
  );
};

export default Signup;
