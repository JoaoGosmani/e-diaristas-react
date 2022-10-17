import React from 'react';
import { GetStaticProps } from 'next';
import { Button, Container, Typography } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import useOportunidades from 'data/hooks/pages/useOportunidades.page';
import DataList from 'ui/components/data-display/DataList/DataList';
import { TextFormatService } from 'data/services/TextFormatService';
import Table, { TableCell, TablePagination, TableRow } from 'ui/components/data-display/Table/Table';

// import { Component } from "@styles/pages/oportunidades.styled";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Oportunidades",
    },
  };
};

const Oportunidades: React.FC = () => {
  const { 
    oportunidades, 
    isMobile, 
    totalComodos,
    podeCandidatar, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    itemsPerPage, 
  } = useOportunidades();

  return (
    <Container sx={{ mb: 5, p: 0 }}>
      <PageTitle title="Oportunidades de trabalho" />

      {oportunidades ? (
        isMobile ? (
          oportunidades.map((oportunidade) => {
            return (
              <DataList 
                key={oportunidade.id}
                header={
                  <>
                    Data:{" "}
                    {TextFormatService.reverseDate(
                      oportunidade.data_atendimento as string
                    )}
                    <br />
                    {oportunidade.nome_servico}
                    <br />
                    {TextFormatService.currency(oportunidade.preco)}
                  </>
                } 
                body={
                  <>
                    Cidade: {oportunidade.cidade}
                    <br />
                    Número de cômodos: {totalComodos(oportunidade)}
                  </>
                }
                actions={
                  <>
                    {podeCandidatar(oportunidade) && (
                      <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => {}}
                      >
                        Se candidatar
                      </Button>
                    )}
                  </>
                }
              />
            )
          })
        ) : (
          <>
            <Table 
              header={[
                "Data",
                "Tipo de Serviço",
                "Número de Cômodos",
                "Cidade",
                "Valor",
                "",
              ]}
              data={oportunidades}
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
                  <TableCell>{item.nome_servico}</TableCell>
                  <TableCell>{totalComodos(item)} cômodos</TableCell>
                  <TableCell>
                    {item.cidade} - {item.estado}
                  </TableCell>
                  <TableCell>{TextFormatService.currency(item.preco)}</TableCell>
                  <TableCell>
                    {podeCandidatar(item) && (
                      <Button onClick={() => {}}>Se candidatar</Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            />
            <TablePagination 
              count={totalPages}
              page={currentPage}
              onChange={(_event, nextPage) => setCurrentPage(nextPage)}
            />
          </>
        )
      ) : (
        <Typography align="center">Nenhuma oportunidade ainda</Typography>
      )}
    </Container>
  );
};

export default Oportunidades;