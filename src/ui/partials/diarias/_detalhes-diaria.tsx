import { Container } from "@mui/material";
import React, { PropsWithChildren } from "react";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";

// import { Component } from "./_detalhes-diaria.styled";

const DetalhesDiaria: React.FC<PropsWithChildren<{ id: string }>> = ({ id }) => {
    return (
        <Container>
            <PageTitle title={`Detalhes da diária: #${id}`} />
        </Container>
    );
};

export default DetalhesDiaria;