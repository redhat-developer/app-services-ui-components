import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ServiceAccountToolbar } from './ServiceAccountToolbar';

export default {
    title: "Components/ServiceAccount/Search",
    component: ServiceAccountToolbar,
    args: {
        filterSelected: 'description',
        filteredValue: [{ filterKey: 'owner', filterValue: [{ value: 'Hema', isExact: true }, { value: 'Suaysh', isExact: true }] }, { filterKey: 'description', filterValue: [{ value: 'Hema', isExact: false }] },
        { filterKey: 'clientid', filterValue: [{ value: 'srvc_acc', isExact: true }] }]
    },
} as ComponentMeta<typeof ServiceAccountToolbar>;

const Template: ComponentStory<typeof ServiceAccountToolbar> = (args) => (
    <ServiceAccountToolbar {...args} />
);

export const Toolbar = Template.bind({});
