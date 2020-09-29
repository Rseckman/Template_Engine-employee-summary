const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

employees = [];

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
    .prompt({
      type: "list",
      name: "employee",
      message: "which type of team member would you like to add?",
      choices: ["Engineer", "Intern", "no more team members"],
    })
    .then(function (typeAnswers) {
      if (typeAnswers.employee === "Engineer") {
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
              name: "github",
              message: "What is your Engineer's GitHub?",
            },
          ])
          .then(function (engineerAnswers) {
            const engineer = new Engineer(
              engineerAnswers.name,
              engineerAnswers.id,
              engineerAnswers.email,
              engineerAnswers.github
            );
            employees.push(engineer);
            makeEmployees();
          });
      } else if (typeAnswers.employee === "Intern") {
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