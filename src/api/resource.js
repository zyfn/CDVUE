import service from './interceptors'
export default{
    resourceSearchAll(){
        return service.get('/resourceSearchAll')
    },
    resourceSearchByName(name){
        return service.get('/resourceSearchByName',{
            params:{
                name
        }
    })
    },
    resourceUpdate(resource) {
        // 调用修改的api
        return service({
            method: 'post',
            url: "/resourceUpdate",
            data: resource,
        })
    },
    resourceAdd(resource) {
        // 调用增加的api
        return service({
            method: 'post',
            url: "/resourceAdd",
            data: resource,
        })
    },
    resourceRemove(id){
        return service.get('/resourceRemove',{
            params:{
                id
        }
    })
    },

    
}