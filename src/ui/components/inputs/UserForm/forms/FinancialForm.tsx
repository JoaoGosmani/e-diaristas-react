import { FormValues } from "data/@types/forms/FormValues";
import { useFormContext } from "react-hook-form";
import TextField from "ui/components/inputs/TextField/TextField"
import { FinancialData } from "../UserForm.styled";

export const FinancialForm = () => {
    const { register } = useFormContext<FormValues>();
    return (
        <FinancialData>
            <TextField
                label={"Chave Pix"}
                defaultValue={""}
                {...register("usuario.chave_pix", { minLength: 5 })} 
            />
        </FinancialData>
    )
}