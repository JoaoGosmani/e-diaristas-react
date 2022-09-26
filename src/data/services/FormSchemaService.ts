import * as yup from "yup";

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
};