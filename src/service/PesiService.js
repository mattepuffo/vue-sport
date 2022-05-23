import '../../vue.config';
import {remotePath} from "../../global";

export default class PesiService {

    getAll() {
        return fetch(remotePath + 'pesi/get.php')
            .then(res => res.json())
            .then(d => d.pesi);
    }

    getMesiAnno() {
        return fetch(remotePath + 'pesi/get_mesi_anno.php')
            .then(res => res.json())
            .then(d => d);
    }

    add(data) {
        return fetch(remotePath + 'pesi/add.php', {
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

}
