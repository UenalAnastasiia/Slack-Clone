export class Channel {
    name: any;
    description: string;
    id: any;
    creator: any;
    noThreads: any;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description : '';
        this.id = obj ? obj.id : '';
        this.creator = obj ? obj.creator : '';
        this.noThreads = obj ? obj.noThreads : '';
    }

    public toJSON() {
        return {
            name: this.name,
            description: this.description,
            id: this.id,
            creator: this.creator,
            noThreads: this.noThreads
        }
    }
}