import React from "react";
import IconPlayingCss from "./styles/IconPlaying.module.css";

function IconPlaying() {
	return (
		<span className={IconPlayingCss.PlayingContainer}>
			<span className={IconPlayingCss.PlayingBackground}>
				<span
					className={(IconPlayingCss.Playingbar, IconPlayingCss.Playingbar1)}
				></span>
				<span
					className={(IconPlayingCss.Playingbar, IconPlayingCss.Playingbar2)}
				></span>
				<span
					className={(IconPlayingCss.Playingbar, IconPlayingCss.Playingbar3)}
				></span>
				<span
					className={(IconPlayingCss.Playingbar, IconPlayingCss.Playingbar4)}
				></span>
			</span>
		</span>
	);
}

export default IconPlaying;
