export class Channel {
    name: any;
    description: string;
    id: any;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description : '';
        this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            name: this.name,
            description: this.description,
            id: this.id
        }
    }
}