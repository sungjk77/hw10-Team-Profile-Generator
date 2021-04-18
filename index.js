const filename = `./dist/team.html`;

const inquirer = require("inquirer");
const fs = require('fs');
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
idNum = 0;

let listManager = [];
let listEngineer = [];
let listIntern = [];
let innHTML=``;

const jared = new Manager("Jared", 1, "jared@fakemail.com", 1);
const alec = new Engineer("Alec", 2, "alec@fakemail.com", "ibealec");
const grace = new Engineer("Grace", 3, "grace@fakemail.com", "gchoi2u");
const tammer = new Engineer("Tammer", 4, "tammer@fakemail.com", "tammerg");
const john = new Intern("John", 5, "john@fakemail.com", "2University");

// listManager.push(jared);
// listEngineer.push(alec);
// listEngineer.push(grace);
// listEngineer.push(tammer);
// listIntern.push(john);

function askQuestion() {
    inquirer.prompt([
        {
            message: "What would you like to do next?",
            type: "list",
            name: "question",
            choices: ["Add an Engineer", "Add an Intern", "Finish building my team"]
        }
    ]).then(answers => {
        switch (answers.question) {
            case "Add an Engineer":
                console.log("Add an Engineer")
                addEngineer();
                break;
            case "Add an Intern":
                console.log("Add an Intern")
                addIntern();
                break;
            case "Finish building my team":
                console.log("Finish building my team")
                generateHTML();
                break;
            default:
                break;
        }
    })
}

function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is your Manager's Name?`,
            name: 'mName',
        },
        {
            type: 'input',
            message: `What is your Manager's email?`,
            name: 'mEmail',
        },
        {
            type: 'input',
            message: `What office number will they be assigned?`,
            name: 'mOfficenum',
        },
    ]).then(answers => {
        const {mName,mEmail,mOfficenum} = answers;
        console.log(answers)
        idNum++;
        const manager = new Manager(mName, idNum, mEmail, mOfficenum);
        listManager.push(manager);
        console.log(listManager);
        askQuestion();
    });
}
function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is your Engineer's Name?`,
            name: 'eName',
        },
        {
            type: 'input',
            message: `What is your Engineer's email?`,
            name: 'eEmail',
        },
        {
            type: 'input',
            message: `What is your Engineer's Github?`,
            name: 'eGithub',
        },
    ]).then(answers => {
        const {eName,eEmail,eGithub} = answers;
        console.log(answers)
        idNum++;
        const engineer = new Engineer(eName, idNum, eEmail, eGithub);
        listEngineer.push(engineer);
        askQuestion();
    });
}

function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is your Intern's Name?`,
            name: 'iName',
        },
        {
            type: 'input',
            message: `What is your Intern's email?`,
            name: 'iEmail',
        },
        {
            type: 'input',
            message: `What is your Intern's school?`,
            name: 'iSchool',
        },
    ]).then(answers => {
        const {iName,iEmail,iSchool} = answers;
        console.log(answers)
        idNum++;
        const intern = new Intern(iName, idNum, iEmail, iSchool);
        listIntern.push(intern);
        askQuestion();
    });
}

function generateHTML() {
    innHTML += `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <title>Meet your team!</title>
</head>
<body>

    <div class="bg-success p-3 w-100">
        <h6 class="display-6 text-white text-center">My Team</h6>
    </div>
    <div class="container no-gutters">

        <div class="row" id="Managers">
            <div class="col d-flex justify-content-center p-2 ">
            <!-- This is where we put Managers  -->
`;  
    listManager.forEach(element => {
        innHTML += `
    <div class="card bg-light m-2 shadow" style="width: 15rem;">
        <div class="card-header bg-primary text-white">
            <div>${element.name}</div>
            <div><i class="fas fa-mug-hot"></i> Manager</div>
        </div>
        <div class="m-2 border">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${element.id}</li>
              <li class="list-group-item">Email: <a href="mailto:${element.email}">${element.email}</a></li>
              <li class="list-group-item">Office number ${element.officeNumber}</a></li>
            </ul>
        </div>
    </div>
`;
    });    

    innHTML +=`
            </div>
        </div>

    <!-- This is where we put Engineers  -->
    <div class="row" id="Engineers">
        <div class="col d-flex justify-content-center p-2">
`;

    //add Engineers
    listEngineer.forEach(element => {
    innHTML += `
<div class="card bg-light m-2 shadow" style="width: 15rem;">
    <div class="card-header bg-primary text-white">
        <div>${element.name}</div>
        <div><i class="fas fa-glasses"></i> Engineer</div>
    </div>
    <div class="m-2 border">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${element.id}</li>
          <li class="list-group-item">Email: <a href="mailto:${element.email}">${element.email}</a></li>
          <li class="list-group-item">Github: <a href="https://github.com/${element.github}" target="_blank">${element.github}</a></li>
        </ul>
    </div>
</div>
`;
});
        innHTML +=`
        </div>
    </div>
    <!-- This is where we put Interns  -->
    <div class="row" id="Interns">
        <div class="col d-flex justify-content-center p-2">`

        //add Interns
        listIntern.forEach(element => {
            innHTML += `
        <div class="card bg-light m-2 shadow" style="width: 15rem;">
            <div class="card-header bg-primary text-white">
                <div>${element.name}</div>
                <div><i class="fas fa-user-graduate"></i> Intern</div>
            </div>
            <div class="m-2 border">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${element.id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${element.email}">${element.email}</a></li>
                  <li class="list-group-item">School: ${element.school}</li>
                </ul>
            </div>
        </div>
        `;
        });           
        innHTML +=`
        </div>
    </div> -->
    </div>
</body>
</html>
`;
console.log(listEngineer);
    fs.writeFile(filename, innHTML, (err) =>
    err ? console.error(err) : console.log('SAVED!'))
}

addManager();

