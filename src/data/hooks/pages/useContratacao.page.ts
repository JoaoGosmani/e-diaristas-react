import { 
    CadastroClienteFormDataInterface,
    CredenciaisInterface,
    LoginFormDataInterface,
    NovaDiariaFormDataInterface,
    PagamentoFormDataInterface
} from "data/@types/FormInterface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchemaService } from "data/services/FormSchemaService";
import { ServicoInterface } from "data/@types/ServicoInterface";
import useApi from "../useApi.hook";

export default function useContratacao() {
    const [step, setStep] = useState(1),
        [hasLogin, setHasLogin] = useState(false),
        [loginError, setLoginError] = useState(""),
        breadcrumbItems = ["Detalhes da diária", "Identificação", "Pagamento"],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(FormSchemaService.detalheServico())
            ),
        }),
        clientForm = useForm<CadastroClienteFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData().concat(FormSchemaService.newContact())
            ),
        }),
        loginForm = useForm<LoginFormDataInterface<CredenciaisInterface>>({
            resolver: yupResolver(FormSchemaService.login()),
        }),
        paymentForm = useForm<PagamentoFormDataInterface>({
            resolver: yupResolver(FormSchemaService.payment()),
        }),
        servicos = useApi<ServicoInterface[]>("/api/servicos").data;

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {}

    function onClientFormSubmit(data: CadastroClienteFormDataInterface) {}

    function onLoginFormSubmit(
        data: LoginFormDataInterface<CredenciaisInterface>
    ) {}
    
    function onPaymentFormSubmit(data: PagamentoFormDataInterface) {}
        
    return { 
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
    };
}