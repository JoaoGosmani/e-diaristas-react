import { Oportunidade } from "data/@types/OportunidadeInterface";
import { UserContext } from "data/contexts/UserContext";
import { linksResolver } from "data/services/ApiService";
import { useContext } from "react";
import useApiHateoas from "../useApi.hook"
import useIsMobile from "../useIsMobile";
import usePagination from "../usePagination.hook";

export default function useOportunidades() {
    const { userState: { user },} = useContext(UserContext),
        oportunidades = useApiHateoas<Oportunidade[]>(
            user.links, 
            "lista_oportunidades"
            ).data,
        isMobile = useIsMobile(),
        { currentPage, setCurrentPage, totalPages, itemsPerPage } = usePagination(
            oportunidades ?? [], 
            5
        );

    function totalComodos(oportunidade: Oportunidade): number {
        let total = 0;
        total += oportunidade.quantidade_banheiros;
        total += oportunidade.quantidade_cozinhas;
        total += oportunidade.quantidade_outros;
        total += oportunidade.quantidade_quartos;
        total += oportunidade.quantidade_quintais;
        total += oportunidade.quantidade_salas;

        return total;
    }

    function podeCandidatar(oportunidade: Oportunidade): boolean {
        return linksResolver(oportunidade.links, "candidatar_diaria") != undefined;
    }

    return { 
        oportunidades, 
        isMobile, 
        totalComodos,
        podeCandidatar, 
        currentPage, 
        setCurrentPage, 
        totalPages, 
        itemsPerPage, 
    };
}