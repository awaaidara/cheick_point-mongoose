require('dotenv').config();  
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;


mongoose
.connect(process.env.MONGO_URI, {
})
.then(() => {
    console.log('MongoDB Connected');
}
)
.catch((err) => console.log(err));


// Création du schéma person
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
});
 // Création du model person
const Person = mongoose.model('Person', personSchema);
// Création et sauvegarde d'une instance de person
const person = new Person({
    name: 'John',
    age: 37,
    favoriteFoods: ['Pizza', 'Pasta']
});
person
.save()
.then(() => console.log('Person saved'))
.catch((err) => console.log(err));

// Creation de plusieurs personnes
Person.create([
    { name: 'Jane', age: 27, favoriteFoods: ['Sushi', 'Salad'] },
    { name: 'Jake', age: 47, favoriteFoods: ['Pasta', 'Salad'] },
    { name: 'Jill', age: 37, favoriteFoods: ['Pizza', 'Salad'] }
])
.then(() => console.log('People saved'))
.catch((err) => console.log(err));


//Recherche de personnes
Person.find({ name: 'Jane' })
.then((person) => console.log(person))
.catch((err) => console.log(err))
// Trouver une seule personne par son nom
Person.findOne({ name: 'Jake' })
.then((person) => console.log(person))
.catch((err) => console.log(err))

// // Trouver une personne par un de ses plats favoris
Person.findOne({ favoriteFoods: 'Pizza' })
.then((person) => console.log(person))
.catch((err) => console.log(err))

// //Trouver une personne par son id
Person.findById('603f1e4b9d7f8b0f1c7b8e3f')
.then((person) => console.log(person))
.catch((err) => console.log(err));

// Trouver une personne par son id et ajouter un plat favori
 Person.findById('67b331dc8f92b1564eeea283')
.then((person) => {
    person.favoriteFoods.push('Hamburger');
    person
    .save()
    .then(() => console.log('Person updated'))
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));

// Trouver une personne par son nom et mettre à jour son âge
Person.findOneAndUpdate({ name: 'Jane' }, { age: 20 }, { new: true })
.then((person) => console.log(person))
.catch((err) => console.log(err));

// Supprimer une personne par son Id
Person.findByIdAndDelete('67b331dc8f92b1564eeea283')
.then(() => console.log('Person removed'))
.catch((err) => console.log(err));

// Supprimer toutes les personnes dont le nom est "Mary"
Person.deleteMany({ name: 'Mary' })
.then(() => console.log(person))
.catch((err) => console.log(err));

// Requête de recherche pour trouver des personnes qui aiment le "burrito"
Person
.find({ favoriteFoods: 'Pizza' })
.sort({ name: 1 }) // Trier par ordre alphabétique
.limit(2)      // Limiter le nombre de résultats à 2
.select('-age')     // masquer l'
.exec()
.then((Person) => console.log(person))
.catch((err) => console.log(err));








app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});