import { Container, Snackbar } from '@mui/material';
import { FormFieldsContainer, LoginButton } from '@styles/pages/recuperar-senha.styled';
import { useRecuperarSenha } from 'data/hooks/pages/useRecuperarSenha';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import PasswordStrength from 'ui/components/feedback/PasswordStrength/PasswordStrength';
import TextField from 'ui/components/inputs/TextField/TextField';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "RecuperarSenha",
    },
  };
};

const RecuperarSenha: React.FC = () => {
  const router = useRouter();
  const {
    email,
    setEmail,
    mensagemSnack,
    setMensagemSnack,
    confirmarSenha,
    setConfirmarSenha,
    pedirTokenRecuperacao,
    resetarSenha,
    setValueInputToken,
    password,
    setPassword,
    requestEmail,
    setRequestEmail,
  } = useRecuperarSenha(router.query.token as string);
  return (
    <Container>
      <PageTitle title={"Recuperação de senha"} />
      {router.query.token ? (
        <FormFieldsContainer>
          <TextField 
            label={"Digite seu e-mail"} 
            type={"email"} 
            fullWidth 
            value={email}
            onChange={(event) => setEmail(event.target.value)}  
          />
          <TextField 
            label={"Digite a nova senha"} 
            type={"password"} 
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}  
          />
          <TextField 
            label={"Confirme a nova senha"} 
            type={"password"} 
            fullWidth
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}  
          />
          <PasswordStrength password={password} />
          <LoginButton 
            size={"large"} 
            variant={"contained"} 
            color={"secondary"}
            onClick={resetarSenha}  
          >
            Redefinir senha
          </LoginButton>
        </FormFieldsContainer>
      ) : (
        <FormFieldsContainer>
          <TextField 
            label={"Digite seu e-mail"} 
            type={"email"} 
            onChange={(event) => {
              setEmail(event.target.value);
              setRequestEmail(false);
            }} 
          />
          {requestEmail && (
            <TextField 
              label={"Digite seu token"} 
              type={"text"} 
              onChange={(event) => setValueInputToken(event.target.value)} 
            />
          )}
          <LoginButton 
            size={"large"} 
            variant={"contained"} 
            color={"secondary"}
            onClick={pedirTokenRecuperacao}  
          >
            {requestEmail ? "Alterar senha" : "Enviar e-mail"}
          </LoginButton>
        </FormFieldsContainer>
      )}
      <Snackbar
        open={mensagemSnack.length > 0}
        message={mensagemSnack}
        autoHideDuration={4000}
        onClose={() => setMensagemSnack("")}
      />
    </Container>
  );
};

export default RecuperarSenha;