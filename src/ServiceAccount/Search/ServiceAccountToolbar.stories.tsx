import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ServiceAccountToolbar } from './ServiceAccountToolbar';

export default {
    title: "Components/ServiceAccount/Search",
    component: ServiceAccountToolbar,
    args: {
        filterSelected: 'description',
        filteredValue: []
    },
} as ComponentMeta<typeof ServiceAccountToolbar>;

const Template: ComponentStory<typeof ServiceAccountToolbar> = (args) => (
    <ServiceAccountToolbar {...args} />
);

export const ToolbarFilter = Template.bind({});


export const FilterValue = Template.bind({});
FilterValue.args = {
    filterSelected: 'owner',
    filteredValue: [{ filterKey: 'owner', filterValue: [{ value: 'Hema', isExact: true }] }, { filterKey: 'description', filterValue: [{ value: 'Hema', isExact: false }] },
    { filterKey: 'clientid', filterValue: [{ value: 'srvc_acc', isExact: true }] }]
}

export const MaxfilterOn = Template.bind({})
MaxfilterOn.args = {
    filterSelected: 'owner',
    isMaxFilter: true
}