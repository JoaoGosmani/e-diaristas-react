export type FormValues = {
    usuario: {
        email: string;
        password: string;
        password_confirmation: string;
        nome_completo: string;
        nascimento: string;
        cpf: string;
        telefone: string;
    };

    pagamento: {
        numero_cartao: string;
        nome_cartao: string;
        validade: string;
        codigo: string;
    };

    pagamento_recusado?: string;
};