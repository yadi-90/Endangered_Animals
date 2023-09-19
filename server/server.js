const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


//set up the port for the server
const PORT = process.env.PORT || 8080;

//create an endpoint for the route/api
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from  my ExpressJS!' });
});

//get all the species
app.get('/species', (req, res) => {
    const species={species: "Bears"}
    res.json({ species});
});


//listen to the port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
} );

