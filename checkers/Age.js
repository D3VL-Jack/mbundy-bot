const Checker = require("./_checker");

class Age extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (
            body.includes("high mileage") ||
            body.includes("old")
        ) {
            this.tags.push(Checker.TAG.AGE);
        }

        return Promise.resolve(this);
    }
}

module.exports = Age;