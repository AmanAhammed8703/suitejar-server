const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var wordcount = require('wordcount');
const collection = require('../config/collection');
var db = require('../config/connection')
const extractUrls = require("extract-urls");
var ObjectId = require('mongodb').ObjectId;
const async = require('hbs/lib/async');
module.exports = {
    getData:(link)=>{
        return new Promise((resolve,reject)=>{

            let count,urls
            fetch(link)
            .then(function(res) {
                return res.text();
            }).then(function(body,count,urls) {
                
                count=wordcount(body)
                urls=extractUrls(body)
                
                let data={
                    link:link,
                    words:count, 
                    favourite:"false",
                    urls:urls
                }
                db.get().collection(collection.INSIGHT_COLLECTION).insertOne(data).then(()=>{
                    resolve()
                })
                // perform word-count here
            });
            
           
        })

    },
    fetchData:()=>{
        return new Promise(async(resolve,reject)=>{
            let data=await db.get().collection(collection.INSIGHT_COLLECTION).find().sort({_id:-1}).toArray()
            resolve(data)
        })
    },
    addFavourite:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.INSIGHT_COLLECTION).updateOne({_id:ObjectId(id)},{$set:{favourite:"true"}}).then(()=>{
                resolve()
            })
        })
    },
    removeInsight:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.INSIGHT_COLLECTION).deleteOne({_id:ObjectId(id)}).then(()=>{
                resolve()
            })
        })
    }

 

} 