export class Channel {
    name: any;
    description: string;
    cid: any;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description : '';
        this.cid = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            name: this.name,
            description: this.description,
            id: this.cid
        }
    }
}