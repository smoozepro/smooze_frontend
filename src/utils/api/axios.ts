import axios from 'axios';
import config from '../config/config';

const baseUrl = `${config.VITE_SERVER_URL}`;
const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const apiGet = async (path: string) => {
  const signature = getToken();
  if (signature === null) {
    throw new Error('token not found');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${signature}`
    }
  };

  return await axios.get(`${baseUrl}${path}`, config);
};

export const apiPost = async (path: string, data: any) => {
  const signature = getToken();
  if (signature === null) {
    throw new Error('No token found');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${signature}`
    }
  };

  return await axios.post(`${baseUrl}${path}`, data, config);
};

export const apiPut = (path: string, data: any) => {
  const signature = localStorage.getItem('signature');
  if (signature === null) {
    return {
      Error: 'Signature not found.'
    };
  }
  const config = {
    headers: {
      Authorization: `Bearer ${signature}`
    }
  };

  return axios.put(`${baseUrl}${path}`, data, config);
};

export const apiPatch = async (path: string, data: any) => {
  const signature = getToken();
  if (signature === null) {
    throw new Error('No token found');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${signature}`
    }
  };

  return await axios.patch(`${baseUrl}${path}`, data, config);
};

export const apiDelete = async (path: string) => {
  const signature = localStorage.getItem('token');
  if (signature === null) {
    throw new Error('No token found');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${signature}`
    }
  };

  return await axios.delete(`${baseUrl}${path}`, config);
};

export const apiPostNoAuth = async (path: string, data: any) => {
  return await axios.post(`${baseUrl}${path}`, data);
};

export const apiPostWithImage = async (path: string, data: any) => {
  const signature = localStorage.getItem('signature');
  try {
    if (signature === null) {
      throw new Error('No token found');
    }

    return await axios({
      method: 'post',
      url: `${baseUrl}${path}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${signature}`
      }
    });
  } catch (err) {
    throw new Error('An error occured');
  }
};

export const apiPatchWithImage = async (path: string, data: any) => {
  const signature = localStorage.getItem('signature');
  try {
    if (signature === null) {
      throw new Error('No token found');
    }
    return await axios({
      method: 'patch',
      url: `${baseUrl}${path}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${signature}`
      }
    });
  } catch (err) {
    throw new Error('An error occured');
  }
};

export const apiAuth = async (path: string, data: any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return await axios.post(`${baseUrl}${path}`, data, config);
  } catch (error: any) {
    throw new Error('An error occured');
  }
};

export const getArtist = async (path: string) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return await axios.get(`${baseUrl}${path}`, config);
  } catch (error: any) {
    throw new Error('An error occured');
  }
};
