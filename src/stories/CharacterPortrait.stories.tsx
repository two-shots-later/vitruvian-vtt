import type { Meta, StoryObj } from '@storybook/react';
import CharacterPortrait from '../components/ChracterPortrait';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Character Portrait',
  component: CharacterPortrait,
  decorators:[
    (story) => {
      return <div className='w-[80vw]'>{story()}</div>
    }
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterPortrait>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileImage: Story = {
  args: {
    image : {image : "test_character.png", x_offset: 7, y_offset: -2, scale: 300}
  },
};
export const EyeIcon: Story = {};
export const MoonIcon: Story = {
  args: {
    icon: 'moon',
  },
};

