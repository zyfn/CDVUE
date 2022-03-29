
import Qs from 'qs'
import service from './interceptors'
import assets from'./assets'
import funds from'./funds'
import resource from'./resource'
import base from'./base'
import hot from'./hot'
import question from './question'
export default{
    login(username,password){
        return service({
            method: 'post',
            url: "/login",
            data: Qs.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        )
    },
    isLogin(){
        return service.get('/isLogin');
    },
    assets,
    funds,
    resource,
    base,
    hot,
    question
}