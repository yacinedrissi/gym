export class Membre {

    id: number = 0
    id_Gym: number = 0
    firstname: string = ""
    lastname: string = ""
    cin: string = ""
    email: string = ""
    city: string = ""
    adresse: string = ""
    phone: string = ""
    image: string = ""
    description: string = ""
    statut: string = ""
    last_paiement_date: Date = new Date()
    last_expire_date: Date = new Date()
    on_pause_days: string = ""
    left_to_pay: string = ""
    id_Subscription: number = 0
    subscription: string = ""


    copyMembreObj(obj: Membre) {

        this.id = obj.id
        this.id_Gym = obj.id_Gym
        this.firstname = obj.firstname
        this.lastname = obj.lastname
        this.cin = obj.cin
        this.email = obj.email
        this.city = obj.city
        this.adresse = obj.adresse
        this.phone = obj.phone
        this.image = obj.image
        this.description = obj.description
        this.statut = obj.statut
        this.last_paiement_date = obj.last_paiement_date
        this.last_expire_date = obj.last_expire_date
        this.on_pause_days = obj.on_pause_days
        this.left_to_pay = obj.left_to_pay
        this.id_Subscription = obj.id_Subscription

    }
}