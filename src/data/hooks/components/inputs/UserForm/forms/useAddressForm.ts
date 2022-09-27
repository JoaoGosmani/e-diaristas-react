import { FormValues } from "data/@types/forms/FormValues";
import { useFormContext } from "react-hook-form";

export default function useAddressForm() {
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext<FormValues>();
} 