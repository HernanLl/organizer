import React from "react";
import "./ThemeSelector.scss";

export default function ThemeSelector(props) {
  const { changeTheme, theme } = props;

  return (
    <div className="theme-selector">
      <div className="theme-selector__theme" onClick={() => changeTheme(0)}>
        <div
          className={`theme-selector__filter ${
            theme === 0 && "theme-selector__filter--active"
          }`}
        ></div>
        <div className="img bg-1"></div>
      </div>
      <div className="theme-selector__theme" onClick={() => changeTheme(1)}>
        <div
          className={`theme-selector__filter ${
            theme === 1 && "theme-selector__filter--active"
          }`}
        ></div>
        <div className="img bg-2"></div>
      </div>
      <div className="theme-selector__theme" onClick={() => changeTheme(2)}>
        <div
          className={`theme-selector__filter ${
            theme === 2 && "theme-selector__filter--active"
          }`}
        ></div>
        <div className="img bg-3"></div>
      </div>
    </div>
  );
}
