import { Meta, StoryObj } from "@storybook/react";
import TextFit from "../components/TextFit";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'TextFit',
  component: TextFit,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof TextFit>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 
    This is a component that will size the text to fix inside of it's parent. It doesn't
    do this calculation on rerenders, just resizing of the parrent.
*/
export const DefaultInput: Story = {
  args : {
    children: "This text will size to fit in the box"
  },
  render: (args) => (
    <div className="flex flex-col justify-center items-center border border-white rounded-lg bg-theme-background overflow-hidden w-[80vw] h-32">
      <TextFit minFontSize={0} maxFontSize={72} padding={{ x: 20, y: 0 }}>{ args.children }</TextFit>
    </div>
  )
};