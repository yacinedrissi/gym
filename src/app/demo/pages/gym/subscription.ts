export class Subscription {

    id:number = 0
    name:string = ""
    id_gym:number = 0
    price:number = 0

    copySubscriptionObj(obj: Subscription) {
    
    this.id = obj.id
    this.name = obj.name
    this.id_gym = obj.id_gym
    this.price = obj.price
    
    
    }
}