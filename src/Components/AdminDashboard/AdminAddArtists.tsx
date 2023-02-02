import React, { useContext, useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { DataContext } from '../../useContext';
import { AllContext } from '../../useContext/interface';
import { apiPost } from '../../utils/api';
import AxiosErrorHandler from '../../utils/api/axiosErrorHandler';
import adminStyle from './adminDashboard.module.css';
import Loading from '../Loader/Loading';

const AdminAddArtists = () => {
  const { artist, appendArtist, uploadingData, setUploadingData } = useContext(
    DataContext
  ) as AllContext;

  const [data, setData] = useState<any>({});
  const [artistImg, setArtistImg] = useState<File>();
  const [newError, setNewError] = useState<string | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const noOfPages = artist.length / 10;
    let pageArray: number[] = [];
    for (let i = 0; i < noOfPages; i++) {
      const page = i + 1;
      pageArray.push(page);
    }
    setPages(pageArray);
  }, [artist]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setArtistImg(e.target.files[0]);
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const handleAddFormDataSubmit = (e: any) => {
    e.preventDefault();
    if (uploadingData) return null;
    setUploadingData(true);
    if (artistImg === undefined) {
      return toast.error('please, upload an image', {
        toastId: 'artist img err'
      });
    }
    const formData = new FormData();
    for (let key in data) {
      formData.set(key, data[key]);
    }
    formData.set('imageUrl', artistImg);

    apiPost('/api/artists/create-artist', formData)
      .then((res) => {
        appendArtist(res.data.artist);
        toast.success(res.data.message, { toastId: 'artist add success' });
        setUploadingData(false);
      })
      .catch((err: any) => {
        setNewError(err);
        setUploadingData(false);
      });
  };
  return (
    <>
      <div className={adminStyle.tableContainer}>
        <form>
          <div className={adminStyle.mainContainer}>
            <label htmlFor="artistupload" className={adminStyle.label}>
              <span>
                Select Image <AiFillCamera />
              </span>
              <input
                id="artistupload"
                name="artistImage"
                type="file"
                placeholder="Artist Name"
                required
                accept=".jpeg, .jpg, .png, .gif"
                onChange={handleFileChange}
              />
            </label>
            <input
              name="name"
              type="text"
              placeholder="Artist Name"
              required
              value={data.name}
              onChange={handleChange}
            />
            <input
              name="instagramUrl"
              type="text"
              placeholder="Instagram Url"
              required
              value={data.instagramUrl}
              onChange={handleChange}
            />
            <input
              name="twitterUrl"
              type="text"
              placeholder="Twitter Url"
              required
              value={data.twitterUrl}
              onChange={handleChange}
            />

            <button
              type="submit"
              onClick={handleAddFormDataSubmit}
              disabled={uploadingData}
            >
              Add Artist
            </button>
          </div>
        </form>
        <div className={adminStyle.tableDiv}>
          <table className={adminStyle.table}>
            <thead>
              <tr>
                <th>Artist Name</th>
                <th>Twitter</th>
                <th>Instagram</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {uploadingData && <Loading />}
              {artist.length > 0 &&
                artist
                  .slice((pageNum - 1) * 10, pageNum * 10)
                  .map((artist: any, index: number) => (
                    <tr key={artist.id}>
                      <td>{artist.name}</td>
                      <td>
                        <a href={artist.twitterUrl}>{artist.twitterUrl}</a>
                      </td>
                      <td>
                        <a href={artist.instagramUrl}>{artist.instagramUrl}</a>
                      </td>
                      <td>
                        <img
                          src={artist.imageUrl}
                          alt={artist.name}
                          className={adminStyle.smallimg}
                        />
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
        {newError && <AxiosErrorHandler err={newError} />}
      </div>
    </>
  );
};

export default AdminAddArtists;
