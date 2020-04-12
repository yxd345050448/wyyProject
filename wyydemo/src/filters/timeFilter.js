function timeFilter(obj){
    var date = new Date(obj);
    var year = date.getFullYear();
    var month = (date.getMonth()+1+'').padStart(2,"0");
    var day = (date.getDate()+1+'').padStart(2,"0");
    var h = (date.getHours()+1+'').padStart(2,"0");
    var m = (date.getMinutes()+1+'').padStart(2,"0");
    var s = (date.getSeconds()+1+'').padStart(2,"0");
    return `${year}-${month}-${day} ${h}:${m}:${s}`
}
export default timeFilter