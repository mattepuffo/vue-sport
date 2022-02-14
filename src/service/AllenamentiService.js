import '../../vue.config';
import {remotePath} from "../../global";

export default class AllenamentiService {

    getAll() {
        return fetch(remotePath + 'allenamenti/get.php')
            .then(res => res.json())
            .then(d => d.allenamenti);
    }

    getTipi() {
        return fetch(remotePath + 'allenamenti_tipi/get.php')
            .then(res => res.json())
            .then(d => d.allenamenti_tipi);
    }

    // getMesiAnno() {
    //     return axios.get(getMesiAnno/*, {responseType: 'text'}*/)
    //         .then(res => {
    //             return res.data;
    //         });
    // }
    //
    // sumAnno() {
    //     return axios.get(countPerAnno)
    //         .then(res => {
    //             return res.data.count;
    //         });
    // }
    //
    // getTipi() {
    //     return axios.get(getTipi)
    //         .then(res => {
    //             return res.data.allenamenti_tipi;
    //         });
    // }
    //
    // addAllenamento(postData) {
    //     return axios.post(addAllenamento, postData, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((resp) => {
    //         return resp.data;
    //     }, (error) => {
    //         return error;
    //     });
    // }
    //
    // editAllenamento(postData) {
    //     return axios.post(editAllenamento, postData, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((resp) => {
    //         return resp.data;
    //     }, (error) => {
    //         return error;
    //     });
    // }
    //
    // deleteAllenamento(postData) {
    //     return axios.post(deleteAllenamento, postData, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((resp) => {
    //         return resp.data;
    //     }, (error) => {
    //         return error;
    //     });
    // }

    // getAll: 'https://www.mattepuffo.com/api/sport/allenamenti/get.php',
    // getMesiAnno: 'https://www.mattepuffo.com/api/sport/allenamenti/get_mesi_anno.php',
    // countPerAnno: 'https://www.mattepuffo.com/api/sport/allenamenti/count.php',
    // addAllenamento: 'https://www.mattepuffo.com/api/sport/allenamenti/add.php',
    // editAllenamento: 'https://www.mattepuffo.com/api/sport/allenamenti/up.php',
    // deleteAllenamento: 'https://www.mattepuffo.com/api/sport/allenamenti/del.php',
    // getTipi: 'https://www.mattepuffo.com/api/sport/allenamenti_tipi/get.php'

}
