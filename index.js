const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())//parsea body si no ponemos esto req.body es undefined

app.use("/categories",require("./routes/categories.js"));
app.use("/products",require("./routes/products.js"));
app.use("/reviews",require("./routes/reviews.js"))

app.listen(PORT,()=> console.log("Servidor levantado en el puerto "+PORT))