const Checker = require("./_checker");

class Nod extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (body.includes("nod")) {
            this.tags.push(Checker.TAG.NOD);
        }

        return Promise.resolve(this);
    }
}

module.exports = Nod;