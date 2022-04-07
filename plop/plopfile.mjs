export default function (plop) {
  // create your generators here

  plop.setGenerator("react_component", {
    prompts: [
      {
        type: "input",
        name: "componentName",
        message: "component name",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "../src/components/{{componentName}}",
        base: `./templates/react_component`,
        templateFiles: "./templates/react_component/*.*.hbs",
        force: true,
        verbose: true,
        transform: (file) => {
          return file;
        },
      },
    ],
  });
}
