const MongoClient=require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect=function(done){
    const url='mongodb+srv://suitejar:suitejar@cluster0.fnsgu.mongodb.net/?retryWrites=true&w=majority'
    const dbname='suitejar'

    MongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        
        done()
    })
}

module.exports.get=function(){
    return state.db
}