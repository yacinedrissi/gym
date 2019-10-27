export class Permission {



    id: number = 0
    name: string = ""

    copyPermissionObj(obj: Permission) {

        this.id = obj.id
        this.name = obj.name
    }
}