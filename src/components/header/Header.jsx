import {
  faBed,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import Form from "./Form";
const Header = ({ type }) => {
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainerListMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <Form/>
        )}
      </div>
    </div>
  );
};

export default Header;
