var baseUrl = "/api";
//推荐歌单
var personalized = baseUrl+"/personalized";
//排行榜
var toplist = baseUrl+"/toplist/detail";
//歌单详情
var listDetail = baseUrl+"/playlist/detail";
//歌曲详情
var songDetail = baseUrl+"/song/detail";
//歌曲url
var songUrl = baseUrl+"/song/url";
//获取歌词
var songWord = baseUrl+"/lyric";
//获取歌曲评论
var comment = baseUrl+"/comment/music";
//搜索
var search = baseUrl+"/search";
//热搜
var hotSearch = baseUrl+"/search/hot/detail";
//banner
var banner = baseUrl+"/banner";
//登录
var login =baseUrl+"/login/cellphone";
//发送验证码
var send = baseUrl+"/captcha/sent";
//验证验证码
var verify = baseUrl+"/captcha/verify";
//用户详情
var userDetail = baseUrl+"/user/detail";
//获取用户信息,歌单,收藏,mv数量
var userSubcount = baseUrl+"/user/subcount";
//获取收藏的歌手列表
var collectList = baseUrl+"/artist/sublist";
//取消收藏歌手
var cancelCollect = baseUrl+"/artist/sub";
//获取喜欢音乐列表
var likeList = baseUrl+"/likelist";
//获取关注列表
var attention = baseUrl+"/user/follows";
//获取用户歌单
var userPlay = baseUrl+"/user/playlist";
export default {
    personalized,
    toplist,
    listDetail,
    songDetail,
    songUrl,
    songWord,
    comment,
    search,
    hotSearch,
    banner,
    login,
    send,
    verify,
    userDetail,
    userSubcount,
    collectList,
    likeList,
    attention,
    cancelCollect,
    userPlay
}