let express = require("express");
let server = express();
server.use(express.json());

let projects = [];
let totalRequisicoes = 0;

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  if (!project) {
    return res.status(400).json({ error: "Projeto nao existe" });
  }
  next();
}

server.use((req, res, next) => {
  totalRequisicoes++;
  console.log("Total requisicoes: " + totalRequisicoes);
  next();
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  projects.push({ id: id, title: title, tasks: [] });
  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => id === p.id);
  console.log(project);
  project.title = title;
  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(project => id === project.id);
  project.tasks.push({ title: title });
  return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  projects = projects.filter(project => id != project.id);
  return res.json(projects);
});

server.listen(3000);
