export const admingauth = (req, res, next) => {
    console.log("First response from middleware");
    
    const token = req.headers.authorization || ""; 
    const isAuthorized = token === "valid"; 
  
    if (isAuthorized) {

      res.status(403).send("Ohhh, invalid arguments");
    } else {
      next();
    }
  };
  