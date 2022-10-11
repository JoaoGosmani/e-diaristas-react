import { Button } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Table, { TableCell, TableRow } from "./Table";

export default {
    title: "data-display/Table",
    component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});

interface TemplatePropInterface {
    data: string;
    tipo: string;
    comodos: number;
    cidade: string;
}

Default.args = {
    header: ["Data", "Tipo de Serviço", "Número de Cômodos", "Cidade", ""],
    data: [
        {
            data: "05/05/2022",
            tipo: "Limpeza de rotina",
            comodos: 4,
            cidade: "São Bernardo do Campo - SP",
        },
        {
            data: "05/05/2022",
            tipo: "Limpeza pesada",
            comodos: 2,
            cidade: "Santo André - SP",
        },
        {
            data: "05/05/2022",
            tipo: "Limpeza pós obra",
            comodos: 3,
            cidade: "São Bernardo do Campo - SP",
        },
    ] as TemplatePropInterface[],
    rowElement(_item, index) {
        const item = _item as TemplatePropInterface;
        return (
            <TableRow key={index}>
                <TableCell>
                    <strong>{item.data}</strong>
                </TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.comodos} cômodos</TableCell>
                <TableCell>{item.cidade}</TableCell>
                <TableCell>
                    <Button>Visualizar</Button>
                </TableCell>
            </TableRow>
        );
    },   
};