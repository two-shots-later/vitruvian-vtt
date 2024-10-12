import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import EntityTable from '../components/entityTable/EntityTable';
import EntityTableHeader from '../components/entityTable/EntityTableHeader';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'EntityTable',
  component: EntityTable,
  // decorators:[
  //   (story) => {
  //     return <div className='w-[80vw] bg-theme-background p-8'>{story()}</div>
  //   }
  // ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof EntityTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Here is a basic Table rendered  */
export const Simple: Story = {
  render: ({data, label, icon}) => (
    <EntityTable label={label} data={data} icon={icon}>
      <EntityTableHeader component='Name' width='150px'/>
      <EntityTableHeader component='Damage' width='150px'/>
    </EntityTable>
  ),
  args: {
    label : 'Example Title',
    icon: 'gear',
    data: [
      {Name: 'Sword', Damage: "D10"},
      {Name: 'Axe', Damage: "D12"},
      {Name: 'Bow', Damage: "D8"},
    ]
  }
};