import { useEffect, useState } from "react";
import SightingRow from "./SightingRow";

function ListSightings() {
  const [sightings, setSightings] = useState([]);

  const getSightings = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sightings");
      const sightings = await response.json();
      setSightings(sightings);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteSighting = async (sighting_id) => {
    try {
      const deleteSighting = await fetch(
        `http://localhost:8080/api/sighting/delete/${sighting_id}`,
        { method: "DELETE" }
      );
      console.log(deleteSighting);
      setSightings(
        sightings.filter((sighting) => sighting.sighting_id !== sighting_id)
      );
    } catch (error) {
      console.error(error.message);
    }
  };
//   const detailsSighting = async (sighting_id) => {
//     try {
//         const detailsSighting = await fetch(
//             `http://localhost:8080/api/sighting/details/${sighting_id}`,
//             { method: "GET" }
//         );
//         console.log(detailsSighting);
//         setSightings(
//             sightings.filter((sighting) => sighting.sighting_id !== sighting_id)
//         );
//     } catch (error) {
//         console.error(error.message);
//     }
// };


  useEffect(() => {
    getSightings();
  }, []);

  return (
    <div className="main-table">
      <table>
        <thead>
          <tr>
            <th className="col col-nickname">Nickname</th>
            <th className="col col-name">Common Name</th>
            <th className="col col-health">Health Status</th>
            <th className="col col-location">Location</th>
            <th className="col col-date-time">Date and Time Seen</th>
            <th className="col col-details">More details</th>
            <th className="col col-delete">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sightings
            .map((sighting) => (
              <SightingRow
                key={sighting.sighting_id}
                sighting_id={sighting.sighting_id}
                nickName={sighting.name}
                commonName={sighting.common_name}
                isHealthy={sighting.healthy}
                lastSeen={sighting.last_seen}
                location={sighting.location}

                deleteSighting={deleteSighting}
              />
            ))
            .reverse()}
        </tbody>
      </table>
    </div>
  );
}

export default ListSightings;