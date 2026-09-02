import '../../vue.config';
import {garminPath} from "../../global";

export default class GarminService {

    getAll() {
        return fetch(garminPath + 'get.php')
            .then(res => res.json())
            .then(d => d.data);
    }
}
