// import "../../pages/Home/Home.css";
import { textAlign } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';
import style from './forgot.module.css'

const ForgotPass = (props: {
  setFrgtPwdMail: any;
  handleFgtPwdSubmit: any;
}) => {
  return (
    <div className="forgot">
      <header>
        <h1 style={
          {color:"black",
          textAlign:'center',

        }}>Forgot Password? </h1>
        <p style={{
          marginTop: '20px',
          color:"black",
          textAlign:"center"}}>
          kindly input your email address
        </p>
      </header>
      <main>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form>
          <p >Email</p>
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            onChange={(e: { target: { name: any; value: any } }) =>
              props.setFrgtPwdMail(e.target.value)
            }
            required
            id="fgtpswdmail"
          />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button 
          onClick={props.handleFgtPwdSubmit}
            style={{
              marginBottom: "10px" ,
              color:'white',
              width: '150px',
              height: '40px',
              background:' #2d9bef 0% 0% no-repeat padding-box',
              borderRadius: '20px',             
              marginRight: '0px',
            }}
          >Forgot Password</button>
        </form>
      </main>
    </div>
  );
};

export default ForgotPass;
