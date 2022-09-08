import { styled } from "@mui/material/styles";

export const SectionContainer = styled("section")`
    min-height: 250px;
    background-image: url("/img/home/living-room.svg");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: cover;

    ${({ theme }) => theme.breakpoints.down("md")} {
        display: flex;
        text-align: center;
    }

    ${({ theme }) => theme.breakpoints.up("md")} {
        background-position: center;
    }
`;