import React from "react";

function Header() {
  const redirectToHome = () => {
    window.location.href = "/";
  };
  return (
    <div className="header" onClick={redirectToHome}>
      <img src="logo.png" height={80} width={80} />
    </div>
  );
}

export default Header;
