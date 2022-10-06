import { yupResolver } from "@hookform/resolvers/yup";
import { 
    CredenciaisInterface, 
    LoginFormDataInterface,
} from "data/@types/FormInterface";
import { FormSchemaService } from "data/services/FormSchemaService";
import { useForm } from "react-hook-form";

export default function useLogin() {
    const formMethods = useForm<LoginFormDataInterface<CredenciaisInterface>>({
        resolver: yupResolver(FormSchemaService.login()),
    });

    async function onSubmit(data: LoginFormDataInterface<CredenciaisInterface>) {}

    return { formMethods, onSubmit };
}