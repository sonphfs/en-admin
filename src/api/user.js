import request from '@/utils/request'

export function getListUsers(){
    return request({
        url: '/backend/users/list',
        method: 'get'
    })
}