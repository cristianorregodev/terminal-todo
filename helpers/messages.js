require("colors");

const showMenu = () => {
    return new Promise((resolve) => {
        console.clear();
        console.log("===========================".cyan);
        console.log("   Seleccione una opción   ".cyan);
        console.log("===========================\n".cyan);

        console.log(`${"1.".cyan} Crear una tarea`);
        console.log(`${"2.".cyan} Listado de tareas`);
        console.log(`${"3.".cyan} Tareas completadas`);
        console.log(`${"4.".cyan} Tareas pendientes`);
        console.log(`${"5.".cyan} Completar tarea(s)`);
        console.log(`${"6.".cyan} Borrar tarea`);
        console.log(`${"7.".cyan} Crear una tarea`);
        console.log(`${"0.".cyan} Salir\n`);

        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question("Seleccione una opción: ", (opt) => {
            readline.close();
            resolve(opt);
        });
    });
};

const pause = () => {
    return new Promise((resolve) => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(`\nPresione ${"ENTER".cyan} para continuar\n`, (opt) => {
            readline.close();
            resolve(opt);
        });
    });
};

module.exports = {
    showMenu,
    pause,
};
