import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { apiPost } from '../../utils/api';
import AxiosErrorHandler from '../../utils/api/axiosErrorHandler';
import { DataContext } from '../../useContext';
import { AllContext } from '../../useContext/interface';
import adminStyle from './adminDashboard.module.css';
import { AiFillCamera } from 'react-icons/ai';
import Loading from '../Loader/Loading';

const GenreAdminDashboard = () => {
  const { genres, appendGenre, uploadingData, setUploadingData } = useContext(
    DataContext
  ) as AllContext;
  const [genreName, setGenreName] = useState('');
  const [genreImg, setGenreImg] = useState<File>();
  const [newError, setNewError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setGenreImg(e.target.files[0]);
    }
  };

  const handleAddFormDataSubmit = (e: any) => {
    setUploadingData(true);
    e.preventDefault();
    if (genreImg === undefined) {
      return toast.error('please, upload an image', {
        toastId: 'genreime err'
      });
    }
    if (genreName.length === 0) {
      return toast.error('please, add a song name', {
        toastId: 'genrename err'
      });
    }
    const formData = new FormData();
    formData.set('name', genreName);
    formData.set('genreImage', genreImg);

    apiPost('/api/genre/addgenre', formData)
      .then((res) => {
        appendGenre(res.data.saved);
        toast.success(res.data.message, { toastId: 'genreadd success' });
      })
      .catch((err: any) => {
        setNewError(err);
      });
  };

  return (
    <React.Fragment>
      <div className={adminStyle.tableContainer}>
        <form>
          <div className={adminStyle.mainContainer}>
            <label htmlFor="genreimgupload" className={adminStyle.label}>
              <span>
                Select Image <AiFillCamera />
              </span>
              <input
                id="genreimgupload"
                name="genreImage"
                type="file"
                placeholder="Genre Name"
                required
                accept=".jpeg, .jpg, .png, .gif"
                onChange={handleFileChange}
              />
            </label>
            <input
              name="name"
              type="text"
              placeholder="genre"
              required
              value={genreName}
              onChange={(e) => {
                setGenreName(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={handleAddFormDataSubmit}
              disabled={uploadingData}
            >
              Add Genre
            </button>
          </div>
        </form>
        {uploadingData && <Loading />}
        <table className={adminStyle.table}>
          <thead>
            <tr>
              <th>Genre</th>
              <th>Genre Image</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre: any) => (
              <tr key={genre.id}>
                <td>{genre.name}</td>
                <td>
                  <img
                    src={genre.genreImage}
                    className={adminStyle.smallimg}
                    alt={genre.name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {newError && <AxiosErrorHandler err={newError} />}
      </div>
    </React.Fragment>
  );
};

export default GenreAdminDashboard;
