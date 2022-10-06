import React from 'react';
import { GetStaticProps } from 'next';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { Container, Typography } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { LoginButton, LoginContainer } from "@styles/pages/login.styled";
import { LoginForm } from 'ui/components/inputs/UserForm/forms/LoginForm';
import { FormProvider } from 'react-hook-form';
import useLogin from 'data/hooks/pages/useLogin.page';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Login",
    },
  };
};

const Login: React.FC = () => {
  const { formMethods, onSubmit } = useLogin();
  return (
    <FormProvider {...formMethods}>
      <SafeEnvironment />
      <Container>
        <PageTitle title="Informe seu e-mail e senha" />
        <LoginContainer as={"form"}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <LoginForm />

          <Typography color={"error"} align={"center"}>
            Erro
          </Typography>
          <LoginButton
            size={"large"}
            variant={"contained"}
            color={"secondary"}
            type={"submit"}
          >
            Entrar
          </LoginButton>
        </LoginContainer>
      </Container>
    </FormProvider>
  );
};

export default Login;