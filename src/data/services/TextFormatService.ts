const CurrencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export const TextFormatService = {
    reverseDate(data: string): string {
        if (data.includes("/")) {
            return data.split("/").reverse().join("-");
        }

        if (data.includes("T")) {
            [data] = data.split("T");
        }
        return data.split("-").reverse().join("/");
    },
    currency(price = 0): string {
        if (isNaN(price)) {
            price = 0;
        }
        return CurrencyFormatter.format(price);
    },
};