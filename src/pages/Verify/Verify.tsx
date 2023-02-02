import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../utils/config/config";

const Verify = () => {
	const navigate = useNavigate();

	const searchParams = new URLSearchParams(document.location.search);
	const token = searchParams.get("token");

	useEffect(() => {
		const verifyUser = async () => {
			try {
				if (token === undefined || token === null)
					return toast.error("Unauthorized", { toastId: "verify unauth" });
				await axios
					.patch(`${config.VITE_SERVER_URL}/api/user/verify?token=${token}`)
					.then((res) => {
						toast.success(res.data.message, { toastId: "verify" });
						setTimeout(() => navigate("/"), 2000);
					});
			} catch (err: any) {
				if (err.message === "Network Error") {
					return toast("Network error", { toastId: "verify err" });
				}
				toast(err.response.data.error, { toastId: "verifyerr2" });
			}
		};
		void verifyUser();
	}, [navigate, token]);

	return <div className="verifypage"></div>;
};

export default Verify;
