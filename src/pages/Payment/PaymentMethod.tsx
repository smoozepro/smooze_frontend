/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import Payment from "./Payment.module.css";
import { toast } from "react-toastify";
import { apiPost } from "../../utils/api";
import { DataContext } from "../../useContext";
import { AllContext } from "../../useContext/interface";
import { Link, useNavigate } from 'react-router-dom';
import config from "../../utils/config/config";

const PaymentMethod = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const { getUser } = useContext(DataContext) as AllContext;
  const navigate = useNavigate();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // const paystackkey = process.env.REACT_PAYSTACK_PUBLIC_KEY;
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: config.VITE_PAYMENT_KEY,
      amount: 1500 * 100,
      email,
      firstName,
      LastName,
      async onSuccess(transaction: { reference: any }) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const message = `Payment complete successfully ${transaction.reference}`;
        toast.success(message);
        navigate('/user-dashboard');

        setEmail('');
        setAmount('');
        setFirstName('');
        setLastName('');
        const data = {
          paystackResponse: 'success',
          transactionref: transaction.reference
        };

        const res = await apiPost('/api/user/paystack-response', data);
        if (res.status === 200) {
          toast.success('Payment successful');
          localStorage.setItem('token', res.data.signature);
          await getUser();
          window.location.href = '/user-dashboard';
        }
      },
      onCancel() {}
    });
  };



  return (
    <React.Fragment>
      <form method='get'>
        <div className={Payment.paymentContainer}>
          <div className={Payment.paymentForm}>
            <div className={Payment.top}>
              SMOOZE PREMIUM
              <div className={Payment.topp}>
                <p className={Payment.topp}>Enter your details</p>
              </div>
            </div>
            <div className={Payment.paymentInput}>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                required
                name='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={Payment.paymentInput}>
              <label htmlFor='firstName'>FirstName</label>
              <input
                type='text'
                id='firstName'
                required
                name='firstName'
                placeholder='FirstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className={Payment.paymentInput}>
              <label htmlFor='lastName'>LastName</label>
              <input
                type='text'
                id='lastName'
                required
                name='lastName'
                placeholder='LastName'
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <button
              className={Payment.paymentBtn}
              type='submit'
              onClick={handleSubmit}

            >
              Pay N1500{amount}
            </button>
            <button
              className={Payment.paymentBtn}
            >
              <Link to={"/user-dashboard"}>
              Back</Link>
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default PaymentMethod;
