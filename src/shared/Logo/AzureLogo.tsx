import type { FunctionComponent } from "react";
import { LogoAzure } from "../../images";

export const AzureLogo: FunctionComponent = () => {
  return (
    <>
      <img src={LogoAzure} alt={""} style={{ height: "60px" }} />
    </>
  );
};
