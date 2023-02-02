import React from "react";
import { DataContext } from "../../useContext";
import { AllContext } from "../../useContext/interface";
import { Link } from "react-router-dom";

function AccountType() {
  const { user } = React.useContext(DataContext) as AllContext;
  const isPremium = user.is_premium === true ? "premium" : "Free";
  const role = user.role === "admin" ? `Admin` : `${isPremium}`;
  return (
    <>
      {user.is_premium ? (
        user.role == "admin" ? (
          <button>
            <Link to={"/admin-dashboard"}>Admin Dashboard</Link>
          </button>
        ) : (
          <button>
            <Link to={"/user-dashboard"}>{role}</Link>
          </button>
        )
      ) : (
        <>
          {user.is_premium ? (
            <button>
              <Link to={"/user-dashboard"}>{role}</Link>
            </button>
          ) : (
            <button>
              <Link to='/payment'> Go Premium</Link>
            </button>
          )}
        </>
      )}
    </>
  );
}

export default AccountType;
