class Checker {

    static TAG = {
        SWEDEN: 'sweden',
        AIRSPACE: 'airspace',
        TESLA: 'tesla',
        AIRPLANE: 'airplane',
        STOCKS: 'stocks',
        SPACEX: 'spacex',
        AGE: 'age',
        NOD: 'nod',
        AIRSENSE: 'airsense',
        BELLLABS: 'belllabs',
    }


    constructor(Message) {
        this.Message = Message;
        this.tags = [];
    }

    async check() {
        throw new Error("Not implemented");
    }

    results() {
        return this.tags;
    }

    getResultNames() {
        return this.tags.map(tag => Object.keys(Checker.TAG).find(key => Checker.TAG[key] === tag));
    }

}

module.exports = Checker;