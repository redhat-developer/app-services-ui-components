import "@testing-library/jest-dom";
import failOnConsole from "jest-fail-on-console";

failOnConsole({
  silenceMessage: (errorMessage) => {
    if (/at SelectGroup/.test(errorMessage)) {
      return true;
    }
    return false;
  },
});
