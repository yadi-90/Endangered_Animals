const express = require('express');
const cors = require('cors');
const db = require('./db/db-connection');
const { application } = require('express');

const app = express();
app.use(cors());
app.use(express.json());


//set up the port for the server
const PORT = process.env.PORT || 8080;

//create an endpoint for the route/api
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from  my ExpressJS!' });
});

//get all the species
app.get('/api/species', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM species');
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                species: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//get sightings
app.get("/api/sightings", async (req, res) => {
    try {
      const allSightings = await db.query(
        "SELECT sightings.sighting_id, sightings.date_time as last_seen, sightings.health, sightings.location, individuals.nick_name as name, species.common_name, species.scientific_name FROM sightings LEFT JOIN individuals ON individuals.individual_id = sightings.individual_id LEFT JOIN species ON species.species_id = individuals.species_id"
      );
      res.json(allSightings.rows);
    } catch (error) {
      console.error(error.message);
    }
  });

  // ADD sighting to sightings table
  app.post("/api/sightings/add", async (req, res) => {
    console.log(req.body);
    try {
        const { date_time, individual_id, health, location,email } = req.body;
        const newSighting = await db.query(
            "INSERT INTO sightings (date_time, individual_id, health, location, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [date_time, individual_id, health, location, email]
        );
        res.json(newSighting.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//delete a sighting
app.delete("/api/sightings/delete/:sightingId", async (req, res) => {
    try {
       let {sightingId} = req.params;
       const deleteSighting = await db.query(
              "DELETE FROM sightings WHERE sighting_id = $1",
                [sightingId]
            );
            res.json("Sighting  with id ${sightingId} was deleted!");
    } catch (error) {
        console.error(error.message);
    }
});



//listen to the port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
} );

