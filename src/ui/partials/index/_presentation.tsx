import { 
    ContainerStyled, 
    SectionContainer,
    SectionTitle,
} from "./_presentation.styled";

const Presentation = () => {
    return (
        <SectionContainer>
            <ContainerStyled>
                <SectionTitle>
                    Encontre agora mesmo um(a) <em>diarista</em>
                    <i className="twf-search" />
                </SectionTitle>
            </ContainerStyled>
        </SectionContainer>
    );
};

export default Presentation;