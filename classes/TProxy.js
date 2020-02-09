// класс взаимодействия с сервером
class TProxy{
    static getFromServer(poUrl, pfFn){
        window.axios.get(poUrl)
            .then(response => {
                pfFn(response.data['data']);
                response.data['achievements'].forEach((element)=>{
                    goGame.achievements.add(element);
                });
            });
    }
}