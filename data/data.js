const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const dateString = day + "/" + month + "/" + year + " " + (hour < 10 ? "0" + hour : hour)  + ":" + (minute < 10 ? "0" + minute : minute);

const toDoList = [
    {email: "admin@admin.com",password: "12345678",taskId: 1, name: "Admin 1" ,taskTitle: "Task Title 1", taskDescription: "Task Description 1", isAdmin: true, created_at: dateString, status: 1},
    {email: "admin2@admin.com",password: "12345678",taskId: 2, name: "Admin 2" ,taskTitle: "Task Title 2", taskDescription: "Task Description 2", isAdmin: true, created_at: dateString, status: 1},
    {email: "admin3@admin.com",password: "12345678",taskId: 3, name: "Admin 3" ,taskTitle: "Task Title 3", taskDescription: "Task Description 3", isAdmin: true, created_at: dateString, status: 1},
    {email: "user@user.com",password: "12345678",taskId: 4, name: "User 1" ,taskTitle: "Task Title 4", taskDescription: "Task Description 4", isAdmin: false, created_at: dateString, status: 1},
    {email: "user2@user.com",password: "12345678",taskId: 5, name: "User 2" ,taskTitle: "Task Title 5", taskDescription: "Task Description 5", isAdmin: false, created_at: dateString, status: 1},
    {email: "user3@user.com",password: "12345678",taskId: 6, name: "User 3" ,taskTitle: "Task Title 6", taskDescription: "Task Description 6", isAdmin: false, created_at: dateString, status: 1},
]

module.exports = {
    toDoList
}