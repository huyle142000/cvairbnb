import React, { useEffect } from "react";

export default function SpinnerLoading() {
  useEffect(() => {
    let bodyDiv = document.querySelector("body");
    bodyDiv.classList.add("overflow");
    return () => {
      bodyDiv.classList.remove("overflow");
    };
  }, []);
  return (
    <div className="spinner_load">
      <div className="wrap_spinner" alt="">
        <div className="img_spinner"></div>
      </div>
    </div>
  );
}
