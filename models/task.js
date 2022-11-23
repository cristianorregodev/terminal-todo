const { v4: uuid } = require("uuid");
class Task {
    id = "";
    desc = "";
    completedAt = null;
    constructor(desc) {
        this.id = uuid();
        this.desc = desc;
    }
}

module.exports = Task;
