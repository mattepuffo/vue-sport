import '../../vue.config';
import {remotePath} from "../../vue.config";

export default class AllenamentiService {

    getAll() {
        return fetch(remotePath + 'allenamenti/get.php').then(res => res.json()).then(d => d.allenamenti);
    }

}
