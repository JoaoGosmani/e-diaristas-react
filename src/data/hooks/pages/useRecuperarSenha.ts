import { ExternalServiceContext } from "data/contexts/ExternalServiceContext";
import { ApiServiceHateoas } from "data/services/ApiService";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export function useRecuperarSenha() {
    const router = useRouter(),
        [email, setEmail] = useState(''),
        { externalServicesState } = useContext(ExternalServiceContext),
        [mensagemSnack, setMensagemSnack] = useState('');

    async function pedirTokenRecuperacao() {
        if (email.length > 8) {
            ApiServiceHateoas(
                externalServicesState.externalService, 
                "solicitar_alteracao_senha", 
                async (request) => {
                    try {
                        await request({
                            data: {
                                email,
                            },
                        });
                        setMensagemSnack(
                            "Uma mensagem foi enviada ao seu e-mail para a recuperação da senha"
                        );
                    } catch (error) {}
                }
            );
        } else {
            setMensagemSnack("Digite um e-mail válido");
        }
    }

    return {
        router,
        email,
        setEmail,
        mensagemSnack,
        setMensagemSnack,
    }
}