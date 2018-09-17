(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth || doc.body.clientWidth
    var rem
    if (!clientWidth) return
    clientWidth = clientWidth > 768 ? 750 : clientWidth
    rem = clientWidth / 37.5
    docEl.style.fontSize = rem + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  win.addEventListener('load', recalc, false)
})(document, window)
