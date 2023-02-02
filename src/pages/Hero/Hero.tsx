/* eslint-disable prettier/prettier */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Hero.css";

const Hero = ({handleAction}:{handleAction?:Function}) => {
	const navigate = useNavigate()
	const handleClick = (e:React.MouseEvent)=>{
		e.preventDefault()
		if(handleAction){
		handleAction();
		toast.warning("Kindly login.")
		return;
	}
		navigate('/payment')
	}
	// eslint-disable-next-line prettier/prettier
  return (
		<div className="hero">
			<div className="section1">
				<h2>
					Open the world of music. <br /> It's all here
				</h2>
				<div className="musicbox">
					<button onClick={handleClick}>
						<Link to={''}>SMOOZE PREMIUM</Link>
					</button>
					<button onClick={handleClick}>
					<Link to={''}>SMOOZE FREE </Link>
						</button>
				</div>
				<div className="sub">
					<p> N1500/month after</p>
					<p>1-month free trial</p>
				</div>
			</div>
		</div>
	);
};

export default Hero;
