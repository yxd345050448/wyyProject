function dateFilter(obj) {
    var date = new Date(obj);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1 + '').padStart(2, "0");
    var day = (date.getDate() + 1 + '').padStart(2, "0");
    return `${year}-${month}-${day}`
}
export default dateFilter