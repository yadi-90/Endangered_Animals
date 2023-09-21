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
        "SELECT sightings.sighting_id, sightings.date_time as last_seen, sightings.healthy, sightings.location, individuals.nick_name as name, species.common_name, species.scientific_name FROM sightings LEFT JOIN individuals ON individuals.individual_id = sightings.individual_id LEFT JOIN species ON species.species_id = individuals.species_id"
      );
      res.json(allSightings.rows);
    } catch (error) {
      console.error(error.message);
    }
  });



//listen to the port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
} );

