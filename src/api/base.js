import service from './interceptors'
export default{
    getPartyByModel(id) {
        // 调用修改的api
        // return service({
        //     method: 'post',
        //     url: "/selectPartyByDifference",
        //     data: id,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        return service.get( "/selectPartyByDifference",{
            params:{id:id}
        })
    },
    getGovernmentByModel(id) {
        // 调用修改的api
        // return service({
        //     method: 'post',
        //     url: "/selectPartyByDifference",
        //     data: id,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        return service.get( "/selectGovernmentByDifference",{
            params:{id:id}
        })
    },
    getVillageByModel(id) {
        // 调用修改的api
        // return service({
        //     method: 'post',
        //     url: "/selectPartyByDifference",
        //     data: id,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        return service.get( "/selectVillageByDifference",{
            params:{id:id}
        })
    }


    
}