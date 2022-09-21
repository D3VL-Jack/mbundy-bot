const Checker = require("./checkers/_checker");

// SWEDEN: 1,
// AIRSPACE: 2,
// TESLA: 3,
// AIRPLANE: 4,
// STOCKS: 5,
// SPACEX: 6,
// ATANDT: 7,
// GEOFENCE: 8,
// AGE: 9,
// NOD: 10,
// AIRSENSE: 11
// BELLLABS: 12

module.exports = {
    [Checker.TAG.SWEDEN]: {
        start: [
            "This is "
        ],
        middle: [
            "the {{nth}} time you've mentioned Sweden"
        ],
        end: [
            ".", "!", "...",
            ", When are you next going?"
        ]
    },
    [Checker.TAG.AIRSPACE]: {
        start: [
            "This is "
        ],
        middle: [
            "the {{nth}} time you've mentioned Airspace",
            "the {{nth}} time, i've seen you mention Airspace",
        ],
        end: [
            ".", "!", "...",
            ", You should try do something about it!",
            ", We get it, you have a problem with your Airspace",
            ", Have you considered moving?",
            ", Have you considered moving to Sweden?",
            ", Complain to the FAA"
        ]
    },
    [Checker.TAG.TESLA]: {
        start: [
            "This is ",
        ],
        middle: [
            "the {{nth}} time you've mentioned Tesla",
            "getting silly now, You've mentioned Tesla {{nth}} times",
            "crazy! If i had a penny for every time you've mentioned Tesla, i'd have {{times}} pennies",
        ],
        end: [
            ".", "!", "..."
        ]
    },
    [Checker.TAG.AIRPLANE]: {
        start: [
            "This is ",
        ],
        middle: [
            "the {{nth}} time you've mentioned something about an airplane or that private jet you got to play on for a little bit",
            "the {{nth}} time you've mentioned an airplane",
        ],
        end: [
            ".", "!", "...",
            ", Maybe you should go and fly instead of telling us all about it! _again_",
        ]
    },
    [Checker.TAG.STOCKS]: {
        start: [
            "This is ",
        ],
        middle: [
            "the {{nth}} time you've mentioned something todo with stocks",
            "the {{nth}} time you've mentioned the stock market",
        ],
        end: [
            ".", "!", "...",
            ", You should invest in Tesla",
            ", You should invest in SpaceX",
            ", You should buy more RCAT! Its up 600% today.",
            ", You should sell your RCAT, its down 600% today.",
            ", Have you considered investing in <random_stock>?"
        ]
    },
    [Checker.TAG.SPACEX]: {
        start: [
            "This is ",
        ],
        middle: [
            "the {{nth}} time you've mentioned SpaceX",
        ],
        end: [
            ".", "!", "...",
            ", You should invest in SpaceX",
            ", Are you an investor yet or just a super fan?",
            ", If they had a dollar for every time, they'd have completed the Starship program by now",
        ]
    },
    [Checker.TAG.ATANDT]: {
        start: [
            "haha, This is ",
        ],
        middle: [
            "the {{nth}} time you've mentioned AT&T",
        ],
        end: [
            ".", "!", "...",
        ]
    },
    [Checker.TAG.AGE]: {
        start: [
            "This is ",
        ],
        middle: [
            "the {{nth}} time you've mentioned your age",
        ],
        end: [
            ".", "!", "...",
            ", You're not getting any younger sitting around here",
            ", Time to get out and fly... or something idk ¯\\_(ツ)_/¯",
            ", How does that make you feel?"
        ]
    },
    [Checker.TAG.NOD]: {
        start: [
            "This is ",
        ],
        middle: [
            "the {{nth}} time you've nodded at one of the members",
        ],
        end: [
            ".", "!", "...",
            ", Is your neck not sore yet?",
            ", should we get you a neck brace?",
            ", Unfortunately though our insurance doesn't cover neck injuries... please be careful",
            ", You should get a neck massage, you've been nodding a lot recently"
        ]
    },
    [Checker.TAG.AIRSENSE]: {
        start: [
            "This is ",
        ],
        middle: [
            "the {{nth}} time you've mentioned Airsense",
        ],
        end: [
            ".", "!", "...",
            ", Let me guess... you've disabled it?",
            ", You should try turning it on - it might help avoid all the airplanes in your airspace :)",
            ", Did you know that the rest of the world doesn't have this problem?",
            ", You should try moving to Sweden - they don't have this problem"
        ]
    },
    [Checker.TAG.BELLLABS]: {
        start: [
            "This is ",
        ],
        middle: [
            "the {{nth}} time you've mentioned Bell Labs",
        ],
        end: [
            ".", "!", "..."
        ]
    },
    [999]: { // Multiple tags
        start: [
            "Seriously? This is \n",
            "Steady on! This is \n",
            "You're getting a bit carried away now! This is \n",
            "The results are in! This is \n",
            "Did you know, this is \n",
            "You're not going to believe this, this is \n",
            "I've been keeping track of your messages and this is \n",
        ],
        middle: [],
        end: [""]
    }

}