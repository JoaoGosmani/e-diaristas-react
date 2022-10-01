import React, { PropsWithChildren } from "react";
import { AddressForm } from "ui/components/inputs/UserForm/UserForm";

// import { Component } from "./_detalhes-servico.styled";

const DetalhesServico: React.FC<PropsWithChildren> = () => {
    return (
        <div>
            <AddressForm />
        </div>
    );
};

export default DetalhesServico;