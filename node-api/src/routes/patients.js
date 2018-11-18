var express = require('express');
var router = express.Router();
const { sql, request } = require('../lib/database');
const { check, validationResult } = require('express-validator/check');




/* GET patient listing. */
router.get('/', async function (req, res, next) {
  const dbreq = await request();
  await dbreq.query('select * from hospital.dbo.patient')
    .then(result => {
      res.send(result.recordset);
    }).catch(next);
});

/* GET single patient. */
router.get('/:id', async function (req, res, next) {

  const { id } = req.params;
  const dbreq = await request();
  await dbreq.input('id', sql.Int, id)
    .query('select * from hospital.dbo.patient where id = @id')
    .then(result => {
      res.send(result.recordset[0]);
    }).catch(next);
});


router.put('/', [
  check('firstName').matches(/^[a-zA-Z '-]+$/).withMessage('First name must only contain A-Za-z spaces, hyphens, and apostrophes').isLength({ max: 50 }).withMessage('First name can not exceed 50 characters').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  check('lastName').matches(/^[a-zA-Z '-]+$/).withMessage('Last name must only contain A-Za-z spaces, hyphens, and apostrophes').isLength({ max: 50 }).withMessage('Last name can not exceed 50 characters').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  check('town').matches(/^[a-zA-Z '-]+$/).withMessage('Town must only contain A-Za-z spaces, hyphens, and apostrophes').isLength({ max: 50 }).withMessage('Town can not exceed 50 characters').isLength({ min: 2 }).withMessage('Town must be at least 2 characters'),
  check('temperature').matches(/^\d+\.\d{1}$/).withMessage('Temperature must only contain numbers with one decimal place'),
  check('pulse').matches(/^\d+$/).withMessage('Pulse must only contain number')
], async function (req, res, next) {  

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({status: false, errors: errors.array(), patientId: null });
  }  

  var query = `UPDATE hospital.dbo.patient
    SET [FirstName] = @FirstName
       ,[LastName] = @LastName
       ,[Town] = @Town
       ,[Temperature] = @Temperature
       ,[Pulse] = @Pulse
    WHERE Id = @Id;`;
  
  const dbreq = await request();
  await dbreq
    .input('FirstName', sql.VarChar(50), req.body.firstName)
    .input('LastName', sql.VarChar(50), req.body.lastName)
    .input('Town', sql.VarChar(50), req.body.town)
    .input('Temperature', sql.Decimal(5,1), req.body.temperature)
    .input('Pulse', sql.Int, req.body.pulse)
    .input('Id', sql.BigInt, req.body.Id)
    .query(query)
    .then(result => {
      console.log('update successful');
      res.json({status: true, errors: errors.array(), patientId: null });
    }).catch(next);
});

module.exports = router;
