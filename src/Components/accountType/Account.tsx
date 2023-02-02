import React from 'react';
import { DataContext } from '../../useContext';
import { AllContext } from '../../useContext/interface';

function Account() {
  const { user } = React.useContext(DataContext) as AllContext;
  const isPremium = user.is_premium === true ? 'premium' : 'Free';
  const role = user.role === 'admin' ? `Admin` : `${isPremium}`;
  return (
    <div>
      <h1> Account </h1>
    </div>
  );
}

export default Account;
