import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../components/Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Icon',
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/** The most simple verson of the icon that you can get. */
export const DiceIcon: Story = {
  args: {
    variant: "d20",
    size: 200,
  },
};

/** Note that this fill can be any tailwind color */
export const IconWithFill: Story = {
  args: {
    variant: "gear",
    size: 200,
    className: "fill-red-500"
  }
}
