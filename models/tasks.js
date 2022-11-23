const Task = require("./task");

class Tasks {
    _list = {};

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach((key) => {
            const task = this._list[key];
            list.push(task);
        });
        return list;
    }
    constructor() {
        this._list = {};
    }

    addTasksFromArray(tasks = []) {
        tasks.forEach((task) => {
            this._list[task.id] = task;
        });
    }

    setTask(desc = "") {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    getTasks() {
        console.log();
        this.listArr.forEach((task, id) => {
            const idx = `${id + 1}`.cyan;
            const { desc, completedAt } = task;
            const state = completedAt ? "Completado".green : "Pendiente".red;

            console.log(`${idx} ${desc} :: ${state}`);
        });
    }

    getTasksByState(states = true) {
        console.log();
        let counter = 0;
        this.listArr.forEach((task) => {
            const { desc, completedAt } = task;
            const state = completedAt ? "Completado".green : "Pendiente".red;
            if (states) {
                if (completedAt) {
                    counter += 1;
                    console.log(`${(counter + ".").cyan} ${desc} :: ${completedAt.cyan}`);
                }
            } else {
                if (!completedAt) {
                    counter += 1;
                    console.log(`${(counter + ".").cyan} ${desc} :: ${state}`);
                }
            }
        });
    }

    deleteTask(id = "") {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    toggleCompleted(ids = []) {
        ids.forEach((id) => {
            const task = this._list[id];
            if (!task.completedAt) {
                task.completedAt = new Date().toISOString();
            }
        });

        this.listArr.forEach((task) => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedAt = null;
            }
        });
    }
}
module.exports = Tasks;
