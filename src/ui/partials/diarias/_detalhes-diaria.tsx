import { CircularProgress, Container } from "@mui/material";
import useDetalhesDiaria from "data/hooks/pages/diarias/useDetalhesDiaria.page";
import React, { PropsWithChildren } from "react";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";

// import { Component } from "./_detalhes-diaria.styled";

const DetalhesDiaria: React.FC<PropsWithChildren<{ id: string }>> = ({ id }) => {
    const { cliente, diaria, diarista } = useDetalhesDiaria(id);

    if (!diaria?.id) {
        return (
            <Container sx={{ textAlign: "center", my: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <PageTitle title={`Detalhes da diária: #${id}`} />
        </Container>
    );
};

export default DetalhesDiaria;