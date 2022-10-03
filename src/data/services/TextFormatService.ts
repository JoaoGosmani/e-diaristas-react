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
    getNumbersFromText(text = ""): string {
        return text.replace(/\D/g, "");
    },
    dateToString(date: Date, withTime = false): string {
        const time = date.toISOString()
        if (withTime) {
            return time.substring(0, 19);
        }

        return time.substring(0, 10);
    },
};