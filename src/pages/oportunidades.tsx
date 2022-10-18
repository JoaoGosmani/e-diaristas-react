import React from 'react';
import { GetStaticProps } from 'next';
import { Button, Container, Divider, Typography } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import useOportunidades from 'data/hooks/pages/useOportunidades.page';
import DataList from 'ui/components/data-display/DataList/DataList';
import { TextFormatService } from 'data/services/TextFormatService';
import Table, { TableCell, TablePagination, TableRow } from 'ui/components/data-display/Table/Table';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';

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

      <Dialog
        isOpen={false}
        onClose={() => {}}
        title={"Se candidatar à diária"}
        subtitle={"Tem certeza que deseja se candidatar à diária abaixo?"}
      >
        <div>
          <JobInformation>
            <>
              <div>
                Data: <strong>01/01/2022</strong>
              </div>
              <div>Endereço:</div>
              <div>
                <strong>Valor: R$ 140,00</strong>
              </div>
            </>
          </JobInformation>
        </div>

        <UserInformation name="João Vitor" rating={3} picture={""} />
        <Divider />
        <Typography sx={{ p: 3, fontWeight: "medium", bgcolor: "grey.50" }}>
          Últimas avaliações do cliente
        </Typography>
        <UserInformation 
          name="João Vitor" 
          rating={3} 
          picture={""} 
          isRating={true}
        />
        <Typography 
          sx={{ py: 2 }}
          variant={"subtitle2"}
          color={"textSecondary"}
        >
          Ao se candidatar você ainda não é o(a) diarista escolhido(a) para
          realizar o trabalho. Vamos analisar suas qualificações e a distância
          para o local da diária. Caso você seja a pessoa selecionada, receberá 
          um email avisando. Atente-se à sua caixa de entrada! 
        </Typography>
      </Dialog> 
        
      
    </Container>
  );
};

export default Oportunidades;