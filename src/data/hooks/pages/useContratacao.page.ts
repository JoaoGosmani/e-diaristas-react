import { useState } from "react";

export default function useContratacao() {
    const [step, setStep] = useState(1),
        breadcrumbItems = ["Detalhes da diária", "Identificação", "Pagamento"];
        
    return { step, breadcrumbItems };
}