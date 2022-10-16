import { yupResolver } from "@hookform/resolvers/yup";
import { CadastroDiaristaFormDataInterface } from "data/@types/FormInterface";
import { FormSchemaService } from "data/services/FormSchemaService";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default  function useCadastroDiarista() {
    const [step, setStep] = useState(1),
        breadcrumbItems = ["Identificação", "Cidades atendidas"],
        userForm = useForm<CadastroDiaristaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData()
                    .concat(FormSchemaService.address())
                    .concat(FormSchemaService.newContact())
            ),
        }),
        addressListForm = useForm<CadastroDiaristaFormDataInterface>();

    return { step, setStep, breadcrumbItems, userForm, addressListForm };
}