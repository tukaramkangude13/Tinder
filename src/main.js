import express from 'express';
const main = express();


main.use("/login",(req,res)=>{
    res.send(" hello futh team  ")
})
main.use("/footer",(req,res)=>{
    res.send(" hello from the namste dev tinder backend  from the the  fotter " )
})
main.use("/header",(req,res)=>{
    res.send(" hello from the namste dev tinder backend  head of the project   ")
})
main.use("",(req,res)=>{
    res.send(" hello from the namste     ")
})
main.use("/body",(req,res)=>{
    res.send("hello")
})
main.listen(7777, () => {
  console.log('Server is running on port 7777');
});
console.log(" server");