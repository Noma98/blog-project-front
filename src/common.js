
export const getFormattedDate = (createdAt) => {
    const std = new Date(createdAt);
    const year = std.getFullYear();
    const month = std.getMonth() + 1;
    const date = std.getDate();
    return `${year}년 ${month}월 ${date}일`;
}
export const setTextareaHeight = (textRef) => {
    if (textRef === undefined || textRef.current === undefined) {
        return;
    }
    textRef.current.style.height = textRef.current.scrollHeight + "px";
}