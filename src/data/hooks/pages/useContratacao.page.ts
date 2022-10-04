import { yupResolver } from "@hookform/resolvers/yup";
import { houseParts } from "@partials/encontrar-diarista/_detalhes-servico";
import { DiariaInterface } from "data/@types/DiariaInterface";
import {
    CadastroClienteFormDataInterface,
    CredenciaisInterface,
    LoginFormDataInterface,
    NovaDiariaFormDataInterface,
    PagamentoFormDataInterface
} from "data/@types/FormInterface";
import { ServicoInterface } from "data/@types/ServicoInterface";
import { ExternalServiceContext } from "data/contexts/ExternalServiceContext";
import { ApiService, ApiServiceHateoas, linksResolver } from "data/services/ApiService";
import { DateService } from "data/services/DateService";
import { FormSchemaService } from "data/services/FormSchemaService";
import { ValidationService } from "data/services/ValidationService";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useApiHateoas from "../useApi.hook";
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
        { externalServicesState } = useContext(ExternalServiceContext),
        servicos = useApiHateoas<ServicoInterface[]>(
            externalServicesState.externalService, 
            "listar_servicos"
        ).data,
        dadosFaxina = serviceForm.watch("faxina"),
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if (servicos && dadosFaxina?.servico) {
                const selectedServico = servicos.find(
                    (servico) => servico.id === dadosFaxina.servico
                );

                if (selectedServico) {
                    return selectedServico;
                }
            }
            return {} as ServicoInterface;
        }, [
            servicos, 
            dadosFaxina?.servico,
        ]),
        { totalTime, tamanhoCasa, totalPrice } = useMemo(() => {
            return { 
                totalTime: calcularTempoServico(dadosFaxina, tipoLimpeza), 
                tamanhoCasa: listarComodos(dadosFaxina),
                totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            tipoLimpeza,
            dadosFaxina,
            dadosFaxina?.quantidade_banheiros,
            dadosFaxina?.quantidade_cozinhas,
            dadosFaxina?.quantidade_outros,
            dadosFaxina?.quantidade_quartos,
            dadosFaxina?.quantidade_quintais,
            dadosFaxina?.quantidade_salas,
        ]),
        cepFaxina = serviceForm.watch("endereco.cep"),
        [podemosAtender, setPodemosAtender] = useState(false);

        useEffect(() => {
            const cep = (cepFaxina ?? "").replace(/\D/g, "");
            if (ValidationService.cep(cep)) {
                ApiServiceHateoas(
                    externalServicesState.externalService,
                    "verificar_disponibilidade_atendimento",
                    (request) => {
                        request<{ disponibilidade: boolean }>({ params: { cep } })
                            .then(({ data }) => {
                                setPodemosAtender(data.disponibilidade);
                            }).catch((_erro) => {
                                setPodemosAtender(false);
                            });
                    }
                );
            } else {
                setPodemosAtender(false);
            }
        }, [cepFaxina, externalServicesState.externalService]);

        useEffect(() => {
            if (
                dadosFaxina && 
                ValidationService.hora(dadosFaxina.hora_inicio) && 
                totalTime >= 0
            ) {
                serviceForm.setValue("faxina.hora_inicio", dadosFaxina?.hora_inicio, {
                    shouldValidate: true,
                });
                serviceForm.setValue(
                    "faxina.data_atendimento", 
                    dadosFaxina?.data_atendimento, 
                    {
                        shouldValidate: true,
                    }
                );
                serviceForm.setValue(
                    "faxina.hora_termino", 
                    DateService.addHours(dadosFaxina?.hora_inicio as string, totalTime),
                    {
                        shouldValidate: true,
                    }
                );
            } else {
                serviceForm.setValue("faxina.hora_termino", "");
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            totalTime, 
            dadosFaxina?.data_atendimento,
            dadosFaxina?.hora_inicio,
            dadosFaxina?.hora_termino,
        ]);

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {}

    function onClientFormSubmit(data: CadastroClienteFormDataInterface) {}

    function onLoginFormSubmit(
        data: LoginFormDataInterface<CredenciaisInterface>
    ) {}
    
    function onPaymentFormSubmit(data: PagamentoFormDataInterface) {}

    function calcularTempoServico(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ): number {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total += tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
            total += tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos;
            total += tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
        }
        return total;
    }

    function calcularPreco(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ): number {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total += tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
            total += tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
            total += tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
        }
        return Math.max(total, tipoLimpeza.valor_minimo);
    }

    function listarComodos(dadosFaxina: DiariaInterface): string[] {
        const comodos: string[] = [];

        if (dadosFaxina) {
            houseParts.forEach((housePart) => {
                const total = dadosFaxina[
                    housePart.name as keyof DiariaInterface
                ] as number;
                if (total > 0) {
                    const nome = total > 1 ? housePart.plural : housePart.singular;
                    comodos.push(`${total} ${nome}`);
                }
            });
        }

        return comodos;
    }
        
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
        tamanhoCasa,
        tipoLimpeza,
        totalPrice,
        podemosAtender,
    };
}