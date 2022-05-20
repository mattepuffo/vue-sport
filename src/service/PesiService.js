import '../../vue.config';
import {remotePath} from "../../global";

export default class PesiService {

    getAll() {
        return fetch(remotePath + 'pesi/get.php')
            .then(res => res.json())
            .then(d => d.pesi);
    }

}
