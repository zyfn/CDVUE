import service from './interceptors'
export default {
    addTitle(sumTitle){
        return service({
            method: 'post',
            url: "/take",
            data: sumTitle,
        })
    },
    addQuestion(questionPto){
        return service({
            method: 'post',
            url: "/ques",
            data: questionPto,
        })
    },
}