const Checker = require("./_checker");

class Stocks extends Checker {
    async check() {
        const body = this.Message.content.toLowerCase();

        if (
            body.includes("wall street") ||
            body.includes("trading") ||
            body.includes("redcat") ||
            body.includes("rcat") ||
            body.includes("low latency") ||
            body.includes("i invented") ||
            body.includes("stock") ||
            body.includes("wall st")
        ) {
            this.tags.push(Checker.TAG.STOCKS);
        }

        return Promise.resolve(this);
    }
}

module.exports = Stocks;