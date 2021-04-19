const filename = `./dist/team.html`;

const inquirer = require("inquirer");
const fs = require('fs');
const ck = require('chalk');

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
idNum = 0;  //originally used to assign ID and increment as new members are added

let listManager = [];
let listEngineer = [];
let listIntern = [];
let listID = [];
let innHTML=``;

// const jared = new Manager("Jared", 1, "jared@fakemail.com", 1);
// const m1 = new Manager("Jared", 1, "jared@fakemail.com", 1);

// const alec = new Engineer("Alec", 2, "alec@fakemail.com", "ibealec");
// const grace = new Engineer("Grace", 3, "grace@fakemail.com", "gchoi2u");
// const tammer = new Engineer("Tammer", 4, "tammer@fakemail.com", "tammerg");
// const e1 = new Engineer("Tammer", 4, "tammer@fakemail.com", "tammerg");
// const e2 = new Engineer("Tammer", 4, "tammer@fakemail.com", "tammerg");

// const john = new Intern("John", 5, "john@fakemail.com", "2University");
// const i1 = new Intern("John", 5, "john@fakemail.com", "2University");
// const i2 = new Intern("John", 5, "john@fakemail.com", "2University");
// const i3 = new Intern("John", 5, "john@fakemail.com", "2University");

// listManager.push(jared);
// listManager.push(m1);
// listEngineer.push(alec);
//  listEngineer.push(grace);
//  listEngineer.push(tammer);
//  listEngineer.push(e1);
//  listEngineer.push(e2);

//  listIntern.push(john);
//  listIntern.push(i1);
//  listIntern.push(i2);
//  listIntern.push(i3);

// Menu to choose which task to do next
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
                console.log(ck.blue('Add an Engineer'));
                askID('Engineer');
                break;
            case "Add an Intern":
                console.log(ck.blue('Add an Intern'));
                askID('Intern');
                break;
            case "Finish building my team":
                console.log(ck.blue('Finish building my team'));
                generateHTML();
                break;
            default:
                break;
        }
    })
}

//using this function to require a valid ID that is unique
function askID(type) {
    inquirer.prompt([
        {
        type: 'number',
        message: `What is their ID #?`,
        name: 'ID',
        },
    ]).then(({ID}) => {
        if(listID.includes(ID) || Number.isNaN(ID)) {
            if(Number.isNaN(ID)) {
                console.log(ck.red(`ERROR: Not a number!`)); } else {
                console.log(ck.red(`ERROR: ID#${ID} is already in use!`));
            }
            askID(type);  //using recursion until a valid answer is given
        } else {
            listID.push(ID);
            switch (type) {
                case 'Manager':
                    addManager(ID);                    
                    break;
                case 'Engineer':
                    addEngineer(ID);                    
                    break;
                case 'Intern':
                    addIntern(ID);                    
                    break;          
                default:
                    break;
            }
        }
    });
}


function addManager(mID) {
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
    ]).then(({mName,mEmail,mOfficenum}) => {
        idNum++;
        const manager = new Manager(mName, mID, mEmail, mOfficenum);
        listManager.push(manager);
        askQuestion();
    })
}

function addEngineer(eID) {
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
    ]).then(({eName,eEmail,eGithub}) => {
        idNum++;
        const engineer = new Engineer(eName, eID, eEmail, eGithub);
        listEngineer.push(engineer);
        askQuestion();
    });
}

function addIntern(iID) {
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
    ]).then(({iName,iEmail,iSchool}) => {
        idNum++;
        const intern = new Intern(iName, iID, iEmail, iSchool);
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

<div class="pos-f-t">
<div class="collapse" id="navbarToggleExternalContent">
  <div class="bg-success p-4">
    <h4 class="text-white">Team Profile Generator</h4>
    <span class="text-white">Dynamically generated by running index.js at the prompt. Managers are listed at the top, next are Engineers, and lastly the Intern group is generated. Please also note, each ID is unique and error prevention is initialized with this feature. Team count displays the number of member(s) on the team.  I utilized Bootstrap as the CSS to keep things simple and have made the page mobile friendly.</span>
  </div>
</div>
<nav class="navbar navbar-dark bg-success">
  <button class="navbar-toggler m-2" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <h6 class="display-6 text-white text-center">My Team</h6>
  <span class="badge btn-primary m-3 p-2">Team Count: <span class="bg-light text-secondary m-1 p-1 rounded">${idNum}</span></span>
</nav>
</div>
    <div class="container no-gutters">
        <div class="row justify-content-center p-2" id="Managers">
            <!-- This is where we put Managers  -->
`;  // Add manager(s)
    listManager.forEach(element => {
        innHTML += `
    <div class="col-4 card bg-light m-2 p-0 shadow" style="width: 15rem; ">
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

    <!-- This is where we put Engineers  -->
        <div class="row justify-content-center p-2" id="Engineers">
`;
    //add Engineers
    listEngineer.forEach(element => {
    innHTML += `
<div class="col-4 card bg-light m-2 p-0 shadow" style="width: 15rem;">
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
    <!-- This is where we put Interns  -->
    <div class="row justify-content-center p-2" id="Interns">
`
        //add Interns
        listIntern.forEach(element => {
            innHTML += `
        <div class="col-4 card bg-light p-0 m-2 shadow" style="width: 15rem;">
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
    </div>
    <p class="p-4">  
    <footer class="pos-f-t">
        <nav class="navbar navbar-light bg-success fixed-bottom justify-content-center">
          Version 1.0
        </nav>
    </footer>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>
`;
    fs.writeFile(filename, innHTML, (err) =>
    err ? console.error(err) : console.log(ck.green('SAVED!')));
}

//Get a valid ID first and then gather information about Manager to start program.
askID('Manager');
