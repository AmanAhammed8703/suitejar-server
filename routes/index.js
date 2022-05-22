var express = require('express');
var router = express.Router();
var helper = require('../helpers/helper')


/* GET home page. */
router.post('/addInsight', function(req, res) {
 
  const link=req.body.link
  helper.getData(link).then(()=>{
    res.status(200).json({message:"insight added"})
  })
  
});
router.get('/getInsight',(req,res)=>{
  helper.fetchData().then((response)=>{
   
    res.status(200).json({data:response})
  })
})
router.patch('/addFavourites',(req,res)=>{
  let id=req.body.id
  helper.addFavourite(id).then(()=>{

    res.status(200).json({message:"favourite added"})
  })
}) 
router.post('/removeInsight',(req,res)=>{
  let id=req.body.id
  helper.removeInsight(id).then(()=>{
    res.status(200).json({message:"removed"})     
  })
}) 

module.exports = router; 
 