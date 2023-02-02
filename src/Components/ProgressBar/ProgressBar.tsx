import React, { Component } from "react";
import Progress from "react-progress";

class View extends Component {
	render() {
		return (
			<div>
				<Progress
					percent={50}
					height={3}
					style={{
						position: "relative",
						width: "500px",
						padding: "0px",
						margin: "0px",
					}}
				/>
			</div>
		);
	}
}




class View2 extends Component {
	render() {
		return (
			<div>
				<Progress
					percent={50}
					height={3}
					color="#fff"
					style={{
						position: "relative",
						width: "100px",
						padding: "0px",
						margin: "0px",
					}}
				/>
			</div>
		);
	}
}

class View3 extends Component {
	render() {
		return (
			<div>
				<Progress
					percent={50}
					height={3}
					style={{
						position: "relative",
						width: "200px",
						padding: "0px",
						margin: "0px",
					}}
				/>
			</div>
		);
	}
}

class View4 extends Component {
	render() {
		return (
			<div>
				<Progress
					percent={50}
					height={3}
					color="#fff"
					style={{
						position: "relative",
						width: "70px",
						padding: "0px",
						margin: "0px",
					}}
				/>
			</div>
		);
	}
}

export { View, View2, View3, View4 };
