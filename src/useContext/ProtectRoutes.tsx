import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export const clearAllStorage = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.localStorage.clear();
};

const ClearStorageAndRedirect = () => {
  const location = useLocation();
  toast.error('Please log in.', { toastId: 'autherror' });
  clearAllStorage();
  return <Navigate to="/" state={{ from: location }} />;
};

export const checkLoginStatus = () => {
  let isAuthenticated: string | any = (localStorage.getItem('token') ||
    sessionStorage.getItem('token')) as any;
  isAuthenticated = isAuthenticated?.trim();
  if (isAuthenticated === null || isAuthenticated === undefined) {
    return false;
  } else {
    return true;
  }
};

const ProtectAuthRoute = ({
  playerBarProtect
}: {
  playerBarProtect?: boolean;
}) => {
  const isAuthenticated = checkLoginStatus();
  console.log(isAuthenticated);
  return (
    <>
      {isAuthenticated === true ? (
        <Outlet />
      ) : playerBarProtect === true ? (
        <></>
      ) : (
        <ClearStorageAndRedirect />
      )}
    </>
  );
};

export const ProtectAdminRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem('user');
  if (user === null) {
    return <ClearStorageAndRedirect />;
  } else {
    const userObj = JSON.parse(user);
    if (userObj.role !== 'admin') {
      return <ClearStorageAndRedirect />;
    } else {
      return children;
    }
  }
};

export default ProtectAuthRoute;
