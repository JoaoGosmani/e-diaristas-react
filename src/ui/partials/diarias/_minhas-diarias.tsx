import useMinhasDiarias from "data/hooks/pages/diarias/useMinhasDiarias.page";
import React, { PropsWithChildren } from "react";

// import { Component } from "./_minhas-diarias.styled";

const MinhasDiarias: React.FC<PropsWithChildren> = () => {
    const { isMobile, currentPage, setCurrentPage, totalPages, itemsPerPage } = 
        useMinhasDiarias();
    return (
        <div>
            <div>MinhasDiarias</div>
        </div>
    );
};

export default MinhasDiarias;