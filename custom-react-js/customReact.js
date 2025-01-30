const root = document.getElementById("root");

// custom react component
const reactComponent = {
  type: "div",
  props: {
    className: "container",
    children: [
      {
        type: "h1",
        props: {
          children: "Hello World",
          style: { color: "red", textAlign: "center" },
        },
      },
      {
        type: "p",
        props: {
          children: "This is a custom react implementation",
          style: { color: "green" },
        },
      },
      {
        type: "a",
        props: {
          href: "https://www.google.com",
          target: "_blank",
          style: { color: "purple" },
          children: "Click here to visit, Google.com",
        },
      },
    ],
  },
  /**
   * HTML representation of the reactComponent
   * <div class="container">
   *  <h1 style="color: red; text-align: center;>Hello World</h1>
   *  <p style="color: green">This is a custom react implementation</p>
   *  <a style="color: purple" href="https://www.google.com" target="_blank">Click here to visit, Google.com</a>
   * </div>
   */
};

// render function
function render(element, container) {
  const domElement = document.createElement(element.type); // create element

  if (element.props.className) domElement.className = element.props.className; // set class name

  if (element.props.style) {
    // check if style is present
    for (const styleName in element.props.style) {
      // loop through the style object
      domElement.style[styleName] = element.props.style[styleName]; // set style
    }
  }

  if (element.props.href) domElement.setAttribute("href", element.props.href); // set href

  if (element.props.target)
    domElement.setAttribute("target", element.props.target); // set target

  // loop through the children and append them to the parent element
  for (const prop in element.props.children) {
    if (typeof element.props.children[prop] === "object") {
      // if the child is an object, then call the render function recursively
      render(element.props.children[prop], domElement); // recursive call
    } else {
      // if the child is a string, then create a text node and append it to the parent element
      const textNode = document.createTextNode(element.props.children[prop]); // create text node
      domElement.appendChild(textNode); // append text node to the parent element
    }
  }
  container.appendChild(domElement); // append the parent element to the container
}

// render function with optimization
function renderOptimized(element, container) {
  if (!element || typeof element !== "object") return; // check if element is an object
  if (!element.type) throw new Error("Invalid Element type"); // check if element type is present

  // create a text node if the element type is text else create an element
  const domElement =
    element.type === ("text" || "TEXT_ELEMENT")
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type);

  // loop through the props and set style, attributes and event listeners
  Object.keys(element.props || {}).forEach((prop) => {
    if (prop === "children") return; // skip children

    if (prop === "style" && typeof element.props.style === "object") {
      // check if style is present
      Object.keys(element.props.style).forEach((styleName) => {
        // loop through the style object
        domElement.style[styleName] = element.props.style[styleName]; // set style
      });
    } else if (prop.startsWith("on")) {
      // check if event listener is present
      const eventName = prop.toLowerCase().substring(2); // get the event name; e.g., onClick -> click
      document.addEventListener(eventName, element.props[prop]); // add event listener
    } else {
      // set attributes
      domElement.setAttribute(prop, element.props[prop]); // set attribute
    }
  });

  // check if children is an array or not else convert it to an array
  const children = Array.isArray(element.props.children)
    ? element.props.children
    : [element.props.children];

  // loop through the children and check if it is an object and call the renderOptimized function recursively
  children.forEach((child) => {
    if (typeof child === "object") {
      // check if child is an object
      renderOptimized(child, domElement); // recursive call
    } else {
      // if child is a string, then create a text node and append it to the parent element
      domElement.appendChild(document.createTextNode(child)); // create text node and append it to the parent element
    }
  });

  container.appendChild(domElement); // append the parent element to the container
}

render(reactComponent, root); // render the custom react component
renderOptimized(reactComponent, root); // render the custom react component with optimization
