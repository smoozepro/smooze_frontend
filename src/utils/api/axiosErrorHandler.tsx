import React from "react";
import { toast } from "react-toastify";

const AxiosErrorHandler = ({ err }: { err: any }) => {
	console.log(err);
	if (err.message === "Network Error") {
		toast("Network error", { toastId: err.config.url });
	} else {
		toast.error(err.response.data.error.split(".")[0], {
			toastId: err.response.data.error,
		});
	}

	return <></>;
};

export default AxiosErrorHandler;
