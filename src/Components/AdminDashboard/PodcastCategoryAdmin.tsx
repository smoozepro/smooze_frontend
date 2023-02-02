import React, { useContext, useState } from 'react';
import adminStyle from './adminDashboard.module.css';
import { AllContext } from '../../useContext/interface';
import { DataContext } from '../../useContext/index';
import { apiPost } from '../../utils/api';
import { toast } from 'react-toastify';
import { AiFillCamera } from 'react-icons/ai';
import APD from './AdminPD.module.css';
import Loading from '../Loader/Loading';

const PodcastCategoryAdmin = () => {
  const { podCategories, uploadingData, setUploadingData } = useContext(
    DataContext
  ) as AllContext;

  const [name, setName] = useState<string>('');
  const [categoryImage, setPdcategoryImage] = useState<File | null>();

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setPdcategoryImage(e.target.files[0]);
    }
  };

  const handleAddFormDataSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('name', name);
      categoryImage && formData.append('podCatImage', categoryImage);

      console.log(formData.get('name'));
      console.log(formData.get('podCatImage'));

      const send = await apiPost('/api/podcast/creatPodcastCategory', formData);

      send && toast.success('Category Added Succefully ');

      setPdcategoryImage(null);
      setName('');
    } catch (error) {
      console.log(error);
    }
  };

  const getDate = (catD: string) => {
    return new Date(catD).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <React.Fragment>
      <div className={adminStyle.tableContainer}>
        <form onSubmit={handleAddFormDataSubmit}>
          <div className={adminStyle.mainContainer}>
            <input
              placeholder="Add Category Name"
              name="name"
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event?.target.value)
              }
            />
            {/* <label htmlFor="imageupload" className={adminStyle.label}>
                            <span >Select Image <AiFillCamera /></span> */}
            <input
              name="image"
              type="file"
              accept=".jpeg, .jpg, .png, .gif, .webp"
              required
              onChange={handleImgChange}
            />
            {/* </label> */}
            <button type="submit" disabled={uploadingData}>
              Add Podcast Category
            </button>
          </div>
        </form>
        <table className={adminStyle.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {podCategories &&
              podCategories.map((cat: any, index: number) => (
                <tr key={index}>
                  <td>{cat.name}</td>
                  <td>
                    <img
                      src={cat.categoryImage}
                      alt={`${cat.name}${cat.title}`}
                      className={adminStyle.smallimg}
                    />
                  </td>
                  <td>{getDate(cat.createdAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {uploadingData && <Loading />}
    </React.Fragment>
  );
};

export default PodcastCategoryAdmin;
