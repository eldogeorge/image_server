// CMAS 5 till to 14 line, then goto index.js
const mongoose= require('mongoose')
// asym.connect portName.URLName
mongoose.connect(process.env.baseUrl,{
// parser issue, remove connect error
useNewUrlParser:true,
//topology issue,
useUnifiedTopology:true
}).then(()=>{
console.log('--------- MongoDB Atlas Connected ---------');

}).catch((err)=>{
console.log(`--------- MongoDB Atlas Connection Error ---------${err}`);
})