import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api"
import Modal from "../components/Modal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Modal',
  component: Modal,
  
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The input component is used for taking in text input from the user. It will have all 
    of the same props as a normal input field., plus some extra.
*/
export const DefaultModal: Story = {
  args: {
    active: false,
  },
  render: (args) => {
    const [{ active }, updateArgs] = useArgs();
    
    const setActive = (value: boolean) => {
      updateArgs({active : value});
    }
    
    return (
      <>
        <button className="border p-2 rounded-md w-16 text-nowrap" onClick={() => setActive(true)}>Open Modal</button>
        <Modal active={active} setActive={setActive}>
          <div className="w-[80vw] bg-theme-background border border-white p-4 rounded-lg">
            <h1>Modal</h1>
            <p>Modal content</p>
          </div>
        </Modal>
      </>
    )
  },
};