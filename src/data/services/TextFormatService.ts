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
};