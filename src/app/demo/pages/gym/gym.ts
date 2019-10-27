export class Gym {

    
    id_user :number = 0
    name :string = ""
    discription:string = ""
    address:string = ""
    city:string = ""
    image:any
    phone:string = ""
    id: number = 0
    
   

    copyGymObj(obj: Gym) {

        this.id = obj.id
        this.discription = obj.discription
        this.name = obj.name
        this.id_user = obj.id_user
        this.address = obj.address
        this.city = obj.city
        this.phone = obj.phone
        this.image = obj.image
    }
}