import "@testing-library/jest-dom";
import failOnConsole from "jest-fail-on-console";
import "regenerator-runtime/runtime";

failOnConsole({
  silenceMessage: (errorMessage) => {
    // workarounds for the Select component setting state after unmount
    if (/at CloudRegionSelect/g.test(errorMessage)) {
      return true;
    }
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

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
