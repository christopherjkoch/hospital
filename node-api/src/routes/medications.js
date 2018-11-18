var express = require('express');
var router = express.Router();
const { sql, request } = require('../lib/database');

/* GET medications for patient. */
router.get('/:id', async function (req, res, next) {

  const { id } = req.params;
  const dbreq = await request();
  await dbreq.input('id', sql.Int, id)
    .query('select * from hospital.dbo.medication where patientId = @id')
    .then(result => {
      res.send(result.recordset);
    }).catch(next);
});

module.exports = router;
