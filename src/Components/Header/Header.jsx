import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../store/FirebaseContext";
import { signOut } from "firebase/auth";
import SearchContext from "../../store/searchContext";

function Header() {
  const {searchValue,setSearchValue} = useContext(SearchContext)
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              onChange={(e)=>{
                setSearchValue(e.target.value);
              }}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span>{`Hi ${user.displayName}`}</span>
          ) : (
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          )}

          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              signOut(auth).then(() => {
                navigate("/login");
              });
            }}
          >
            Logout
          </span>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            {user ? (
              <span
                onClick={() => {
                  navigate("/create");
                }}
              >
                SELL
              </span>
            ) : (
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                SELL
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
