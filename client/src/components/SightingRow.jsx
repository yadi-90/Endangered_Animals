function SightingRow({
    commonName,
    isHealthy,
    lastSeen,
    location,
    nickName,
    sighting_id,
    deleteSighting,
    scientificName,
  }) {
    return (
      <tr>
        <td>{nickName}</td>
        <td>{commonName}</td>
        <td>{isHealthy ? "Healthy" : "Unhealthy"}</td>
        <td>{location}</td>
        <td>{new Date(lastSeen).toLocaleString()}</td>
        <td>
          <button className="btn btn-details"
          onClick={()=>detailSighting(sighting_id)}>Details</button>
        </td>
        <td>
          <button
            className="btn btn-delete"
            onClick={() => deleteSighting(sighting_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
  
  export default SightingRow;