const express = require("express");
const { Connection } = require("../postgres");
const router = express.Router();

router.get("/delitos_genero", async (req, res) => {
  Connection.db.query('SELECT * FROM public.delitos_genero')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_violentos", async (req, res) => {
  Connection.db.query('SELECT * FROM public.delitos_violentos')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

module.exports = router;