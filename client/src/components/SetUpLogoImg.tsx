import React from "react";
import BigLogo from "../Images/1440x1440Logo.png";

type SetUpLogoImgProps = {
  setSetupLogoShown: Function;
};

function SetUpLogoImg({ setSetupLogoShown }: SetUpLogoImgProps) {
  return (
    <div
      onClick={() => setSetupLogoShown(false)}
      className="setup-logo-container fade-out"
    >
      <img src={BigLogo} className="setup-logo" alt="" />
    </div>
  );
}

export default SetUpLogoImg;
