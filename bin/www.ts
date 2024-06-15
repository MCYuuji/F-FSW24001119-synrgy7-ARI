import app from "../app"
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`app listen on http://localhost:${port}`))