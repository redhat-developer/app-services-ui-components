import type { FunctionComponent } from "react";
import { LogoGCP } from "../../images";

export const GCPLogo: FunctionComponent = () => {
  return (
    <>
      <img src={LogoGCP} alt={""} style={{ height: "60px" }} />
    </>
  );
};
