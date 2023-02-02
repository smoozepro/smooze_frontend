/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Post from "./posts";
// import "../../assets/rimages";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import RecentCSS from "./recentlyPlayed.module.css";
import { DataContext } from "../../useContext";
import { AllContext } from "../../useContext/interface";

function recentlyPlayed() {
	const [currentPage, setcurrentPage] = useState(1);
	const postPerPage = 6;
	// do not put async in useEffect whatsoever
	const { displayRecentMusic } = useContext(DataContext) as AllContext;

	// console.log(displayRecentMusic);

	const indexofLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexofLastPost - postPerPage;
	const currentPosts = displayRecentMusic.slice(indexOfFirstPost, indexofLastPost);
	const pageNumbers = Math.ceil(displayRecentMusic.length / postPerPage);
	return (
		<div className={RecentCSS.container}>
			<div className={RecentCSS.arrow}>
				<h3>Recently Played</h3>
				<div className={RecentCSS.arrows}>
					<button
						className={RecentCSS.buton}
						onClick={() => setcurrentPage(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<CgChevronLeft />
					</button>
					<button
						className={RecentCSS.buton}
						onClick={() => setcurrentPage(currentPage + 1)}
						disabled={currentPage === pageNumbers}
					>
						<CgChevronRight />
					</button>
				</div>
			</div>
			<Post post={displayRecentMusic} />
		</div>
	);
}

export default recentlyPlayed;
