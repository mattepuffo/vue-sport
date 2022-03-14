import '../../vue.config';
import {remotePath} from "../../global";

export default class AllenamentiService {

    getAll() {
        return fetch(remotePath + 'allenamenti/get.php')
            .then(res => res.json())
            .then(d => d.allenamenti);
    }

    getById(id) {
        return fetch(remotePath + 'allenamenti/get.php?id=' + id)
            .then(res => res.json())
            .then(d => d.allenamenti);
    }

    getTipi() {
        return fetch(remotePath + 'allenamenti_tipi/get.php')
            .then(res => res.json())
            .then(d => d.allenamenti_tipi);
    }

    getMesiAnno() {
        return fetch(remotePath + 'allenamenti/get_mesi_anno.php')
            .then(res => res.json())
            .then(d => d);
    }

    sumAnno() {
        return fetch(remotePath + 'allenamenti/count.php')
            .then(res => res.json())
            .then(d => d.count);
    }

    addAllenamento(data) {
        return fetch(remotePath + 'allenamenti/add.php', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }, (error) => {
            return error;
        });
    }

    upAllenamento(data) {
        return fetch(remotePath + 'allenamenti/up.php', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }, (error) => {
            return error;
        });
    }

    delAllenamento(data) {
        return fetch(remotePath + 'allenamenti/del.php', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }, (error) => {
            return error;
        });
    }

    // getTipi() {
    //     return axios.get(getTipi)
    //         .then(res => {
    //             return res.data.allenamenti_tipi;
    //         });
    // }

    // getAll: 'https://www.mattepuffo.com/api/sport/allenamenti/get.php',
    // getMesiAnno: 'https://www.mattepuffo.com/api/sport/allenamenti/get_mesi_anno.php',
    // countPerAnno: 'https://www.mattepuffo.com/api/sport/allenamenti/count.php',
    // addAllenamento: 'https://www.mattepuffo.com/api/sport/allenamenti/add.php',
    // editAllenamento: 'https://www.mattepuffo.com/api/sport/allenamenti/up.php',
    // deleteAllenamento: 'https://www.mattepuffo.com/api/sport/allenamenti/del.php',
    // getTipi: 'https://www.mattepuffo.com/api/sport/allenamenti_tipi/get.php'

}
