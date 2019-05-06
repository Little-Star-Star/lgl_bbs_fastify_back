

let newsCommentCount = async () =>{
  const model_news = require('../models/news')
  const model_newsComment = require('../models/newsComment')
  const allNews =await model_news.find({},{_id:1,"statics.comment":1})
  for(let d of allNews){
    const newsComment = await model_newsComment.find({'newsId':d.id})
    let count = newsComment.length
    for(let d1 of newsComment){
      count += d1.replyData.length
    }
    d.statics.comment = count
    d.save((err,rr)=>{
      if(err) throw err
      console.log(count)
    })
  }
}
module.exports = newsCommentCount