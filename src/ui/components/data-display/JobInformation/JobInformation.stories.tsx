import { ComponentMeta, ComponentStory } from "@storybook/react";

import JobInformation from "./JobInformation";

export default {
    title: "data-display/JobInformation",
    component: JobInformation,
} as ComponentMeta<typeof JobInformation>;

const Template: ComponentStory<typeof JobInformation> = (args) => (
    <JobInformation {...args} /> 
);

export const Default = Template.bind({});

Default.args = {
    children: (
        <div>
            <div>
                Data: <strong>05/05/2022 às 08:00</strong>
            </div>
            <div>Endereço: Av. Paulista, 1100 - Centro, São Paulo - SP</div>
            <div>
                <strong>Valor: R$ 185,00</strong>
            </div>
        </div>
    )
};