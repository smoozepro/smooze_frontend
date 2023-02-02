/* eslint-disable */
import React, { useState, useReducer } from 'react';
import Find from '../Find/Find';
// import Flow from "../Flow/Flow";
import Footer from '../footer/footer';
import Hero from '../Hero/Hero';
import Listen from '../Listen/Listen';
import Premium from '../Premium/Premium';
import Modal from '../../Components/Modal/Modal';
import LogoutNavbar from '../../Components/Navbar/LogoutNavbar/LogoutNavbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordRecover from '../../Components/RecoveryPage/PasswordRecover';
import { useNavigate } from 'react-router-dom';
import Login from '../../Components/Login/Login';
import ForgotPass from '../../Components/ForgotPass/ForgotPass';
import Signup from '../../Components/Signup/Signup';
import homecss from './Home.module.css';
import Loading from '../../Components/Loader/Loading';

const Home = () => {
  const [openSignUpModal, setopenSignUpModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState<boolean>(false);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [frgtPwdMail, setFrgtPwdMail] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const openModal = () => {
    setFormData({});
    setShowLoginModal(false);
    setopenSignUpModal(!openSignUpModal);
  };

  const openLoginModal = (e?: React.MouseEvent<HTMLElement>) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      navigate('/user-dashboard');
    }
    setFormData({});
    setShowLoginModal(!showLoginModal);
    setopenSignUpModal(false);
  };

  const openForgotModal = () => {
    setFormData({});
    setShowForgotModal(!showForgotModal);
    setShowLoginModal(false);
  };

  function onChange(value: any) {
    console.log('Captcha value:', value);
  }

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
        .post('`${VITE_SERVER_URL}/api/user/resetpassword', {
          email: frgtPwdMail
        })
        .then((res) => {
          toast(res.data.message, { toastId: 'fgt pwd success' });
        });
    } catch (err: any) {
      console.log(err);
      if (err.message === 'Network Error') {
        return toast.error('Network error', { toastId: 'fgt pwd err' });
      }
      toast.error(err.response.data.error, { toastId: 'fgt pwd err2' });
    }
  };

  const toggleSignupSiginModal = (e: any) => {
    e === 'Log in' ? openLoginModal() : null;
    e === 'Sign up' ? setopenSignUpModal(true) : null;
  };
  setTimeout(() => {
    setLoading(() => false);
  }, 2000);
  return (
    <React.Fragment>
      {loading && <Loading />}{' '}
      {!loading && (
        <div className={homecss.home_container}>
          <LogoutNavbar toggleLoginBtn={toggleSignupSiginModal} />
          <Hero handleAction={openLoginModal} />
          {/* <Flow /> */}
          <Listen />
          <Find />
          <Premium handleAction={openLoginModal} />
          <Footer />
          {showRecoveryModal && <PasswordRecover />}
          {openSignUpModal && (
            <div className={homecss.signup_container}>
              <span
                onClick={(e) => resetModals(e as unknown)}
                className={homecss.clossBody}
              >
                <Modal closeModal={openModal}>
                  <Signup onChange={onChange} openLoginModal={openLoginModal} />
                </Modal>
              </span>
            </div>
          )}
          {showLoginModal && (
            <div className={homecss.signup_container}>
              <span
                onClick={(e) => resetModals(e as unknown)}
                className={homecss.clossBody}
              >
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
              <span
                onClick={(e) => resetModals(e as unknown)}
                className={homecss.clossBody}
              >
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
      )}
    </React.Fragment>
  );
};
export default Home;
