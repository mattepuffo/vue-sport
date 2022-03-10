export default class UtilService {

    getAnnoCorrente() {
        let d = new Date();
        return d.getFullYear();
    }

    getAnnoPassato() {
        let d = new Date();
        return d.getFullYear() - 1;
    }

}
