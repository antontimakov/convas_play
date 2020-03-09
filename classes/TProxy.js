// класс взаимодействия с сервером
class TProxy{
    static getFromServer(poUrl, pfFn){
        window.axios.get(poUrl)
            .then(response => {
                if (response.data['data']){
                    pfFn(response.data['data']);
                }
                else{
                    pfFn(response);
                }
                if (response.data['achievements']){
                    response.data['achievements'].forEach((element)=>{
                        Game.achievements.add(element);
                    });
                }
            });
    }
}
