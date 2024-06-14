// import animals, { useAnimals } from "./data";

// //Destructuring Arrays
// // console.log(animals);
// const [cat, dog] = animals;
// // console.log(cat);

// const [animal, makeSound] = useAnimals(cat);
// console.log(animal);
// makeSound();

// //Destructuring Objects
// // const { name, sound} = cat;
// // const { name: catName, sound: catSound } = cat;
// // const { name = "Fluffy", sound = "Purr" } = cat;
// // const {feedingRequirements: {food, water} } = cat;
// // console.log(food);

// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

//Destructing array indexes to individual varaible
const [tesla, honda] = cars;

/*
 Destructing object by assigning varaible names of same  
 variable names in original object and also modifying to
 assign data to custom varaible
*/
const {
  coloursByPopularity: teslaColors,
  speedStats: { topSpeed: teslaTopSpeed },
} = tesla;
const [teslaTopColour] = teslaColors;

const {
  coloursByPopularity: hondColors,
  speedStats: { topSpeed: hondaTopSpeed },
} = honda;
const [hondaTopColour, hondaTopColour2] = hondColors;

//or

// const {
//   speedStats: { topSpeed: hondaTopSpeed },
// } = honda;
// const {
//   speedStats: { topSpeed: teslaTopSpeed },
// } = tesla;

// const {
//   coloursByPopularity: [hondaTopColour],
// } = honda;
// const {
//   coloursByPopularity: [teslaTopColour],
// } = tesla;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Top Color</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
