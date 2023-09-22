import { useState } from "react";
import { SightingForm } from "./SightingForm";
import "/Users/moralesfamily/Desktop/EndangeredAnimals/client/src/App.css"


function AddSighting() {
  const [show, setShow] = useState(false);

  const handleAddClick = () => setShow(!show);

  const addSighting = async (e, newSighting) => {
    e.preventDefault();
    try {
      const body = newSighting;
      const addSighting = await fetch(
        "http://localhost:8080/api/sighting/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(addSighting);
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    <img src="images/Mexico_Header_IMG.png" alt="Mexico Header" className="header-img" />
      <button onClick={handleAddClick} className="btn btn-add">
        Add Sighting
      </button>
      {show ? (
        <SightingForm setShow={setShow} addSighting={addSighting} />
      ) : null}
    </>
  );
}

export default AddSighting;