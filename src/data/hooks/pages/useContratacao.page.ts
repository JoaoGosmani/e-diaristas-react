import { NovaDiariaFormDataInterface } from "data/@types/FormInterface";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useContratacao() {
    const [step, setStep] = useState(1),
        breadcrumbItems = ["Detalhes da diária", "Identificação", "Pagamento"],
        serviceForm = useForm<NovaDiariaFormDataInterface>();
        
    return { step, breadcrumbItems };
}