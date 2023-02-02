/*eslint-disable */
import React, { useState } from 'react';
import Modal from '../../Components/Modal/Modal';
import { toast } from 'react-toastify';
import './PasswordRecover.css';
import 'react-toastify/dist/ReactToastify.css';
import LogoutNavbar from '../../Components/Navbar/LogoutNavbar/LogoutNavbar';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import PasswordRecover from '../../Components/RecoveryPage/PasswordRecover';
import Login from '../../Components/Login/Login';
import ForgotPass from '../../Components/ForgotPass/ForgotPass';
import Signup from '../../Components/Signup/Signup';
import resetcss from './Rset.module.css';
import './PasswordRecover.css';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../utils/config/config';

const ResetPasswordComp = () => {
  const [openSignUpModal, setopenSignUpModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState<boolean>(false);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [frgtPwdMail, setFrgtPwdMail] = useState({});

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const searchParams = new URLSearchParams(document.location.search);
  const token = searchParams.get('token');

  if (token === undefined) return null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  };

  const openModal = () => {
    setShowLoginModal(false);
    setopenSignUpModal(!openSignUpModal);
  };

  const openLoginModal = (e?: React.MouseEvent<HTMLElement>) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    setShowLoginModal(!showLoginModal);
    setopenSignUpModal(false);
  };

  const openForgotModal = () => {
    setShowForgotModal(!showForgotModal);
    setShowLoginModal(false);
  };

  const resetModals = (e: any) => {
    if (e?.target?.attributes?.class) {
      e?.target?.attributes.class.value === 'Modal-Area'
        ? [
            setShowLoginModal(false),
            setopenSignUpModal(false),
            setShowRecoveryModal(false),
            setShowForgotModal(false)
          ]
        : null;
    }
  };

  const handleFgtPwdSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios
        .post(`${config.VITE_SERVER_URL}/api/user/resetpassword`, {
          email: frgtPwdMail
        })
        .then((res) => {
          toast(res.data.message);
        });
    } catch (err: any) {
      console.log(err);
      if (err.message === 'Network Error') {
        return toast.error('Network error');
      }
      toast.error(err.response.data.error);
    }
  };

  const toggleSignupSiginModal = (e: any) => {
    e === 'Log in' ? openLoginModal() : null;
    e === 'Sign up' ? setopenSignUpModal(true) : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        // send email to the route
        await axios
          .post(`${config.VITE_SERVER_URL}/api/user/changepassword`, {
            password,
            token
          })
          .then((res) => {
            toast.success(res.data.message);
          });
      }
    } catch (err: any) {
      if (err.message === 'Network Error') {
        return toast('Network error');
      }
      toast(err.response.data.error);
    }
  };

  return (
    <React.Fragment>
      <div className={''}>
        <LogoutNavbar toggleLoginBtn={toggleSignupSiginModal} />

        {true && (
          <div className={''}>
            <span onClick={(e) => resetModals(e as unknown)} className={''}>
              <Modal closeModal={openModal}>
                <main>
                  <>
                    <span className={resetcss.container}>
                      <div className={resetcss.form_container}>
                        <span className={resetcss.text}>
                          Reset Your Password !{' '}
                        </span>
                      </div>
                      <div className={resetcss.custom_control_input}>
                        <input
                          className={resetcss.custom_control2_input}
                          type="password"
                          value={password}
                          placeholder="password"
                          name="password"
                          required
                          id="password"
                          onChange={onChange}
                        />
                      </div>
                      <div className={resetcss.custom_control_input}>
                        <input
                          type="password"
                          className={resetcss.custom_control2_input}
                          placeholder="Confirm password"
                          onChange={onChange}
                          value={confirmPassword}
                          required={true}
                          name="confirmPassword"
                          id="confirm-password"
                        />
                      </div>
                      <span className={resetcss.login_remember_container}>
                        <span
                          onClick={(e) => handleSubmit(e)}
                          className={resetcss.onSubmitBtn}
                        >
                          Change Password
                        </span>
                      </span>

                      <span
                        className={resetcss.text}
                        // onClick={props.openForgotModal}
                      >
                        Access The World of Smooze !!
                      </span>
                    </span>
                  </>
                </main>
              </Modal>
            </span>
          </div>
        )}
        {showRecoveryModal && <PasswordRecover />}
        {openSignUpModal && (
          <div className={''}>
            <span onClick={(e) => resetModals(e as unknown)} className={''}>
              <Modal closeModal={openModal}>
                <Signup onChange={onChange} openLoginModal={openLoginModal} />
              </Modal>
            </span>
          </div>
        )}
        {showLoginModal && (
          <div className={''}>
            <span onClick={(e) => resetModals(e as unknown)} className={''}>
              <Modal closeModal={openLoginModal}>
                <Login
                  openForgotModal={openForgotModal}
                  openModal={openModal}
                />
              </Modal>
            </span>
          </div>
        )}
        {showForgotModal && (
          <div>
            <span onClick={(e) => resetModals(e as unknown)} className={''}>
              <Modal closeModal={openForgotModal}>
                <ForgotPass
                  setFrgtPwdMail={setFrgtPwdMail}
                  handleFgtPwdSubmit={handleFgtPwdSubmit}
                />
              </Modal>
            </span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ResetPasswordComp;
