import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../useContext';
import { AllContext } from '../../useContext/interface';

function SocilaOAuth() {
  const navigate = useNavigate();
  const { setToken, getUser } = useContext(DataContext) as AllContext;
  const searchParams = new URLSearchParams(document.location.search);
  const token = searchParams.get('token');
  const getAndSetToken = async () => {
    if (token !== null && token !== 'error') {
      setToken(token);
      await getUser();
      navigate('/user-dashboard');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    getAndSetToken();
  }, []);

  return null;
}

export default SocilaOAuth;
