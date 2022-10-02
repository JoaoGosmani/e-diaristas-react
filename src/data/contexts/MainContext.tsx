import { ExternalServiceProvider } from "./ExternalServiceContext";
import React, { PropsWithChildren } from "react";

export const MainProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <ExternalServiceProvider>{children}</ExternalServiceProvider>
        </>
    )
};