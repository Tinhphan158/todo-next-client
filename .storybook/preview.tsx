import * as React from "react";
import "../app/globals.css";

const preview = {
  decorators: [(Story) => <Story />],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
} satisfies NonNullable<
  import("@storybook/nextjs-vite").StorybookConfig["preview"]
>;

export default preview;
