export const isTodayOrYesterday = (date: string) => {
    const today = new Date();
    const target = new Date(date);
    const diff = today.getTime() - target.getTime();
    const dayDiff = diff / (1000 * 3600 * 24);
    if (dayDiff < 1 && today.getDate() === target.getDate()) {
      return "Today";
    } else {
      return `${target.getDate()}-${
        target.getMonth() + 1
      }-${target.getFullYear()}`;
    }
};