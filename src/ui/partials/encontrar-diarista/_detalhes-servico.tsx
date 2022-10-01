import { Typography } from "@mui/material";
import { ServicoInterface } from "data/@types/ServicoInterface";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ToggleButtonGroup, {
    ToggleButton,
} from "ui/components/inputs/ToggleButtonGroup/ToggleButtonGroup";
import { AddressForm } from "ui/components/inputs/UserForm/UserForm";

// import { Component } from "./_detalhes-servico.styled";

interface DetalhesServicoProps {
    servicos?: ServicoInterface[];
}

const DetalhesServico: React.FC<DetalhesServicoProps> = ({ servicos = [] }) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    return (
        <div>
            <Typography sx={{ fontWeight: "bold", pb: 2 }}>
                Qual tipo de limpeza você precisa?
            </Typography>
            <Controller 
                name={"faxina.servico"}
                defaultValue={servicos[0]?.id}
                control={control}
                render={({ field }) => (
                    <ToggleButtonGroup
                        exclusive
                        value={field.value}
                        onChange={(_event, value) =>
                            field.onChange(value ?? servicos[0]?.id)
                        }
                    >
                        {servicos.map((servico) => (
                            <ToggleButton key={servico.id} value={servico.id}>
                                <i className={servico.icone ?? "twf-cleaning-1"} />
                                {servico.nome}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                )}
            />
            <AddressForm />
        </div>
    );
};

export default DetalhesServico;