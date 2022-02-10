import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState("all");

  const onChangeType = (e) => {
    setFilters(e.target.value)
  }

  const onFindPetsClick = () => {
    if (filters === "all") {
      fetch('http://localhost:3001/pets')
      .then(r=>r.json())
      .then(setPets)
    } else {
      fetch(`http://localhost:3001/pets?type=${filters}`)
      .then(r=>r.json())
      .then(setPets)
    }
  }

  const onAdoptPet = (pet) => {
    const newPetArr = pets.map((currentPet) => {
      if (pet.id === currentPet.id) {
        currentPet.isAdopted = !pet.isAdopted
      } 
      return currentPet
    })
    setPets(newPetArr)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
