import { Meta, StoryObj } from "@storybook/react";
import Input from "../components/input/Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Input Field',
  // decorators : [
  //   (story) => (
  //     <div>
  //       {story()}
  //     </div>
  //   )
  // ],
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The input component is used for taking in text input from the user. It will have all 
    of the same props as a normal input field., plus some extra.
*/
export const DefaultInput: Story = {
  args: {width: "12rem", placeholder: "test", type: "email"},
};