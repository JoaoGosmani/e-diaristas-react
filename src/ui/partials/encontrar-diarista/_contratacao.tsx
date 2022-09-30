import useContratacao from "data/hooks/pages/useContratacao.page";
import useIsMobile from "data/hooks/useIsMobile";
import React, { PropsWithChildren } from "react";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import SafeEnvironment from "ui/components/feedback/SafeEnvironment/SafeEnvironment";
import { 
    UserFormContainer,
    PageFormContainer,
} from "ui/components/inputs/UserForm/UserForm";
import BreadCrumb from "ui/components/navigation/BreadCrumb/BreadCrumb";

// import { Component } from "./_contratacao.styled";

const Contratacao: React.FC<PropsWithChildren> = () => {
    const { step, breadcrumbItems } = useContratacao();
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
                <PageFormContainer></PageFormContainer>
            </UserFormContainer>
        </div>
    );
};

export default Contratacao;