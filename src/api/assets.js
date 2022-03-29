import service from './interceptors'
export default{
    assetsSearchAll(){
        return service.get('/assetsSearchAll')
    },
    assetsSearchByName(name){
        return service.get('/assetsSearchByName',{
            params:{
                name
        }
    })
    },
    assetsUpdate(assets) {
        console.log('调用成功')
        // 调用修改的api
        return service({
            method: 'post',
            url: "/assetsUpdate",
            data: JSON.stringify(assets),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    assetsAdd(assets) {
        // 调用增加的api
        return service({
            method: 'post',
            url: "/assetsAdd",
            data: assets,
        })
    },
    assetsRemove(id){
        return service.get('/assetsRemove',{
            params:{
                id
        }
    })
    },


    
}