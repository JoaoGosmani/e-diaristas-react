import { styled } from "@mui/material/styles";
// import { } from "@mui/material";
// import { UserFormProps } from "./UserForm";

export const BaseGrid = styled("div")`
    display: grid;
    grid-auto-rows: auto;
    gap: ${({ theme }) => theme.spacing(2, 3)};
    padding: ${({ theme }) => theme.spacing(0, 0, 5)};

    ${({ theme }) => theme.breakpoints.down("md")} {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing(3)};
    }
`; 

export const NewContactData = styled(BaseGrid)`
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 
        "email email"
        "senha password-strength"
        "confirmar-senha password-strength";
    
    ${({ theme }) => theme.breakpoints.down("md")} {
        grid-template-areas: 
            "email"
            "senha"
            "password-strength"
            "confirmar-senha";
    }
`;

export const PictureSelection = styled(BaseGrid)`
    grid-template-columns: 1fr;
    padding: 0;
`;