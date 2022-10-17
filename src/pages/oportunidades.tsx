import React from 'react';
import { GetStaticProps } from 'next';
import { Container } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import useOportunidades from 'data/hooks/pages/useOportunidades.page';

// import { Component } from "@styles/pages/oportunidades.styled";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Oportunidades",
    },
  };
};

const Oportunidades: React.FC = () => {
  const { oportunidades, isMobile } = useOportunidades();
  return (
    <Container sx={{ mb: 5, p: 0 }}>
      <PageTitle title="Oportunidades de trabalho" />
    </Container>
  );
};

export default Oportunidades;