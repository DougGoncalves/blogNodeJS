if(process.env.NODE_ENV == 'production'){
  module.exports = {mongoURI: 'mongodb+srv://doug_goncalves:maomao13@blogapp-prod-wjhkv.mongodb.net/test?retryWrites=true&w=majority'}
}else{
  module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}