import { AxiosError, AxiosRequestConfig } from "axios";
import { ApiLinksInterface } from "data/@types/ApiLinksInterface";
import { ApiService, ApiServiceHateoas } from "data/services/ApiService";
import { useEffect, useCallback } from "react";
import useSwr, { mutate } from "swr";

export default function useApiHateoas<OutputType, Error = unknown>(
    links: ApiLinksInterface[] = [],
    nome: string | null,
    config?: AxiosRequestConfig   
): { data: OutputType | undefined; error: AxiosError<Error> | undefined } {
    const makeRequest = useCallback(() => {
        return new Promise<OutputType>((resolve) => {
            ApiServiceHateoas(links, nome ?? "", async (request) => {
                const response = await request<OutputType>(config);
                resolve(response.data);
            });
        });
    }, [links, nome, config]);

    const { data, error } = useSwr<OutputType, AxiosError<Error>>(
        nome,
        makeRequest
    );

    useEffect(() => {
        mutate(nome, makeRequest);
    }, [links, nome, makeRequest]);

    return { data, error };
}
