const Checker = require("./_checker");

class Airplane extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (
            body.includes("private jet") ||
            body.includes("airplane") ||
            body.includes("air plane") ||
            body.includes("pilot") ||
            body.includes("cockpit")
        ) {
            this.tags.push(Checker.TAG.AIRPLANE);
        }

        return Promise.resolve(this);
    }
}

module.exports = Airplane;