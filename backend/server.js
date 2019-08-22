const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');


const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();


//Establezco la conexion con la base
require('./lib/connectMongoose');

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/agentes', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/newData', function(req, res, next){
  console.log(req.body);
  let data = new Data(req.body);
  data.save((err, agenteGuardado)=>{
    if (err) return next(err);
    res.json({ok:true, data:agenteGuardado});
  });
});

router.put('/edit/:id', function(req, res, next){
  var id = req.params.id;
  Data.findOneAndUpdate({_id: id}, req.body, function(err, data){
    if(err){
      return next(err);
    }
    res.json({ok: true, agente: data});
  });
});

router.delete('/delete/:id', function(req, res){
  console.log(req.params.id);
  var id = req.params.id;
  Data.findOneAndDelete({_id: id}, function(err, result){
    if(err){
      return next(err);
    }
    res.json({ok: true, result: result, params: req.params});
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

