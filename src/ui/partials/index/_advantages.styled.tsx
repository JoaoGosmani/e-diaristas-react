import { styled } from "@mui/material/styles";

export const GradientBackground = styled("section")`
    padding-bottom: ${({ theme }) => theme.spacing(20)};
    background: ${({ theme }) => 
        `linear-gradient(180deg, ${theme.palette.secondary.main} 0%,
        ${theme.palette.primary.main} 100%)`};

    color: ${({ theme }) => theme.palette.primary.contrastText};
`;