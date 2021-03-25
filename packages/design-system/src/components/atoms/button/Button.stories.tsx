import React, { ComponentProps } from "react";
import { Story } from "@storybook/react";
import Button from "./Button";
import Text from "../text/Text";

export default {
  title: "Button",
  component: Button,
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <div style={{ width: 200 }}>
    <Button {...args}>
      <Text>Button</Text>
    </Button>
  </div>
);

export const Base = Template.bind({});

Base.args = {
  onClick: () => {},
};
