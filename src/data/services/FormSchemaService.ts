import * as yup from "yup";
import { ValidationService } from "./ValidationService";
import { DateService } from "./DateService";

export const FormSchemaService = {
    newContact() {
        return yup.object().shape({
            usuario: yup.object().shape({
                email: yup.string().email("E-mail inválido"),
                password: yup.string().min(5, "Senha muito curta"),
                password_confirmation: yup
                    .string()
                    .min(5, "Senha muito curta")
                    .oneOf([yup.ref("password"), null], "As senhas não estão iguais"),
            }),
        });
    },
    userData() {
        return yup.object().shape({
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
        });
    },
};