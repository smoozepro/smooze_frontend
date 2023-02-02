/* eslint-disable */
import React, { useEffect, useState, useContext } from "react";
import profille from "./ProfileDashboard.module.css";
import { apiGet, apiPatch } from "../../utils/api";
import { toast } from "react-toastify";
import { BsPlusCircle } from "react-icons/bs";
import LoginNavbar from "../Navbar/LoginNavbar/LoginNavbar";
import AccountType from "../accountType/accountType";
import { DataContext } from "../../useContext";
import { AllContext } from "../../useContext/interface";

interface User {
  email: string;
  profileImage: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  country?: string;
  userName?: string;
  is_premium?: string;
  day?: string;
  month?: string;
  year?: string;
}

const initialValue = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  country: "",
  profileImage: "",
  is_premium: false,
  day: "",
  month: "",
  year: "",
  date_birth: "00/00/0000",
};

const ProfileDashboard = () => {
  {
    /* eslint-disable-next-line */
  }

  const { user, setUser } = useContext(DataContext) as AllContext;

  // const [date_birth, setDate_birth] = useState("00/00/0000");
  // const [user, setUser] = useState<User | null>(null);
  // const [updateEffect, setUpdateEffect] = useState(false);
  // const [formData, setFormData] = useState<FormData>();
  const [dataValues, setDataValues] =
    useState<Record<string, any>>(initialValue);
  // let formData = new FormData();
  // const [file, setFile] = useState<File>();
  useEffect(() => {
    // const signature = localStorage.getItem("token");
    // if (!signature) {
    //   toast.error("You must be logged in to perform this action.");
    // } else {
    //   apiGet("/api/user/get-user")
    //     .then((res) => {
    //       setUser(res.data.user);
    //     })
    //     .catch(console.error);
    // }

    // export const year = (): number[] => {
    //   const years = [];
    //   const currentYear = new Date().getFullYear();
    //   for (let i = 1970; i <= currentYear; i++) {
    //     years.push(i);
    //   }
    //   return years;
    // };

    if (user) {
      setDataValues((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        country: user.country,
        profileImage: user.profileImage,
        is_premium: user.is_premium,
        day: user.day,
        month: user.month,
        year: user.year,
      }));
    }
  }, [user]);

  // console.log(user);
  const handleChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    console.log({ ...dataValues, [name]: value });

    // formData?.append(name, value);
    setDataValues({ ...dataValues, [name]: value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      // setFile(e.target.files[0]);
      setDataValues({ ...dataValues, profileImage: e.target.files[0] });
    }
  };
  const submitProfileUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      // firstName, lastName, email, country, date_birth
      const formData = new FormData();
      dataValues.date_birth &&
        formData.set("date_birth", dataValues.date_birth);
      dataValues.firstName && formData.set("firstName", dataValues.firstName);
      dataValues.lastName && formData.set("lastName", dataValues.lastName);
      dataValues.email && formData.set("email", dataValues.email);
      dataValues.gender && formData.set("gender", dataValues.gender);
      dataValues.country && formData.set("country", dataValues.country);
      dataValues.day && formData.set("day", dataValues.day);
      dataValues.month && formData.set("month", dataValues.month);
      dataValues.year && formData.set("year", dataValues.year);
      if (dataValues.profileImage !== undefined) {
        formData.set("profileImage", dataValues.profileImage);
      }
      // console.log(dataValues.country);

      await apiPatch("/api/user/update", formData)
        .then((res) => {
          toast.success(res.data.message);
          setUser(res.data.User);
          console.log(formData);

          localStorage.setItem("user", JSON.stringify(res.data.User));
          // formData = new FormData();
          // setUpdateEffect(!updateEffect);
        })
        .catch(console.log);
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
    }
  };

  // const makeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.name === "day") {
  //     const newDate = ${e.target.value}${dataValues.date_birth.slice(2)};
  //     // setDate_birth(newDate);
  //     setDataValues({ ...dataValues, date_birth: newDate });
  //   }
  //   if (e.target.name === "month") {
  //     const newDate = `${dataValues.date_birth.slice(0, 3)}${
  //       e.target.value
  //     }${dataValues.date_birth.slice(5)}`;
  //     // setDate_birth(newDate);
  //     setDataValues({ ...dataValues, date_birth: newDate });
  //   }
  //   if (e.target.name === "year") {
  //     const newDate = ${dataValues.date_birth.slice(0, 6)}${e.target.value};
  //     // setDate_birth(newDate);
  //     setDataValues({ ...dataValues, date_birth: newDate });
  //   }
  // };

  return (
    <div className={profille.container}>
      {" "}
      {/* <LoginNavbar openModal={undefined} openLoginModal={undefined} /> */}
      <div className={profille.userContainer}>
        {" "}
        <div className={profille.user}>
          {" "}
          <label className={profille.fileUpload}>
            {" "}
            {/* checkhere {user && (  */}
            {user != null && (
              <img
                alt="profile"
                src={dataValues.profileImage}
                className={profille.profileImg}
              />
            )}
            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
              className={profille.uploadInput}
              accept=".jpeg, .jpg, .png, .gif, .svg"
            />{" "}
            <BsPlusCircle className={profille.plussign} />{" "}
            {/* check here <p>{file && file.name}</p> */}
            <p>
              {dataValues.profileImage != null && dataValues.profileImage.name}
            </p>{" "}
          </label>{" "}
          <div className={profille.userText}>
            {" "}
            <h3>
              {user?.firstName || "John"} {user?.lastName || "Doe"}
            </h3>{" "}
            <p>{user?.is_premium ? "premuim" : "free"} Account</p>{" "}
          </div>{" "}
        </div>{" "}
        {/* <button>Go to Premium</button> */}
        <AccountType />{" "}
      </div>{" "}
      <div className={profille.formdiv}>
        {" "}
        <h1>Contact</h1>{" "}
        <form className={profille.form} encType="multipart/form-data">
          {" "}
          <div className={profille.name}>
            {" "}
            <div>
              {" "}
              <label>First Name</label>{" "}
              <input
                value={dataValues.firstName}
                className={profille.nameinput}
                type="text"
                name="firstName"
                placeholder={user?.firstName || "first name"}
                onChange={handleChange}
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label>Last Name</label>{" "}
              <input
                value={dataValues.lastName}
                className={profille.nameinput}
                type="text"
                name="lastName"
                placeholder={user?.lastName || "Last name"}
                onChange={handleChange}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className={profille.email}>
            {" "}
            <label>Email</label>{" "}
            <input
              value={dataValues.email}
              className={profille.nameinput}
              type="text"
              name="email"
              placeholder={user?.email || "Email"}
              onChange={handleChange}
            />{" "}
          </div>{" "}
          <div className={profille.genderCountry}>
            {" "}
            <div className={profille.genderselect}>
              {" "}
              <p>Gender</p>{" "}
              <select
                name="gender"
                placeholder="gender"
                value={dataValues.gender}
                onChange={handleChange}
              >
                {" "}
                <option value="male">Male</option>{" "}
                <option value="female">Female</option>{" "}
              </select>{" "}
            </div>{" "}
            <div className={profille.genderselect}>
              {" "}
              <p>Country</p>{" "}
              <select
                name="country"
                placeholder="country"
                value={dataValues.country}
                onChange={handleChange}
              >
                {" "}
                {/* <option selected={true} value="Nigeria">Nigeria</option>{" "} */}
                <option value="Ukraine">Ukraine</option>{" "}
                <option value="Nigeria">Nigeria</option>{" "}
                <option value="Ghana">Ghana</option>{" "}
                <option value="Egypt">Egypt</option>{" "}
                <option value="Cameroon">Cameroon</option>{" "}
              </select>{" "}
            </div>{" "}
          </div>{" "}
          <div className={profille.dateMonthYear}>
            {" "}
            <div>
              {" "}
              <p>Day</p>{" "}
              <select
                name="day"
                placeholder="day"
                onChange={handleChange}
                value={dataValues.day}
                className={profille.dateMonthYear}
              >
                {" "}
                <option value="01">1</option> 
                <option value="02">2</option>{" "}
                <option value="03">3</option>{" "}
                <option value="03">3</option> 
                <option value="04">4</option>{" "}
                <option value="05">5</option> 
                <option value="06">6</option>{" "}
                <option value="07">7</option> 
                <option value="08">8</option>{" "}
                <option value="09">9</option> 
                <option value="10">10</option>{" "}
                <option value="11">11</option> 
                <option value="12">12</option>{" "}
                <option value="13">13</option> 
                <option value="14">14</option>{" "}
                <option value="15">15</option> 
                <option value="16">16</option>{" "}
                <option value="17">17</option> 
                <option value="18">18</option>{" "}
                <option value="19">19</option> 
                <option value="20">20</option>{" "}
                <option value="21">21</option> 
                <option value="22">22</option>{" "}
                <option value="23">23</option> 
                <option value="24">24</option>{" "}
                <option value="25">25</option> 
                <option value="26">26</option>{" "}
                <option value="27">27</option> 
                <option value="28">29</option>{" "}
                <option value="29">30</option> 
                <option value="30">31</option>{" "}
              </select>{" "}
            </div>{" "}
            <div>
              {" "}
              <p>Month</p>{" "}
              <select
                name="month"
                placeholder="month"
                onChange={handleChange}
                value={dataValues.month}
                className={profille.dateMonthYear}
              >
                {" "}
                <option value="01">January</option>{" "}
                <option value="02">Feburary</option>{" "}
                <option value="03">March</option>{" "}
                <option value="04">April</option>{" "}
                <option value="05">May</option> <option value="06">June</option>{" "}
                <option value="07">July</option>{" "}
                <option value="08">August</option>{" "}
                <option value="09">September</option>{" "}
                <option value="10">octomber</option>{" "}
                <option value="11">November</option>{" "}
                <option value="12">December</option>{" "}
              </select>{" "}
            </div>{" "}
            <div>
              {" "}
              <p>Year</p>{" "}
              <select
                name="year"
                placeholder="year"
                onChange={handleChange}
                value={dataValues.year}
                className={profille.dateMonthYear}
              >
                {" "}
                <option value="1990">1990</option>{" "}
                <option value="1991">1991</option>{" "}
                <option value="1992">1992</option>{" "}
                <option value="1993">1993</option>{" "}
                <option value="1994">1994</option>{" "}
                <option value="1995">1995</option>{" "}
                <option value="1996">1996</option>{" "}
                <option value="1997">1997</option>{" "}
                <option value="1998">1998</option>{" "}
                <option value="1999">1990</option>{" "}
                <option value="2000">2000</option>{" "}
                <option value="2001">2001</option>{" "}
                <option value="2002">2002</option>{" "}
                <option value="2003">2003</option>{" "}
                <option value="2004">2004</option>{" "}
                <option value="2005">2005</option>{" "}
                <option value="2006">2006</option>{" "}
                <option value="2007">2007</option>{" "}
                <option value="2008">2008</option>{" "}
                <option value="2009">2009</option>{" "}
                <option value="2010">2010</option>{" "}
                <option value="2011">2011</option>{" "}
                <option value="2012">2012</option>{" "}
                <option value="2013">2013</option>{" "}
                <option value="2014">2014</option>{" "}
                <option value="2015">2015</option>{" "}
                <option value="2016">2016</option>{" "}
                <option value="2017">2017</option>{" "}
                <option value="2018">2018</option>{" "}
                <option value="2019">2019</option>{" "}
                <option value="2020">2020</option>{" "}
                <option value="2021">2021</option>{" "}
                <option value="2022">2022</option>{" "}
                <option value="2023">2023</option>{" "}
              </select>{" "}
            </div>{" "}
          </div>{" "}
          <div className={profille.submit}>
            {" "}
            {/* eslint-disable-next-line */}
            <button type="submit" onClick={submitProfileUpdate}>
              {" "}
              Submit
            </button>{" "}
          </div>{" "}
        </form>{" "}
        <div className={profille.userContainerF}>
          {" "}
          <p>Facebook</p> <p>Not Connected</p>{" "}
        </div>{" "}
        <div className={profille.userContainerG}>
          {" "}
          <p>Google</p> <p>Not Connected</p>{" "}
        </div>{" "}
      </div>{" "}
      <div className={profille.streaming}>
        {" "}
        <h3>Streaming</h3>{" "}
        <div>
          {" "}
          <h4 className={profille.audio}>
            Audio Quality (Premium feature)
          </h4>{" "}
          <form className={profille.checkForm}>
            {" "}
            <div className={profille.check}>
              {" "}
              <input type="radio" name="audio" />{" "}
              <label htmlFor="normal">Normal (128 kb/s)</label>{" "}
            </div>{" "}
            <div className={profille.check}>
              {" "}
              <input type="radio" name="audio" id="high" />{" "}
              <label htmlFor="high">High (192 kb/s)</label>{" "}
            </div>{" "}
            <div className={profille.check}>
              {" "}
              <input type="radio" name="audio" />{" "}
              <label htmlFor="highest">Highest (320 kb/s)</label>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
      {/* footer */}
      <div className={profille.footercontainer}>
        {" "}
        <h1 className={profille.contactradioh1}>Account</h1>{" "}
        <div className={profille.footercolumncontent}>
          {" "}
          <h3>Enable Browser Notification</h3>{" "}
          <div className="center">
            {" "}
            <input
              type="checkbox"
              name=""
              className={profille.inputbttn}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className={profille.footercolumncontent}>
          {" "}
          <h3>Language</h3>{" "}
          <select name="gender" className={profille.inputboxlang}>
            {" "}
            <option value="male">English</option>{" "}
            <option value="radio">French</option>{" "}
            <option value="radio">German</option>{" "}
          </select>{" "}
        </div>{" "}
        <div className={profille.footercolumncontent}>
          {" "}
          <h3>Change password</h3>{" "}
        </div>{" "}
        <div className={profille.footercolumncontent}>
          {" "}
          <h3>Add new account</h3>{" "}
        </div>{" "}
        <div className={profille.footercolumncontent}>
          {" "}
          <h3>Terms and Conditions</h3>{" "}
        </div>{" "}
        <div className={profille.footercolumncontent}>
          {" "}
          <h3>Privacy Policy</h3>{" "}
        </div>{" "}
        <div className={profille.footercolumncontent}>
          {" "}
          <h3>Support</h3>{" "}
        </div>{" "}
      </div>{" "}
      <div className={profille.logout}>
        {" "}
        <button type="submit" className="" value="Logout">
          {" "}
          Logout{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};
export default ProfileDashboard;
