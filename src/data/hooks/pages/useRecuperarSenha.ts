import { useRouter } from "next/router";

export function useRecuperarSenha() {
    const router = useRouter();

    return {
        router,
    }
}