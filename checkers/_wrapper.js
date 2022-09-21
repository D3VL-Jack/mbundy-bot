const fs = require('fs');
const Checker = require('./_checker');

// find all files in the current directory not starting with an underscore
const checkers = fs.readdirSync(__dirname).filter(file => !file.startsWith('_'));

// for each file, require it 
const Classes = checkers.map(file => require(`./${file}`));

class CheckersWrapper extends Checker {
    async check() {
        const promises = Classes.map(_Checker => {
            const checker = new _Checker(this.Message);
            return checker.check();
        });

        const results = await Promise.all(promises);

        for (const result of results) {
            if (result instanceof Checker) {
                this.tags.push(...result.results());
            }
        }

        return Promise.resolve(this);
    }
}

module.exports = CheckersWrapper;