require("colors");
const {
    showMenu,
    pause,
    showInput,
    tasksToDelete,
    confirm,
    tasksToComplete,
} = require("./helpers/menu");
const { saveFile, readFile } = require("./helpers/dbMethods");
const Tasks = require("./models/tasks");

const main = async () => {
    let opt = "";
    const tasks = new Tasks();
    const fileTasks = readFile();

    if (fileTasks) {
        tasks.addTasksFromArray(fileTasks);
    }
    do {
        opt = await showMenu();
        switch (opt) {
            case "1":
                const desc = await showInput("Descripción:");
                tasks.setTask(desc);
                break;
            case "2":
                tasks.getTasks();
                break;
            case "3":
                tasks.getTasksByState(true);
                break;
            case "4":
                tasks.getTasksByState(false);
                break;
            case "5":
                const ids = await tasksToComplete(tasks.listArr);
                tasks.toggleCompleted(ids);
                break;
            case "6":
                const id = await tasksToDelete(tasks.listArr);
                if (id !== "0") {
                    const ok = await confirm("¿Está seguro? Esta acción no se puede deshacer.");
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log("Tarea eliminada");
                    }
                }
        }

        saveFile(tasks.listArr);
        if (opt !== "0") await pause();
    } while (opt !== "0");
};

main();
