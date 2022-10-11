import RaveBase from "./rave.base";


export default class Custom {
    private rave: RaveBase;
    constructor(arg: RaveBase) {
      this.rave = arg;
    }
    custom (path: string, data: Object) {

        return customRequest(path, data, this.rave);
    }
}