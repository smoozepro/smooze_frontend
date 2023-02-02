import React from "react";
import loadcss from "./loading.module.css";
function Loading() {
	return (
		<>
			<div className={loadcss.multicolor_loader}></div>
		</>
	);
}

export default Loading;
