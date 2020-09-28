const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



// inquirer Prompt #1 Manager
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is your managers name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your managers ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your managers Email?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your managers Office number?",
    },
  ])
  .then(function (managerAnswers) {
    const manager = new Manager(
      managerAnswers.name,
      managerAnswers.id,
      managerAnswers.email,
      managerAnswers.officeNumber
    );
    employees.push(manager);
    makeEmployees();
  });

// recursion function to create employees
const makeEmployees = () => {
    //inquire prompt #2 to choose what type of employee
  inquirer
    .prompt([
      {
        type: "list",
        name: "type of employeee",
        message: "which type of team member would you like to add?",
        choices: ["engineer", "intern", "no more team members"],
      },
    ])
    .then(function (typeAnswers) {
      if (typeAnswers === "Engineer") {
        //   inquirer prompt #3 Engineer
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is your Engineer's name?",
            },
            {
              type: "input",
              name: "id",
              message: "What is your Engineer's Id number?",
            },
            {
              type: "input",
              name: "email",
              message: "What is your Engineer's email?",
            },
            {
              type: "input",
              name: "gitHub",
              message: "What is your Engineer's GitHub?",
            },
          ])
          .then(function (engineerAnswers) {
            const engineer = new Engineer(
              engineerAnswers.name,
              engineerAnswers.id,
              engineerAnswers.email,
              engineerAnswers.gitHub
            );
            employees.push(engineer);
            makeEmployees();
          });
      } else if (typeAnswers === "Intern") {
        //   inquirer prompt #4 Intern
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is your intern's name?",
            },
            {
              type: "input",
              name: "id",
              message: "What is your intern's Id number?",
            },
            {
              type: "input",
              name: "email",
              message: "What is your intern's email?",
            },
            {
              type: "input",
              name: "school",
              message: "What is your intern's school?",
            },
          ])
          .then(function (internAnswers) {
            const intern = new Intern(
              internAnswers.name,
              internAnswers.id,
              internAnswers.email,
              internAnswers.school
            );
            employees.push(intern);
            makeEmployees();
          });
      } else {
        // Exit inquirer and render html and write it
        const html = render(employees);

        fs.writeFile(outputPath, html, function (err) {
          if (err) throw err;
          console.log("success");
        });
      }
    });
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
