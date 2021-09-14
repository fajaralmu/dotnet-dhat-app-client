export const getInputReadableDate = (date:Date) :string => {
    const year = date.getFullYear();

    const arr = [year, twoDigits(date.getMonth()+1), twoDigits(date.getDate())];
    return arr.join("-");
}
export const twoDigits = (value:number) :string => {
    if (value >= 10) {
        return   value.toString();
    }
    return "0"+value;
}