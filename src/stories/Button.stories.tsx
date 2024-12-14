import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The input component is used for taking in text input from the user. It will have all 
    of the same props as a normal input field., plus some extra.
*/
export const DefaultButton: Story = {
  args: {onClick: () => window.alert("You clicked the button!"), children: "Test", size: "large"},
};