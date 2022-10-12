import { Box, CircularProgress, Container } from "@mui/material";
import useDetalhesDiaria from "data/hooks/pages/diarias/useDetalhesDiaria.page";
import { DateService } from "data/services/DateService";
import { DiariaService } from "data/services/DiariaService";
import { TextFormatService } from "data/services/TextFormatService";
import React, { PropsWithChildren } from "react";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import Status from "ui/components/data-display/Status/Status";
import { CardsContainer, JobDetails, JobTitle } from "./_detalhes-diaria.styled";

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
            <CardsContainer>
                <JobDetails>
                    <JobTitle>Detalhes da diária</JobTitle>
                    <Box sx={{ mb: 2 }}>
                        Status:
                        <Status colors={DiariaService.getStatus(diaria.status!).color}>
                            {DiariaService.getStatus(diaria.status!).label}
                        </Status>
                    </Box>
                    <div>
                        Data:{" "}
                        <strong>
                            {TextFormatService.reverseDate(diaria.data_atendimento as string)}
                        </strong>
                        <br />
                        Horário:{" "}
                        <strong>
                            {DateService.getTimeFromDate(diaria.data_atendimento as string)}
                        </strong>
                        <br />
                        Endereço: <strong>{TextFormatService.getAddress(diaria)}</strong>
                    </div>
                </JobDetails>
            </CardsContainer>
        </Container>
    );
};

export default DetalhesDiaria;