export interface UserShortInformationInterface {
    nomeCompleto: string;
    foto_usuario?: string;
    reputacao?: number;
    cidade: string;
}

export interface BuscaCepResponse {
    diaristas: UserShortInformationInterface[];
    quantidade_diaristas: number;
}