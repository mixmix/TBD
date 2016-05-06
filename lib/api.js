var request = require('superagent')

request.post('http://localhost:3000/locations/getFeed')
  .send({ city:"Wellington" })
  .end(function(err,res){
    console.log(res.text)
  })
