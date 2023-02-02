import Popular from "../../Components/BrowseDetails/Popular";
import BrowseDetailcss from "../BrowseDetails/BrowseDetails.module.css";
import { useContext, useState } from "react";
import bg from "./assets/BG.png";
import { useParams } from "react-router-dom";
import { DataContext } from "../../useContext";
import { AllContext } from "../../useContext/interface";
const BrowseDetails = () => {
	const { id } = useParams();
	const { genres } = useContext(DataContext) as AllContext;
	const genre = genres.find((item) => item.id === id);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const [active, setActive] = useState<string | React.MouseEvent<HTMLElement>>(
		"#OVERVIEW"
	);
	const [activeLoad, setActiveLoad] = useState<
		string | React.MouseEvent<HTMLElement>
	>("forward");

	const handleLoadData = (e: React.MouseEvent<HTMLElement> | string) => {
		// console.log(e);
		setActiveLoad(e);
	};

	const params = useParams();

	return (
		<>
			<div className={BrowseDetailcss.browseMain}>
				<img src={bg} alt="bg" className={BrowseDetailcss.bgImage} />
				<span className={BrowseDetailcss.backdrop}>
					<div className={BrowseDetailcss.browseDetailsLinkContainer}>
						<span className={[BrowseDetailcss.browseDetailsTitle].join("")} >
							{genre?.name}
						</span>
					</div>
				</span>

				<div className={BrowseDetailcss.detailContainer}>
					<div id={"OVERVIEW"} className={BrowseDetailcss.header}>
						<span className={BrowseDetailcss.header}>
							Popular in these week
						</span>
						<span className={BrowseDetailcss.Browseviewall}>
							<span
								id={BrowseDetailcss.Browseviewall1}
								onClick={() => handleLoadData("backward")}
								className={
									activeLoad === "backward" && BrowseDetailcss.activeLoad
								}
							>
								{/* &#60; */}
							</span>
							<span
								id={BrowseDetailcss.Browseviewall1}
								onClick={() => handleLoadData("forward")}
								className={
									activeLoad === "forward" && BrowseDetailcss.activeLoad
								}
							>
								{/* &gt; */}
							</span>
						</span>
					</div>
					<Popular id={params.id} />
				</div>
			</div>
		</>
	);
};

export default BrowseDetails;
