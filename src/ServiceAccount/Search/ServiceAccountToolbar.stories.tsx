import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ServiceAccountToolbar } from './ServiceAccountToolbar';

export default {
  title: "Components/ServiceAccount/Search",
  component: ServiceAccountToolbar,
  args: {
    filteredValue: []
  },
} as ComponentMeta<typeof ServiceAccountToolbar>;

const Template: ComponentStory<typeof ServiceAccountToolbar> = (args) => (
  <ServiceAccountToolbar {...args} />
);

export const ServiceAccountToolbarFilter = Template.bind({});
ServiceAccountToolbarFilter.parameters = {
  docs: {
    description: {
      story: `
ToolbarFilter for ServiceAccount Search/filter functionality
        `,
    },
  },
};

export const InvalidClientIdInput = Template.bind({});
InvalidClientIdInput.args = {
  filterSelected: 'clientID',
  value: 'Hema HG',
  filteredValue: []
};
InvalidClientIdInput.storyName = 'Invalid Input error message when the filter selected is clientID';
InvalidClientIdInput.parameters = {
  docs: {
    description: {
      story: `
When the clienttID filter is selected if the input filed is not valid Input Invalid error message 
will be displayed and the search icon button is disabled
        `,
    },
  },
};

export const InvalidOwnerInput = Template.bind({})
InvalidOwnerInput.args = {
  filterSelected: 'owner',
  value: 'Hema HG',
  filteredValue: []
};
InvalidOwnerInput.storyName = 'Invalid Input error message when the filter selected is owner';
InvalidOwnerInput.parameters = {
  docs: {
    description: {
      story: `
When the Owner filter is selected if the input filed is not valid Input Invalid error message 
will be displayed and the search icon button is disabled 
        `,
    },
  },
};


export const MaxFilterMessage = Template.bind({})
MaxFilterMessage.args = {
  isMaxFilter: true
};
MaxFilterMessage.storyName = 'Error message when maximum filter search is reached';
MaxFilterMessage.parameters = {
  docs: {
    description: {
      story: `
When the Filter reaches the Maximum limit, Maximum limit error message will be displayed 
and the search icon button is disabled 
        `,
    },
  },
};
