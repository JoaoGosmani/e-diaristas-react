import { Button, Container, Typography } from "@mui/material";
import { GetStaticProps } from 'next';
import usePagamentos from "data/hooks/pages/usePagamentos.page";
import { PaymentService } from "data/services/PaymentService";
import { TextFormatService } from "data/services/TextFormatService";
import React, { PropsWithChildren } from "react";
import DataList from "ui/components/data-display/DataList/DataList";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import Status from "ui/components/data-display/Status/Status";
import Table, {
  TableCell,
  TablePagination,
  TableRow
} from "ui/components/data-display/Table/Table";
import { ButtonsContainer } from "ui/partials/diarias/_minhas-diarias.styled";

// import { Component } from "@styles/pages/_pagamentos.styled";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Pagamentos",
    },
  };
};

const Pagamentos: React.FC<PropsWithChildren> = () => {
  const { 
    isMobile, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    itemsPerPage,
    filteredData, 
    filtro,
    alterarFiltro,
  } = usePagamentos();
  return (
    <Container sx={{ mb: 5, p: 0 }}>
      <PageTitle title="Pagamentos" />

      <ButtonsContainer>
        <Button 
          onClick={() => alterarFiltro("pago")}
          variant={filtro === "pago" ? "contained" : "outlined"}
        >
          Pago
        </Button>
        <Button 
          onClick={() => alterarFiltro("aguardando")}
          variant={filtro === "aguardando" ? "contained" : "outlined"}
        >
          Aguardando transferência
        </Button>
      </ButtonsContainer>

        {filteredData.length > 0 ? (
          isMobile ? (
            <>
              {filteredData.map((diaria) => {
                return (
                  <DataList 
                    key={diaria.id}
                    header={
                      <>
                        Data:
                        {TextFormatService.reverseDate(
                          diaria.created_at as string
                        )}
                      </>
                    }
                    body={
                      <>
                        Status: {PaymentService.getStatus(diaria.status!).label}
                        <br />
                        Valor diária: {TextFormatService.currency(diaria.valor)}
                        <br />
                        Valor depósito: 
                        {TextFormatService.currency(diaria.valor)}
                      </>
                    }
                  />
                )
              })}
            </>
          ) : (
            <>
              <Table 
                header={["Data", "Status", "Valor da Diária", "Valor do Depósito"]}
                data={filteredData}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                rowElement={(item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <strong>
                        {TextFormatService.reverseDate(item.created_at)}
                      </strong>
                    </TableCell>
                    <TableCell>
                      <Status colors={PaymentService.getStatus(item.status!).color}>
                        {PaymentService.getStatus(item.status!).label}
                      </Status>
                    </TableCell>
                    <TableCell>
                      {TextFormatService.currency(item.valor)}
                    </TableCell>
                    <TableCell>
                      {TextFormatService.currency(item.valor_deposito)}
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

export default Pagamentos;