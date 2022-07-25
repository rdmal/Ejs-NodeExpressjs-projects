import express from 'express'
const router = express.Router();
let teams = []
const addDefaultteams = () => {
    teams = [
        { "id": 1, "tname": "Phillys", "state": "PA" },
        { "id": 2, "tname": "Eagles", "state": "PA" },
        { "id": 3, "tname": "Panthers", "state": "Carolina" },
        { "id": 4, "tname": "Falcons", "state": "Atlanta" },
        { "id": 5, "tname": "Jets", "state": "NewYork"}
    ]
}
console.log("teams.length="+ teams.length)
if (teams.length == 0) 
    addDefaultteams();
const queryteams = (request, response) => {
    console.log('queryteams: teams=' + JSON.stringify(teams))
    response.send(teams);
}
const queryteam = (request, response) => {
    const { id } = request.params;
    let team = teams.find(team => team.id == id)
    console.log('queryteam: team=' + JSON.stringify(team) + ", id=" + id);
    response.send(team);
}
const insertteam = (request, response) => {
    let team = request.body;
    teams = [...teams, team]
    console.log('insertteam: team=' + JSON.stringify(team))
    response.send({ "rows": 1 });
}
const deleteteam = (request, response) => {
    const { id } = request.params;
    teams = teams.filter(team => team.id != id)
    console.log('deleteteam: id=' + id);
    response.send({ "rows": 1 });
}

const updateteam= (request, response) => {
    const { id } = request.params;
    const { tname } = request.body;
    const { state } = request.body;
    let team = teams.find(team => team.id == id)
    if (!team) {
        response.send({ "rows": 0 });
        return;
    }
    if (tname) team.tname = tname;
    if (state) team.state = state;
    response.send({ "rows": 1 });
}
router.get('/', queryteams)              // localhost:3000/teams/      GET
router.get('/:id', queryteam)            // localhost:3000/teams/123   GET
router.post('/', insertteam)             // localhost:3000/teams/      POST
router.put('/:id', updateteam)           // localhost:3000/teams/123   PUT
router.delete('/:id', deleteteam)        // localhost:3000/teams/123   DELETE
export default router