import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DevelopmentPreview, DevelopmentPreviewProps } from './DevelopmentPreview';
import DevelopmentPreviewI18N from "./DevelopmentPreview-i18n.json";

export default {
    title: "Components/DevelopmentPreview",
    component: DevelopmentPreview,
    args: {
        show: true,
    },
    parameters: {
        i18n: DevelopmentPreviewI18N,
    },
} as ComponentMeta<typeof DevelopmentPreview>;


const Template: ComponentStory<typeof DevelopmentPreview> = (args) => (
    <DevelopmentPreview {...args} />
);

export const showDevPreview = Template.bind({});
showDevPreview.args = {};