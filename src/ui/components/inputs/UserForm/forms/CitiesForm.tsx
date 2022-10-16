import useCitiesForm from "data/hooks/components/inputs/UserForm/forms/useCitiesForm";
import { CitiesSelection } from "../UserForm.styled";

export const CitiesForm: React.FC<{ estado: string }> = ({ estado }) => {
    const {
        options,
        handleNewCity,
        citiesList: listaCidades,
        citiesName,
        handleDelete,
    } = useCitiesForm(estado);
    return <CitiesSelection></CitiesSelection>
};