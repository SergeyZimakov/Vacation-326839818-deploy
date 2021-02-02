export const convertDate = (stringDate) => {
    const date = new Date(stringDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
} 