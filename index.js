const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/addData", (req, res) => {
  const { name, money } = req.body;

  if (!name || !money) {
    return res.status(400).json({ error: "Name and money are required" });
  }

  // Pfad zur JSON-Datei
  const filePath = "data.json";

  // Überprüfen, ob die Datei existiert
  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  // Neuen Eintrag hinzufügen
  data.push({ name, money });

  // Daten in die JSON-Datei schreiben
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ message: "Data added successfully" });
});

app.get("/getData", (req, res) => {
  // Pfad zur JSON-Datei
  const filePath = "data.json";

  // Überprüfen, ob die Datei existiert
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "No data found" });
  }

  // Daten aus der JSON-Datei lesen
  const data = JSON.parse(fs.readFileSync(filePath));

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
