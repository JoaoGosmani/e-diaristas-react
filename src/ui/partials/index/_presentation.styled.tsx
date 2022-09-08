import { Container } from "@mui/material";
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

export const  ContainerStyled = styled(Container)`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: 
        "title"
        "subtitle"
        "button";
    align-content: center;

    ${({ theme }) => theme.breakpoints.up("md")} {
        grid-template-columns: 450px minmax(200px, 450px);
        grid-template-rows: 125px 55px 60px;
        grid-template-areas: 
            "title picture"
            "subtitle picture"
            "button picture";
        gap: ${({ theme }) => theme.spacing(4)};
        align-items: center;
        justify-content: space-between;
        justify-items: center;
        min-height: 450px;
    }

    ${({ theme }) => theme.breakpoints.down("md")} {
        max-width: 350px;
    }
`;
