import { render } from "../../test-utils";
import { ExternalLink } from "./ExternalLink";

describe("ExternalLink", () => {
  it("to render", () => {
    const comp = render(
      <ExternalLink href={"test-href"} testId={"test-id"} target={"_self"} />
    );
    const link = comp.getByTestId("test-id");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "test-href");
    expect(link).toHaveAttribute("target", "_self");
  });
});
