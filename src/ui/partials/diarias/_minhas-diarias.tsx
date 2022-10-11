import { Button, Container, Typography } from "@mui/material";
import useMinhasDiarias from "data/hooks/pages/diarias/useMinhasDiarias.page";
import { DiariaService } from "data/services/DiariaService";
import { TextFormatService } from "data/services/TextFormatService";
import React, { PropsWithChildren } from "react";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import Status from "ui/components/data-display/Status/Status";
import Table, { TableCell, TablePagination, TableRow } from "ui/components/data-display/Table/Table";
import Link from "ui/components/navigation/Link/Link";

// import { Component } from "./_minhas-diarias.styled";

const MinhasDiarias: React.FC<PropsWithChildren> = () => {
    const { 
        isMobile, 
        currentPage, 
        setCurrentPage, 
        totalPages, 
        itemsPerPage,
        filteredData,
    } = useMinhasDiarias();
    return (
        <Container sx={{ mb: 5, p: 0 }}>
            <PageTitle title="Minhas diárias" />
            {filteredData.length > 0 ? (
                isMobile ? (
                    ""
                ) : (
                    <>
                        <Table 
                            header={["Data", "Status", "Tipo de Serviço", "Valor", "", ""]}
                            data={filteredData}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            rowElement={(item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <strong>
                                            {TextFormatService.reverseDate(
                                                item.data_atendimento as string
                                            )}
                                        </strong>
                                    </TableCell>
                                    <TableCell>
                                        <Status colors={DiariaService.getStatus(item.status!).color}>
                                            {DiariaService.getStatus(item.status!).label}
                                        </Status>
                                    </TableCell>
                                    <TableCell>{item.nome_servico}</TableCell>
                                    <TableCell>{TextFormatService.currency(item.preco)}</TableCell>
                                    <TableCell>
                                        <Link href="">Detalhes</Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button color={"error"}>Cancelar</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        />
                        <TablePagination 
                            count={totalPages}
                            page={currentPage}
                            onChange={(_evt, nextPage) => setCurrentPage(nextPage)}
                        />  
                    </>
                    
                )
            ) : (
                <Typography align="center">Nenhuma diária ainda</Typography>
            )}
        </Container>
    );
};

export default MinhasDiarias;