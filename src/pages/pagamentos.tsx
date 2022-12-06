import React from 'react';
import { GetStaticProps } from 'next';

// import { Component } from "@styles/pages/pagamentos.styled";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Pagamentos",
    },
  };
};

const Pagamentos: React.FC = () => {
  return (
    <div>
      <div>Pagamentos</div>
    </div>
  );
};

export default Pagamentos;