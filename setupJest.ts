import "@testing-library/jest-dom";
import "core-js/stable";
import failOnConsole from "jest-fail-on-console";
import "regenerator-runtime/runtime";

failOnConsole({
  silenceMessage: (errorMessage) => {
    if (/at AsyncTypeaheadSelect/g.test(errorMessage)) {
      return true;
    }
    if (/at SelectGroup/g.test(errorMessage)) {
      return true;
    }
    if (/at Select/g.test(errorMessage)) {
      return true;
    }
    if (/at Popover/g.test(errorMessage)) {
      return true;
    }
    return false;
  },
});
