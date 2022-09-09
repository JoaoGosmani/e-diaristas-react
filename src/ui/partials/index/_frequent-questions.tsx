import {
    Wave,
    SectionContainer,
    SectionTitle,
    SectionSubtitle,
} from "./_frequent-questions.styled";

const FrequentQuestions = () => {
    return (
        <SectionContainer>
            <Wave src={"/img/home/waves.svg"} />
            <SectionTitle>Ainda está com dúvidas?</SectionTitle>
            <SectionSubtitle>Veja abaixo as perguntas frequentes</SectionSubtitle>
        </SectionContainer>  
    );   
};

export default FrequentQuestions;