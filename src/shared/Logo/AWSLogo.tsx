import type { FunctionComponent } from "react";
import { LogoAWS } from "../../images";

export const AWSLogo: FunctionComponent = () => {
  return (
    <>
      <img src={LogoAWS} alt={""} style={{ height: "60px" }} />
    </>
  );
};
