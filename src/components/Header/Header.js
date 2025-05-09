import React from "react";
import "./Header.scss";
import TopBar from "./TopBar/TopBar";
import Menu from "./Menu";

export default function Header() {
  return (
    <div className="header">
      <TopBar />
      <Menu />
    </div>
  );
}
