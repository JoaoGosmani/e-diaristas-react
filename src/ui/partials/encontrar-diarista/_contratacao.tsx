import { Button, Paper, Typography } from "@mui/material";
import useContratacao from "data/hooks/pages/useContratacao.page";
import useIsMobile from "data/hooks/useIsMobile";
import React, { PropsWithChildren } from "react";
import { FormProvider } from "react-hook-form";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import SideInformation from "ui/components/data-display/SideInformation/SideInformation";
import SafeEnvironment from "ui/components/feedback/SafeEnvironment/SafeEnvironment";
import {
    PageFormContainer, UserFormContainer
} from "ui/components/inputs/UserForm/UserForm";
import BreadCrumb from "ui/components/navigation/BreadCrumb/BreadCrumb";
import CadastroCliente, { LoginCliente } from "./_cadastro-cliente";
import DetalhesServico from "./_detalhes-servico";
import InformacoesPagamento from "./_informacoes-pagamento";

// import { Component } from "./_contratacao.styled";

const Contratacao: React.FC<PropsWithChildren> = () => {
    const { 
        step, 
        breadcrumbItems, 
        serviceForm, 
        onServiceFormSubmit, 
        servicos,
        hasLogin,
        setHasLogin,
        clientForm,
        onClientFormSubmit,
        setStep,
        loginForm,
        onLoginFormSubmit,
        loginError,
        paymentForm,
        onPaymentFormSubmit,
    } = useContratacao();
    const isMobile = useIsMobile();
    return (
        <div>
            {!isMobile && <SafeEnvironment />}
            <BreadCrumb 
                selected={breadcrumbItems[step - 1]} 
                items={breadcrumbItems} 
            />
            {step === 1 && <PageTitle title="Nos conte um pouco sobre o serviço!" />}

            {step === 2 && (
                <PageTitle 
                    title="Precisamos conhecer um pouco mais sobre você!"
                    subtitle={
                        !hasLogin ? (
                            <span>
                                Caso já tenha cadastro,{" "} 
                                <Button onClick={() => setHasLogin(true)}>clique aqui</Button>
                            </span>
                        ) : (
                            <span>
                                Caso não tenha cadastro,{" "} 
                                <Button onClick={() => setHasLogin(false)}>clique aqui</Button> 
                            </span>
                        )
                    }
                />
            )}

            <UserFormContainer>
                <PageFormContainer>
                    <Paper>
                        <FormProvider {...serviceForm}>
                            <form 
                                onSubmit={serviceForm.handleSubmit(onServiceFormSubmit)}
                                hidden={step !== 1}    
                            >
                                <DetalhesServico servicos={servicos} />
                            </form>
                        </FormProvider>

                        <FormProvider {...clientForm}>
                            <form 
                                onSubmit={clientForm.handleSubmit(onClientFormSubmit)}
                                hidden={step !== 2 || hasLogin}    
                            >
                                <CadastroCliente onBack={() => setStep(1)}/>
                            </form>
                        </FormProvider>

                        {step === 2 && hasLogin && (
                            <FormProvider {...loginForm}>
                                <form onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}>
                                    {loginError && (
                                        <Typography color={"error"} align={"center"}  sx={{ mb: 2 }}>
                                            {loginError}
                                        </Typography>
                                    )}

                                    <LoginCliente onBack={() => setStep(1)}/>
                                </form>
                            </FormProvider>
                        )}

                        {step === 3 && (
                            <FormProvider {...paymentForm}>
                                <form onSubmit={paymentForm.handleSubmit(onPaymentFormSubmit)}>
                                    <InformacoesPagamento />
                                </form>
                            </FormProvider>
                        )}
                    </Paper>
                    {!isMobile && step !== 4 && (
                        <SideInformation
                            title="Detalhes"
                            items={[
                                {
                                    title: "Tipo",
                                    description: [""],
                                    icon: "twf-check-circle",
                                },
                                {
                                    title: "Tamanho",
                                    description: [""],
                                    icon: "twf-check-circle",
                                },
                                {
                                    title: "Data",
                                    description: [""],
                                    icon: "twf-check-circle",
                                },
                            ]}
                            footer={{
                                text: "R$80,00",
                                icon: "twf-credit-card",
                            }}
                        />
                    )}
                    
                </PageFormContainer>
            </UserFormContainer>
        </div>
    );
};

export default Contratacao;