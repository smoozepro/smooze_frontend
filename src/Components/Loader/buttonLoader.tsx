import React from 'react';
import loadcss from './button.module.css';
function ButtonLoader() {
  return (
    <>
      <span className={loadcss.loadBtn}></span>
    </>
  );
}

export default ButtonLoader;
