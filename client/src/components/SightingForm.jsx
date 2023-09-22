import { useEffect, useState } from "react";

const SightingForm = ({ setShow, addSighting }) => {
  // create addSighting object to track user input

  const [newSighting, setNewSighting] = useState({
    date_time: "",
    individual_id: "",
    location: "",
    health: "",
    email: "",
  });

  // create a state to keep track of the species -> this will store species_id number
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  // get all species for dropdown
  const [species, setSpecies] = useState([]);

  // get all individuals of a certain species  --> array
  const [individualsOfSpecies, setIndividualsOfSpecies] = useState([]);

  // get species on first render
  const getSpecies = async () => {
    const response = await fetch("http://localhost:8080/api/species");
    const species = await response.json();
    setSpecies(species);
  };

  useEffect(() => {
    getSpecies();
  }, []);

  // when selectedSpecies is updated, make this request
  // get all individuals of a specific species type when the selectedSpecies state is updated
  useEffect(() => {
    const getIndividualsOfSpecies = async () => {
      const response = await fetch(
        `http://localhost:8080/api/individuals/${selectedSpecies}`
      );
      const individuals = await response.json();
      console.log(individuals);
      setIndividualsOfSpecies(individuals);
    };

    if (selectedSpecies) {
      getIndividualsOfSpecies();
    } else {
      setIndividualsOfSpecies([]);
    }
  }, [selectedSpecies]);

  // handle Input
  const handleChange = (sightingProperty) => {
    return (e) => {
      console.log(e.target);
      console.log(e.target.value);
      setNewSighting({ ...newSighting, [sightingProperty]: e.target.value });
    };
  };

  useEffect(() => console.log(newSighting), [newSighting]);

  return (
    <div className="modal">
      <div className="modal-content FormPage">
        <div className="modal-header">
          <h3 className="modal-title">Add Sighting Information</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => addSighting(e, newSighting)}>
            <fieldset>
              <legend>Please enter the individual animal information</legend>
              <div className="common-name-form">
                <label htmlFor="common-name">Select Common Name:</label>
                <select
  name="commonName"
  id="common-name"
  onChange={(e) => setSelectedSpecies(e.target.value)}
  required
>
  <option value="null">Select One</option>
  {species.length > 0 ? (
    species.map((s) => (
      <option key={s.species_id} value={s.species_id}>
        {s.common_name}
      </option>
    ))
  ) : (
    <option>Loading...</option>
  )}
</select>

              </div>

              {/* nickname and getting individual id */}
              <div className="nick-name-form">
                <label htmlFor="nickName">Nick Name:</label>
                <select
                  name="nickName"
                  id="nickName"
                  value={newSighting.individual_id}
                  onChange={handleChange("individual_id")}
                  required
                >
                  <option value="null">Select One</option>
                  {individualsOfSpecies.map((ind) => (
                    <option key={ind.individual_id} value={ind.individual_id}>
                      {ind.nick_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* getting isHealthy */}
              <div className="health-form">
                <label htmlFor="healthy">Health Status</label>
                <select
                  name="healthy"
                  id="healthy"
                  value={newSighting.health}
                  onChange={handleChange("healthy")}
                  required
                >
                  <option value="null">Select One</option>
                  <option value="true">Healthy</option>
                  <option value="false">Unhealthy</option>
                </select>
              </div>

              {/* LOCATION */}
              <div className="location-form">
                <label htmlFor="location">Location</label>
                <textarea
                  id="location"
                  name="location"
                  value={newSighting.location}
                  onChange={handleChange("location")}
                  required
                />
              </div>
            </fieldset>

            {/* OBSERVER INFO */}
            <fieldset className="observer-info">
              <legend>Please give observer information</legend>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={addSighting.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>
            </fieldset>
            <div className="modal-footer">
              <button type="submit" className="btn btn-submit FormSubmit">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-close FormSubmit"
                onClick={() => setShow(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { SightingForm }; 
