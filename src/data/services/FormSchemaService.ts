import * as yup from "yup";
import { ValidationService } from "./ValidationService";
import { DateService } from "./DateService";
import { PaymentService } from "./PaymentService";

export const FormSchemaService = {
    newContact() {
        return yup
            .object()
            .shape({
                usuario: yup.object().shape({
                    email: yup.string().email("E-mail inválido"),
                    password: yup.string().min(5, "Senha muito curta"),
                    password_confirmation: yup
                        .string()
                        .min(5, "Senha muito curta")
                        .oneOf([yup.ref("password"), null], "As senhas não estão iguais"),
                }),
            })
            .defined();
    },
    userData() {
        return yup
            .object()
            .shape({
                usuario: yup.object().shape({
                    nome_completo: yup.string().min(3, "Digite seu nome completo"),
                    nascimento: yup
                        .date()
                        .transform(DateService.transformDate)
                        .min(DateService.maxAdultBirthday, "Digite uma data válida")
                        .max(DateService.minAdultBirthday, "Proibido menores de idade")
                        .typeError("Digite uma data válida"),
                    cpf: yup.string().test("cpf", "CPF inválido", ValidationService.cpf),
                    telefone: yup
                        .string()
                        .test("telefone", "Telefone inválido", ValidationService.telefone),
                }),
            })
            .defined();
    },
    payment() {
        return yup
            .object()
            .shape({
                pagamento: yup.object().shape({
                    numero_cartao: yup.string().test(
                        "card_number", 
                        "Número de cartão inválido", 
                        (value) => 
                            PaymentService.validate({
                                card_number: value as string,
                                card_holder_name: "",
                                card_cvv: "",
                                card_expiration_date: "",
                            }).card_number
                    ),
                    nome_cartao: yup.string(),
                    validade: yup.string().test(
                        "card_expiration_date", 
                        "Data de validade inválida", 
                        (value) => 
                            PaymentService.validate({
                                card_number: "",
                                card_holder_name: "",
                                card_cvv: "",
                                card_expiration_date: value as string,
                            }).card_expiration_date
                    ),
                    codigo: yup.string().test(
                        "card_cvv", 
                        "Código de validação inválido", 
                        (value) => 
                            PaymentService.validate({
                                card_number: "",
                                card_holder_name: "",
                                card_cvv: value as string,
                                card_expiration_date: "",
                            }).card_cvv
                    ),
                }),
            })
            .defined();
    },
    address() {
        return yup
            .object()
            .shape({
                endereco: yup.object().shape({
                    cep: yup.string().test("cep", "CEP inválido", ValidationService.cep),
                    estado: yup.string(),
                    cidade: yup.string(),
                    bairro: yup.string(),
                    logradouro: yup.string(),
                    numero: yup.string(),
                    complemento: yup.string().nullable().default(undefined).notRequired(),
                }),
            })
            .defined();
    },
};