import Genres from "../../Components/Browse/Genres";
import BrowseCss from "./Browse.module.css";

const Browse = () => {
	return (
		<>
			<div className={BrowseCss.browseMain}>
				<div className={BrowseCss.browseTitle}>Genres</div>
				<div className={BrowseCss.container}>
					<Genres />
				</div>
			</div>
		</>
	);
};

export default Browse;
