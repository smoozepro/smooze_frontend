import React, { useContext, useState } from 'react';
import adminStyle from './adminDashboard.module.css';
import { AllContext } from '../../useContext/interface';
import { DataContext } from '../../useContext/index';
import { apiPost } from '../../utils/api';
import { toast } from 'react-toastify';
import Loading from '../Loader/Loading';
const PodcastAdmin = () => {
  const { podcasts, podCategories, uploadingData, setUploadingData } =
    useContext(DataContext) as AllContext;

  const [podcast, setPodcast] = useState<File | null>();
  const [img, setImg] = useState<File | null>();
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [pdcategory, setPdcategory] = useState<string>('');

  const handlePodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setPodcast(e.target.files[0]);
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setImg(e.target.files[0]);
    }
  };

  const handleAddFormDataSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setUploadingData(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('name', artist);
      formData.append('category', pdcategory);
      podcast && formData.append('podcastFile', podcast);
      img && formData.append('imageFile', img);

      const send = await apiPost('/api/podcast/create', formData);
      console.log(send);
      send && toast.success('Podcast succefully created');
      setPodcast(null);
      setImg(null);
      setTitle('');
      setArtist('');
      setPdcategory('');
      setUploadingData(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCat = (catID: string) => {
    return podCategories.find((el) => el.id === catID)?.name;
  };
  return (
    <React.Fragment>
      <div className={adminStyle.tableContainer}>
        <form onSubmit={handleAddFormDataSubmit}>
          <div className={adminStyle.mainContainer}>
            <input
              placeholder="Title"
              name="title"
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(event?.target.value)
              }
            />
            <input
              name="author"
              type="text"
              placeholder="Author"
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setArtist(event?.target.value)
              }
            />

            <select
              placeholder="Category"
              onSelect={(event: any) => setPdcategory(event?.target.value)}
              name="category"
              required
              onChange={(event: any) => setPdcategory(event?.target.value)}
            >
              <option disabled>Category</option>
              {podCategories &&
                podCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>

            {/* <label htmlFor="imageupload" className={adminStyle.label}>
							<span >Select Image <AiFillCamera /></span> */}
            <input
              name="image"
              type="file"
              placeholder="Add Image file"
              accept=".jpeg, .jpg, .png, .gif, .webp"
              required
              onChange={handleImgChange}
            />
            {/* </label> */}

            {/* <label htmlFor="adminsongupload" className={adminStyle.label}>
							<span >Add Audio <MdOutlineAudiotrack /></span> */}
            <input
              name="audio"
              type="file"
              placeholder="Add Podacst file"
              accept=".mp3, .mp4, .mpeg, .wav, .ogg, .aac, .wav"
              required
              onChange={handlePodChange}
            />
            {/* </label> */}

            <button type="submit" draggable={uploadingData}>
              Add Podcast
            </button>
          </div>
        </form>
        <table className={adminStyle.table}>
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Category</th>
              <th>Picture</th>
              <th>Audio</th>
            </tr>
          </thead>
          {uploadingData && <Loading />}
          <tbody>
            {podcasts &&
              podcasts.map((podcast: any, index: number) => (
                <tr key={index}>
                  <td>{podcast.name}</td>
                  <td>{podcast.title}</td>
                  <td>{getCat(podcast.category)}</td>
                  <td>
                    <img
                      src={podcast.imageUrl}
                      alt={`${podcast.name}${podcast.title}`}
                      className={adminStyle.smallimg}
                    />
                  </td>
                  <td>
                    <a href={podcast.songUrl}>Song Link</a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default PodcastAdmin;
