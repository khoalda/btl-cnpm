const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;
const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));

//HTTP logger
app.use(morgan("combined"));

//template engine
app.engine('hbs', handlebars({
  extname:'.hbs',
  helpers:{
    sum: (a, b) => a + b,
    mul: (a, b) => a*b,
  }
}))

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource/views"));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
