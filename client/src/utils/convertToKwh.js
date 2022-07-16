
export const convertToKwh = (value) => {
    if (value === null) {
        return null;
    }
    return Number(value) / 1000;
}