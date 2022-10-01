import { Paper } from "@mui/material";
import useContratacao from "data/hooks/pages/useContratacao.page";
import useIsMobile from "data/hooks/useIsMobile";
import React, { PropsWithChildren } from "react";
import { FormProvider } from "react-hook-form"; 
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import SideInformation from "ui/components/data-display/SideInformation/SideInformation";
import SafeEnvironment from "ui/components/feedback/SafeEnvironment/SafeEnvironment";
import { 
    UserFormContainer,
    PageFormContainer,
} from "ui/components/inputs/UserForm/UserForm";
import BreadCrumb from "ui/components/navigation/BreadCrumb/BreadCrumb";
import DetalhesServico from "./_detalhes-servico";

// import { Component } from "./_contratacao.styled";

const Contratacao: React.FC<PropsWithChildren> = () => {
    const { step, breadcrumbItems, serviceForm, onServiceFormSubmit, servicos } = useContratacao();
    const isMobile = useIsMobile();
    return (
        <div>
            {!isMobile && <SafeEnvironment />}
            <BreadCrumb 
                selected={breadcrumbItems[step - 1]} 
                items={breadcrumbItems} 
            />
            {step === 1 && <PageTitle title="Nos conte um pouco sobre o serviço!" />}
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