export class Role {



    id: number = 0
    name: string = ""

    copyRoleObj(obj: Role) {

        this.id = obj.id
        this.name = obj.name
    }
}