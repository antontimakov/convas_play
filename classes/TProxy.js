// класс взаимодействия с сервером
class TProxy{
    static getFromServer(poUrl, pfFn){
        window.axios.get(poUrl)
            .then(response => {
                pfFn(response);
            });
    }
}