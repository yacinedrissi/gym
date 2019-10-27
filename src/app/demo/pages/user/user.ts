export class User {



    id: number = 0
    firstname:string = ""
    lastname: string = ""
    image: string = ""
    email: string = ""
    gender: string = ""
    birthday: string = ""
    cin: string = ""
    city: string = ""
    phone: string = ""
    adresse: string = ""
    password: string = ""
    creted_by: number = 0
    statut: string = ""
    selected:boolean=false;


    copyUserObj(obj: User) {

        this.id = obj.id
        this.gender = obj.gender
        this.statut = obj.statut
        this.cin = obj.cin
        this.firstname = obj.firstname
        this.lastname = obj.lastname
        this.phone = obj.phone
         this.birthday = obj.birthday
        this.email = obj.email
        this.password = obj.password
         this.city = obj.city
        this.image = obj.image
        this.adresse = obj.adresse
        this.creted_by = obj.creted_by
    }
}