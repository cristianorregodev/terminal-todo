const inquirer = require("inquirer");
require("colors");

const questions = [
    {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: "1",
                name: `${"1.".cyan} ${"Crear tarea"}`,
            },
            {
                value: "2",
                name: `${"2.".cyan} ${"Listado tareas"}`,
            },
            {
                value: "3",
                name: `${"3.".cyan} ${"Tareas completadas"}`,
            },
            {
                value: "4",
                name: `${"4.".cyan} ${"Tareas pendientes"}`,
            },
            {
                value: "5",
                name: `${"5.".cyan} ${"Completar tarea(s)"}`,
            },
            {
                value: "6",
                name: `${"6.".cyan} ${"Borrar tarea"}`,
            },
            {
                value: "0",
                name: `${"0.".cyan} ${"Salir"}`,
            },
        ],
    },
];
const showMenu = async () => {
    console.clear();
    console.log("===========================".cyan);
    console.log("   Seleccione una opción   ".white);
    console.log("===========================\n".cyan);

    const { opcion } = await inquirer.prompt(questions);
    return opcion;
};

const pause = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".cyan} para continuar`,
        },
    ];
    console.log("\n");
    await inquirer.prompt(question);
};

const showInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "input",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor";
                }
                return true;
            },
        },
    ];

    const { input } = await inquirer.prompt(question);
    return input;
};

const tasksToDelete = async (tasks = []) => {
    const choices = tasks.map((task, id) => {
        const idx = `${id + 1}.`.cyan;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
        };
    });
    choices.unshift({
        value: "0",
        name: `${"0".cyan} Cancelar`,
    });
    const question = [
        {
            type: "list",
            name: "taskId",
            message: "Borrar tarea ",
            choices,
        },
    ];

    const { taskId } = await inquirer.prompt(question);
    return taskId;
};

const confirm = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "confirm",
            message,
        },
    ];
    const { confirm } = await inquirer.prompt(question);
    return confirm;
};

const tasksToComplete = async (tasks = []) => {
    const choices = tasks.map((task, id) => {
        const idx = `${id + 1}.`.cyan;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: task.completedAt ? true : false,
        };
    });

    const question = [
        {
            type: "checkbox",
            name: "taskIds",
            message: "Selecciones ",
            choices,
        },
    ];

    const { taskIds } = await inquirer.prompt(question);
    return taskIds;
};

module.exports = { showMenu, pause, showInput, tasksToDelete, confirm, tasksToComplete };
