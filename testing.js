const Manager = require("./Develop/lib/Manager");
const Employee = require("./Develop/lib/Employee");

let employee = new Employee('jim', 'jimID', 'jimEmail');
let manager = new Manager('tim', 'timID', 'timEmail', 1234);

console.log(employee.getName());
console.log(employee.getId());
console.log(employee.getEmail());
console.log(employee.getRole());

console.log(manager.getName());
console.log(manager.getId());
console.log(manager.getEmail());
console.log(manager.getOfficeNumber());
console.log(manager.getRole());