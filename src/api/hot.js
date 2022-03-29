import service from './interceptors'
export default{
    hotAll(){
        return service.get('/hot/getAll');
    },
    getById(id){
        return service.get("/hot/getById",{params:{id:id}})
    },
    getByTitle(title){
        return service.get("/hot/getByTitle",{params:{title:title}})
    }
}