import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const LoginContainer = styled("div")`
    display: grid;
    grid-template-columns: minmax(200px, 650px);
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(6, 2)};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
`; 

export const LoginButton = styled(Button)` 
    width: 226px;
    justify-self: center;
    margin-top: ${({ theme }) => theme.spacing(4)}; 
`;