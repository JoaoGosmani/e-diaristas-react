import { 
    AccordionDetails, 
    AccordionSummary,
    Container, 
    Typography,
} from "@mui/material";
import {
    Wave,
    SectionContainer,
    SectionTitle,
    SectionSubTitle,
    AccordionStyled,
} from "./_frequent-questions.styled";

const FrequentQuestions = () => {
    return (
        <SectionContainer>
            <Wave src={"/img/home/waves.svg"} />
            <Container>
                <SectionTitle>Ainda está com dúvidas?</SectionTitle>
                <SectionSubTitle>Veja abaixo as perguntas frequentes</SectionSubTitle>
                <AccordionStyled>
                    <AccordionSummary expandIcon={<i className="twf-minus" />}>
                        <Typography color={"primary"}>faifaja</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>fagfafsfa</Typography>
                    </AccordionDetails>
                </AccordionStyled>
            </Container>
        </SectionContainer>  
    );   
};

export default FrequentQuestions;