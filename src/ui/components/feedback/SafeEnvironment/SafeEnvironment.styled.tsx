import { styled } from "@mui/material/styles";

export const SafeEnvironmentContainer = styled("div")`
    color: ${({ theme }) => theme.palette.text.secondary};
    background-color: ${({ theme }) => theme.palette.background.default};
    font-size: 12px;
    text-align: right;
    padding: ${({ theme }) => theme.spacing(2, 0)};
`;