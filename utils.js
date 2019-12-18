const checkArguments(argu) => {
    for (var i in argu){
        if (!argu[i]) {
            wx.showToast({title: argu[i]+'不能为空',})
            return false
        }
    }
    return true
}

module.exports = {
    checkArguments
}