const express=require('express');
const router=express.Router();
const Pusher = require('pusher');
const mongoose= require('mongoose');
const Vote = require('../models/Vote')
const pusher = new Pusher({
    appId: '1079533',
    key: '6306b08bda5cf3c2eb33',
    secret: '0da26e7abc6898bddc58',
    cluster: 'eu',
    encrypted: true
  });

router.get('/',(req,res)=>{
    Vote.find().then(votes=>res.json({votes:votes}))
});



router.post('/',(req,res)=>{
    console.log(req.body)

    const newVote={
      points:1,
      os:req.body.cars
    }
    new Vote(newVote).save().then(Vote=>{
      console.log(1111111,Vote)
      pusher.trigger('Cars-poll', 'Cars-vote', {
        points:parseInt(Vote.points),
        os:Vote.os

      })
    })
  
      return res.json({success:true,message:'thanks for your vote'});
})


module.exports=router