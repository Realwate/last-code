import {baseUrl} from '../config/env'

let uploadAvatarUrl = baseUrl + 'api/upload/avatar'

export default {
  pageLimit: 10,
  requestPercent: 0.8,
  defaultTag: "http://oml29w677.bkt.clouddn.com/tag-default.png",
  defaultAvatar: "http://oml29w677.bkt.clouddn.com/user-default.png",
  uploadAvatarUrl
}
