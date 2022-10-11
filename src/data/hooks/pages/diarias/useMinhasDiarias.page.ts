import { DiariaContext } from "data/contexts/DiariaContext";
import useIsMobile from "data/hooks/useIsMobile";
import usePagination from "data/hooks/usePagination.hook";
import { useContext } from "react";

export default function useMinhasDiarias() {
    const isMobile = useIsMobile(),
        { 
            diariaState: { diarias }, 
        } = useContext(DiariaContext),
        filteredData = diarias,
        { currentPage, setCurrentPage, totalPages, itemsPerPage } = usePagination(
            [], 
            5
        );
    
    return { 
        isMobile, 
        currentPage, 
        setCurrentPage, 
        totalPages, 
        itemsPerPage,
        filteredData, 
    };
}