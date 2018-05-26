class Pet {
  constructor(animal, age, breed, sound){
    this.animal = animal;
    this.age = age;
    this.breed = breed;
    this.sound = sound;
  }
  //getter and setter methods:
  get activity(){
    const today = new Date();
    const hour = today.getHours();
    if(hour > 8 && hour <= 20){
      return 'playing';
    }else {
      return 'sleeping';
    }
  }
  get owner(){
    return this._owner;
  }
  set owner(name){
    this._owner = name;
    console.log(`setter called: ${name}`)
  }
  //note that when you create methods inside a class you dont use
  //the 'function' key word:
  speak(){
    console.log(this.sound);
  }
}
class Owner {
  constructor(name, address){
    this.name = name;
    this.address = address;
  }
  set phone(num){
    //regular expression to get rid of all chars that arent numbers
    const phoneNormalized = num.replace(/[^0-9]/g, '');
    this._phone = phoneNormalized;
  }
  get phone(){
    return this._phone;
  }
}

const gizmo = new Pet('dog',1,'pomeranian','bark');
const Zoey = new Pet('dog',8, 'pomeranian','bark');


gizmo.owner = new Owner('Jonathan', '123 main Street');
gizmo.owner.phone = '(971)-555-5555';
console.log(gizmo.owner.name);
console.log(gizmo.owner.phone);
