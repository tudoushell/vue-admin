import request from '@/utils/request'

export default {
    listUserInfo(userInfoQueryDTO) {
        return request({
          url: '/user-info',
          method: 'post',
          data: userInfoQueryDTO
        })
    }
}