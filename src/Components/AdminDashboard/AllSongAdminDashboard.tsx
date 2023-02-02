import React, { useContext, useEffect, useState } from 'react';
// import { toast } from "react-toastify";
// import { apiPost } from "../../utils/api";
import adminStyle from './adminDashboard.module.css';
import { AllContext } from '../../useContext/interface';
import { DataContext } from '../../useContext/index';
import { AiFillCamera } from 'react-icons/ai';
import { MdOutlineAudiotrack } from 'react-icons/md';
import Loading from '../Loader/Loading';

const AdminDashboard = () => {
  const [data, setData] = useState<any>({});
  const {
    adminUploadHandler,
    genres,
    songs,
    artist,
    uploadingData,
    setUploadingData
  } = useContext(DataContext) as AllContext;
  const [pages, setPages] = useState<number[]>([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const noOfPages = songs.length / 10;
    let pageArray: number[] = [];
    for (let i = 0; i < noOfPages; i++) {
      const page = i + 1;
      pageArray.push(page);
    }
    setPages(pageArray);
  }, [songs]);

  const [song, setSong] = useState<File>();
  const [img, setImg] = useState<File>();

  const handleSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      console.log(e.target.files[0].name);
      setSong(e.target.files[0]);
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      console.log(e.target.files[0].name);
      setImg(e.target.files[0]);
    }
  };

  function handleChange(event: any) {
    const { name, value } = event.target;
    console.log(value);
    setData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  }

  const handleAddFormDataSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (song !== undefined && img !== undefined) {
      formData.append('songFile', song);
      formData.append('imageFile', img);
    }
    void adminUploadHandler(formData);
  };

  return (
    <React.Fragment>
      <div className={adminStyle.tableContainer}>
        <form className={adminStyle.form} onSubmit={handleAddFormDataSubmit}>
          <div className={adminStyle.mainContainer}>
            <select
              defaultValue={'Artist'}
              onSelect={handleChange}
              name="artist"
              required
              onChange={handleChange}
            >
              <option disabled>Artist</option>
              {artist.length > 0 &&
                artist.map((Oneartist) => (
                  <option key={Oneartist.id} value={Oneartist.id}>
                    {Oneartist.name}
                  </option>
                ))}
            </select>
            <input
              name="title"
              type="text"
              placeholder="Title"
              required
              onChange={handleChange}
            />
            <input
              name="year"
              type="number"
              placeholder="Year"
              required
              onChange={handleChange}
            />
            <select
              defaultValue="Genres"
              onSelect={handleChange}
              name="genreId"
              required
              onChange={handleChange}
            >
              <option disabled>Genres</option>
              {genres.length > 0 &&
                genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
            </select>

            <label htmlFor="imageupload" className={adminStyle.label}>
              <span>
                Select Image <AiFillCamera />
              </span>
              <input
                id="imageupload"
                name="image"
                type="file"
                accept=".jpeg, .jpg, .png, .gif, .webp"
                required
                onChange={handleImgChange}
              />
            </label>

            <label htmlFor="adminsongupload" className={adminStyle.label}>
              <span>
                Select Music <MdOutlineAudiotrack />
              </span>
              <input
                id="adminsongupload"
                name="audio"
                type="file"
                accept=".mp3, .mp4, .mpeg, .wav, .ogg, .aac, .wav"
                required
                onChange={handleSongChange}
              />
            </label>

            <button
              type="submit"
              disabled={uploadingData}
              className={adminStyle.submitBtn}
            >
              Add Song
            </button>
          </div>
        </form>
        {uploadingData && <Loading />}
        <div className={adminStyle.tableDiv}>
          <table className={adminStyle.table}>
            <thead>
              <tr>
                <th>Artist Name</th>
                <th>Title</th>
                <th>Genres</th>
                <th>Pictures</th>
                <th>Audios</th>
              </tr>
            </thead>
            <tbody>
              {songs.length > 0 &&
                songs
                  .slice((pageNum - 1) * 10, pageNum * 10)
                  .map((song: any, index: number) => (
                    <tr key={index}>
                      <td>{song.artist}</td>
                      <td>{song.title}</td>
                      <td>{song.genre}</td>
                      <td>
                        <img
                          src={song.imageUrl}
                          alt={`${song.artist}${song.title}`}
                          className={adminStyle.smallimg}
                        />
                      </td>
                      <td>
                        <a href={song.songUrl}>Song Link</a>
                      </td>
                    </tr>
                  ))}
            </tbody>
            <div className={adminStyle.pagination}>
              <span onClick={() => setPageNum(1)}>&laquo;</span>
              {pages.length > 0 &&
                pages.map((page) => (
                  <span
                    onClick={() => setPageNum(page)}
                    className={page === pageNum ? adminStyle.active : ''}
                  >
                    {page}
                  </span>
                ))}
              <span onClick={() => setPageNum(pages.length)}>&raquo;</span>
            </div>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
