require('dotenv').config();
const mySecret = process.env['MONGO_URI']
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const validator = require('validator');

const personSchema = new Schema({
    name: String,
    age: Number,
    favoriteFoods: [String],
});
const Person = mongoose.model('Person' , personSchema);

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true } , console.log('mongoDB is connected')
);



const createAndSavePerson = function (done) {
    const person = new Person({
        name:'Stephen Awuah',
        age:20,
        favoriteFoods:['apple' ,'burrito']
    });
    
    person.save( (err, data) => {
       if(err) return console.error(err)
       done(null , data);
       console.log(data)        
   });
};
 


const createManyPeople = (arrayOfPeople, done) => {
    var people = [
     {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
     {name: "Sol", age: 76, favoriteFoods: ["burrito"]},
     {name: "Robert", age: 78, favoriteFoods: ["wine"]}
    ];

    //var createManyPeople = function(arrayOfPeople, done) {
     Person.create(arrayOfPeople,  (err, people)=> {
    if (err) return console.log(err);
    done(null, people);
     });
   // };
};


const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, function(err, people) {
    if (err) {
      return console.log(err);
    }
    done(null, people);
  });
    
 
};

const findOneByFood = (food, done) => {

    
    Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
    });
};

const findPersonById = (personId, done) => {
    Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
    });
    //done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";


  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};



const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
     Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true},(err, updatedDoc) =>{
    if(err) return console.log(err);
    done(null, updatedDoc);
    })

};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId , function (err, data) {
    if (err) return console.log(err);
    done(null, data)
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
    })
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

      Person
    .find({ favoriteFoods: foodToSearch })
    .sort({name : 'asc'})
    .limit(2)
    .select('-age')
    .exec(function(err, data) {
      if (err) {
        return done(err);
      }
      done(null, data);
    });

};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
