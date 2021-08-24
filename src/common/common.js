export const getFormattedDate = (createdAt) => {
    const std = new Date(createdAt);
    const year = std.getFullYear();
    const month = std.getMonth() + 1;
    const date = std.getDate();
    return `${year}년 ${month}월 ${date}일`;
}

export const getElapsed = (createdAt) => {
    const std = new Date(createdAt);
    const elapsedMin = (Date.now() - std) / 60000;
    if (elapsedMin < 1) {
        return "방금 전";
    }
    const elapsedHour = elapsedMin / 60;
    if (elapsedHour < 1) {
        return Math.floor(elapsedMin) + "분 전";
    }
    const elapsedDay = elapsedHour / 24;
    if (elapsedDay < 1) {
        return Math.floor(elapsedHour) + "시간 전";
    }
    const elapsedWeek = elapsedDay / 7;
    if (elapsedWeek < 1) {
        return Math.floor(elapsedDay) + "일 전";
    }
    const elapsedMonth = elapsedDay / 30;
    if (elapsedMonth < 1) {
        return Math.floor(elapsedWeek) + "주 전";
    }
    const elapsedYear = elapsedMonth / 12;
    if (elapsedYear < 1) {
        return Math.floor(elapsedMonth) + "달 전";
    } else {
        return Math.floor(elapsedYear) + "년 전";
    }
}
