import type { FunctionComponent } from "react";
import { LogoRedhat } from "../../images";

export const RedhatLogo: FunctionComponent = () => {
  return (
    <>
      <img src={LogoRedhat} alt={""} style={{ height: "60px" }} />
    </>
  );
};
