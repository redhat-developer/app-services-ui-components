const { addons, makeDecorator } = require("@storybook/addons");
const { useEffect } = require("react");
const { EVENTS } = require("./constants");

const withOUIA = makeDecorator({
  name: "withOUIA",
  parameterName: "ouia",
  wrapper: (storyFn, context, { id }) => {
    const channel = addons.getChannel();

    const updateNodes = () => {
      const els = document.querySelectorAll("[data-ouia-component-id]");
      const nodes = Array.from(els).map((el) => {
        return {
          id: el.attributes.getNamedItem("data-ouia-component-id").value,
          type: el.attributes.getNamedItem("data-ouia-component-type").value,
          selector: generateSelector(el),
        };
      });
      channel.emit(EVENTS.RENDERED, {
        nodes: Array.from(nodes),
      });
    };

    useEffect(() => {
      const interval = setInterval(updateNodes, 1000);
      return () => clearInterval(interval);
    }, []);
    return storyFn(context);
  },
});

function generateSelector(context) {
  let pathSelector = "",
    localName;

  if (context == "null") throw "not an dom reference";

  while (context.tagName) {
    // selector path

    const ouiaID = context.attributes.getNamedItem("data-ouia-component-id");

    if (ouiaID) {
      pathSelector =
        `[data-ouia-component-id=${ouiaID.value}]` +
        (pathSelector ? " " + pathSelector : "");
    }
    context = context.parentNode;
  }
  return pathSelector;
}

module.exports = { withOUIA };
