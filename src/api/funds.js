import service from './interceptors'
export default{
    fundsSearchAll(){
        return service.get('/fundsSearchAll')
    },
    fundsSearchByType(type){
        return service.get('/fundsSearchByType',{
            params:{
                type
        }
    })
    },
    fundsUpdate(funds) {
        // 调用修改的api
        return service({
            method: 'post',
            url: "/fundsUpdate",
            data: funds,
        })
    },
    fundsAdd(funds) {
        // 调用增加的api
        return service({
            method: 'post',
            url: "/fundsAdd",
            data: funds,
        })
    },
    fundsRemove(id){
        return service.get('/fundsRemove',{
            params:{
                id
        }
    })
    },

    
}