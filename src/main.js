import express from "express";
const main = express();

main.use("/login", (req, res) => {
  res.send(" hello futh team  ");
});
main.use("/footer", (req, res) => {
  res.send(" hello from the namste dev tinder backend  from the the  fotter ");
});
main.post(
  "/user",

  (req, res, next) => {
    console.log(" fusrt response");
    next();

    // res.send("  first responce  1  ");
  },
  (req, res, next) => {
    console.log(" responce number 2");
    //   res.send("    responce number 2 ");
    next();
  },
  (req, res, next) => {
    console.log(" responce number 3");
    next();

    // res.send("    responce number 3 ");
  }
);

main.use("/header", (req, res, next) => {
  console.log(" responce number 1");
  res.send("    responce number 1  ");
});

main.use("", (req, res, next) => {
  console.log(" responce number 2 ");
  res.send(" responce number 2     ");
});

main.use("/body", (req, res, next) => {
  console.log("responce number 3");

  res.send("responce number 3");
});
main.listen(7777, () => {
  console.log("Server is running on port 7777");
});
console.log(" server");
