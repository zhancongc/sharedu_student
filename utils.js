const checkText = (argu) => {
    for (var i in argu){
        if (!argu[i].value) {
            wx.showToast({title: '请填写'+argu[i].name, icon:"none"})
            return false
        }
    }
    return true
}
const checkList = (argu) => {
    for (var i in argu){
        if (argu[i].value.length <=0) {
            wx.showToast({title: '请完善'+argu[i].name, icon:"none"})
            return false
        }
    }
    return true
}

module.exports = {
    checkText,
		checkList
}