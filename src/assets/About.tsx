import React, { useContext, useEffect, useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import BrowseDetails from '../Components/BrowseDetails/styles/BrowseDetails.module.css';
import AJ from './AJ.jpeg';
import bayero from './bayero.png';
import chidinma from './chidinma.png';
import dora from './Dora.png';
import justin from './justin.png';
import nonso from './nonso.png';
import gt from './GT.png';
import bayo from './bayo.png';
import boye from './boye.png';
import joshua from './Joshua.png';
import osaze from './osaze.png';
import prince from './prince.png';
import wale from './wale.png';
import { Link } from 'react-router-dom';
import { AllContext, ArtistAttributes } from '../useContext/interface';
import { DataContext } from '../useContext';
import { TbBrandLinkedin } from 'react-icons/tb';
import { AiOutlineGithub } from 'react-icons/ai';

function About() {
  const Redirect = (path: string) => {
    return (document.location.href = path);
  };
  return (
    <div className={BrowseDetails.aboutContainer}>
      <div className={BrowseDetails.aboutContent}>
        <h3>ABOUT SMOOZEAPP</h3>
        <p className={BrowseDetails.aboutPara}>
          Listen anytime, anywhere All your favorite songs and episodes are
          always available - even without WiFi or LTE.
        </p>
        <p>
          Find the music you want Search for your favorite songs using the
          description, or turn on the MusicFinder feature to find the song that
          is playing near you.
        </p>
      </div>

      <h3 className={BrowseDetails.h3}>Contributors</h3>
      <div className={BrowseDetails.aboutmusic}>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={AJ} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Ajiri Enoch Osiobe</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={nonso} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Chukwunonso Okoye</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={bayero} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Mohammed Bayero</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={gt} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Omoregie Godstime</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={chidinma} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>
            Onyemelukwe Chidinma
          </h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={dora} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Theodora Omaballa</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>

        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={justin} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Justin Ewelike</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>

        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={bayo} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Akinbayo Akinwande</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={boye} alt="artistImage" />
          </div>
          <h4>Adeboye Samuel</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={wale} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Adewale Karounwi</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={osaze} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>Osazee Imadonmwonyi</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={joshua} alt="artistImage" />
          </div>
          <h4 className={BrowseDetails.musicInfoHeader}>
            Joshua Mamuzo Dogubo
          </h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
        <div className={BrowseDetails.artistInfo}>
          <div className={BrowseDetails.artistImg}>
            <img src={prince} alt="artistImage" />
          </div>
          <h4>Prince Nmezi</h4>
          <span className={BrowseDetails.iconAndDesc}>
            <TbBrandLinkedin className={BrowseDetails.iconLike} />
            <p
              onClick={() =>
                Redirect('https://www.linkedin.com/in/ajiri-osiobe-801675184')
              }
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on LinkedIn
            </p>
          </span>
          <span className={BrowseDetails.iconAndDesc}>
            <AiOutlineGithub className={BrowseDetails.iconLike} />
            <p
              onClick={() => Redirect('https://github.com/AJ-droi')}
              className={BrowseDetails.musicInfoDescription}
            >
              Follow on Github
            </p>
          </span>
        </div>
      </div>

      {/* <div className={BrowseDetails.music}>

					<div className={BrowseDetails.artistImg}>
						<img src={newrelease} alt="ProductiveMorning" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>
							Productive Morning
						</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>257,634</p>
						</span>
					</div>
				</div>
				<div className={BrowseDetails.music}>
					<div className={BrowseDetails.artistImg}>
						<img src={Queen} alt="WhiteNoise" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>White Noise</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>757,234</p>
						</span>
					</div>
				</div>
				<div className={BrowseDetails.music}>
					<div className={BrowseDetails.artistImg}>
						<img src={newrelease} alt="Nature" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>Nature</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>157,234</p>
						</span>
					</div>
				</div>
				<div className={BrowseDetails.music}>
					<div className={BrowseDetails.artistImg}>
						<img src={Queen} alt="BrainFood" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>Brain Food</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>357,234</p>
						</span>
					</div>
				</div>
				<div className={BrowseDetails.music}>
					<div className={BrowseDetails.artistImg}>
						<img src={newrelease} alt="MorningRush" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>Morning Rush</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>607,554</p>
						</span>
					</div>
				</div>
				</div> */}
    </div>
  );
}
export default About;
