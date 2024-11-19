import { Meta, StoryObj } from "@storybook/react";
import CharacterCard from "../components/CharacterCard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Character Card',
  component: CharacterCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 
A Card that is desgined to display character information in a visually appealing and compact way.
*/
export const DefaultInput: Story = {
  args: {
    character: {
      name : "Tolskir Snowtreader",
      level : 5,
      class : "Barbarian",
      ancestry : "Dwarf",
      campaign : "Radiant Dawn",
      image : {image : "test_character.png", x_offset: 90, scale:200}
    }
  },
};