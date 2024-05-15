export class DeclarationError {
    type: number;
    error: number;
    declaration: number;
    section: number;
    name: string;
    solution: string;
    color: string;

    constructor(obj?) {
        if(obj) {
            this.type = obj.type;
            this.error = obj.error;
            this.declaration = obj.declaration;
            this.section = obj.section;
            this.name = obj.name;
            this.solution = obj.solution;
            this.color = obj.color;
        }
    }
}
