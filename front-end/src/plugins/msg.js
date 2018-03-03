import {Message,MessageBox} from 'element-ui'
function showMessage(content,type){
  Message({
    message:content,
    type:type,
    showClose: true,
    duration:2000
  })
}
function alertSuccess(msg){
  showMessage(msg,"success")
}

function alertError(msg){
  showMessage(msg,"error")
}

function confirm(msg){
  return MessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

export default  {
  alertSuccess,alertError,confirm
}
