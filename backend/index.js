import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

const app = express();
const PORT = 3000;
const saltRounds = 10;

env.config();

app.use(
    session({
        secret : process.env.SESSION_SECRET,
        resave : false,
        saveUninitialized : true,
    })
);

app.use(passport.initialize());
app.use(passport.session())

const pool = new pg.Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized : false,
    }
})
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err.stack));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");

// Set views directory (e.g., frontend/html or just frontend/views)
app.set("views", path.join(__dirname,"..","public", "html"));

// Serve static files (css, js, images) from a folder
app.use(express.static(path.join(__dirname, "..","public", "css")));

app.use('/js', express.static(path.join(__dirname, '..','public', 'js')));

app.use("/Services_pics", express.static(path.join(__dirname, "..","public", "Services_pics")));
 
app.use("/pics", express.static(path.join(__dirname,"..","public","pics")))

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", (req,res) => {
    if(req.isAuthenticated()){
    res.render("index");
    } else {
        res.redirect("/register");
    }
})

app.get("/Services", (req,res)=> {
    res.render("Services");
})

app.get("/ServiceProvider",(req,res) => {
    res.render("Services_SPpage")
})

app.get("/bookService",(req,res) => {
    res.render("bookService");
})

app.get("/ServiceProviderDetails",async(req,res) => {
    const id = req.query.id;
    try {
        const result = await pool.query("SELECT * from service_providers WHERE id = $1",[id]);
        if(result.rows.length > 0){
            const providerDetails = result.rows[0];
            res.render("serviceProvider",{
                providerDetails,
            })
        } else {
            console.log(" no ID found");
        }
    } catch(err){
        console.log(err);
    }
    
})

app.get("/list",async(req,res)=> {
    const service = req.query.service;
    try {
        const result = await pool.query("SELECT  * from service_providers WHERE serviceprovided = $1",[service]);
        if(result.rows.length > 0){
            const serviceProviders = result.rows;
            res.render("workplace",{
                serviceProviders,
                service,
    })
        } else {
            res.render("workplace",{
                error : "No company avaliable",
                service,
            })
        }
    }catch(err){

    }
})
    

app.get("/ServiceProviderForm",(req,res)=> {
    const service = req.query.service;
    res.render("ServiceProviderForm",{
        service,
    })
})
app.get("/register", (req,res)=> {
    res.render("register");
})
app.get("/auth/google", passport.authenticate("google", {
  scope : ["profile", "email"],
}))

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect : "/",
  failureRedirect : "/login", 
}))

app.post("/login",passport.authenticate("local",{
    successRedirect : "/",
    failureRedirect : "/login"
}))

app.post("/register",async(req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    try {
        const checkResult = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        if(checkResult.rows.length > 0){
            res.redirect("/login");
        } else {
            bcrypt.hash(password,saltRounds, async(err,hash) => {
                if(err){
                    console.error("Error hashing password:",err);
                } else {
                    const result = await pool.query(
                        "INSERT INTO users (username , email, password) VALUES ($1,$2,$3) RETURNING *",[username,email,hash]);
                         const user = result.rows[0];

      req.login(user, function (err) {
        if (err) {
          console.error("Login after registration failed:", err);
          return res.redirect("/login");
        } else {
        return res.redirect("/");
        }
      });
                }
            })
        }
    } catch(err){
        console.log(err);
    }
})
app.get("/login", (req,res) => {
    res.render("login");
})

passport.use(new Strategy({
     usernameField: 'email',
  passwordField: 'password'
},
    async function verify(email,password,cb){
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        if(result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            bcrypt.compare(password,storedHashedPassword,(err,valid)=> {
                if(err){
                    console.log("error comparing passwords",err);
                    return cb(err);
                } else {
                    if(valid){
                        return cb(null,user);
                    } else {
                        return cb(null,false);
                    }
                }
            })
        } else {
            return cb("User not Found");
        }
    }catch(err){
        console.log(err);
    }
}))
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

app.post("/serviceProvider",async(req,res) => {
    const companyName = req.body.companyName;
     const Location = req.body.Location;
      const Expertise = req.body.Expertise;
       const Details = req.body.Details;
        const service = req.body.serviceProvided;
        try{
            const result = await pool.query("SELECT * FROM service_providers WHERE companyname = $1",[companyName]);
            if(result.rows.length > 0){
                res.render("ServiceProviderForm",{
                    error : "company already exists"
                })
            } else {
                const result = await pool.query("INSERT into service_providers(companyname,location,serviceprovided,details,expertise) VALUES($1,$2,$3,$4,$5)",[companyName,Location,service,Details,Expertise]);
                res.redirect(`/list?service=${service}`)
            }
        }catch(err){
            console.log(err);
        }
    
})

passport.use("google", new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : "https://fouryou-0vrf.onrender.com/auth/google/callback",
    userProfileURL : "https://www.googleapis.com/oauth2/v3/userinfo"
}, async (accessToken, refreshToken, profile, cb) => {
  console.log(profile); 
  try{
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [profile.email]);
    if(result.rows.length === 0){
      const newUser = await pool.query("INSERT INTO users (username,email, password) VALUES ($1, $2, $3) RETURNING *",[profile.name,profile.email, "google"])
      console.log(newUser);
      cb(null, newUser.rows[0]);
    } else {
      cb(null, result.rows[0]);
    }
  } catch(err) {
    cb(err);
  }
})
);

passport.serializeUser((user,cb)=> {
    cb(null, user);
});

passport.deserializeUser((user,cb)=> {
    cb(null, user);
});

app.listen(PORT, ()=> {
    console.log(`Running on port ${PORT}`);
})