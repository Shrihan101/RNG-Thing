// =========================================
// RNGDLE - MAIN GAME SCRIPT
// =========================================

// =========================================
// DOM ELEMENTS
// =========================================

const rollButton =
    document.getElementById("rollButton");

const eraseDataButton =
    document.getElementById("eraseDataButton");

const numberDisplay =
    document.getElementById("number");

const rarityDisplay =
    document.getElementById("rarity");

const epDisplay =
    document.getElementById("ep");

const palindromeDisplay =
    document.getElementById("palindrome");

const primeDisplay =
    document.getElementById("prime");

const repeatingDisplay =
    document.getElementById("repeating");

const ascendingDisplay =
    document.getElementById("ascending");

const descendingDisplay =
    document.getElementById("descending");

const allSameDisplay =
    document.getElementById("allSame");

const evenDisplay =
    document.getElementById("even");

const zeroDisplay =
    document.getElementById("zero");

const digitSumDisplay =
    document.getElementById("digitSum");

const badgeContainer =
    document.getElementById("badgeContainer");

const noBadges =
    document.getElementById("noBadges");

const totalRollsDisplay =
    document.getElementById("totalRolls");

const totalEPDisplay =
    document.getElementById("totalEP");

const bestRarityDisplay =
    document.getElementById("bestRarity");

const totalBadgesDisplay =
    document.getElementById("totalBadges");

const averageRollDisplay =
    document.getElementById("averageRoll");

const highestNumberDisplay =
    document.getElementById("highestNumber");

const dailyStreakDisplay =
    document.getElementById("dailyStreak");

const historyContainer =
    document.getElementById("historyContainer");

const noHistory =
    document.getElementById("noHistory");

const leaderboardContainer =
    document.getElementById("leaderboardContainer");

const noLeaderboard =
    document.getElementById("noLeaderboard");

const countdownDisplay =
    document.getElementById("countdown");

const dailyStatus =
    document.getElementById("dailyStatus");

const mythicEffect =
    document.getElementById("mythicEffect");

// =========================================
// SETTINGS
// =========================================

const MIN_NUMBER = 0;
const MAX_NUMBER = 1000000;

const ROLL_DURATION = 1500;
const ANIMATION_INTERVAL = 45;

const ROLL_COOLDOWN = 10000;

// =========================================
// RARITY
// =========================================

const RARITY_ORDER = [
    "Trash",
    "Common",
    "Uncommon",
    "Rare",
    "Epic",
    "Legendary",
    "Mythic"
];

const EP_VALUES = {

    Trash: 10,

    Common: 30,

    Uncommon: 50,

    Rare: 150,

    Epic: 500,

    Legendary: 3000,

    Mythic: 15000

};

// =========================================
// DATA
// =========================================

let data = {

    totalRolls: 0,

    totalEP: 0,

    bestRarity: null,

    totalBadges: 0,

    totalRollValue: 0,

    highestNumber: 0,

    dailyStreak: 0,

    lastRoll: null,

    history: [],

    badges: [],

    leaderboard: {

        ep: [],
        rolls: [],
        streak: [],
        number: []

    }

};

// =========================================
// LOAD DATA
// =========================================

function loadData() {

    try {

        const saved =
            localStorage.getItem(
                "rngdleData"
            );

        if (saved) {

            const parsed =
                JSON.parse(saved);

            data = {
                ...data,
                ...parsed
            };

        }

    } catch (error) {

        console.error(
            "Could not load RNGdle data:",
            error
        );

    }

}

// =========================================
// SAVE DATA
// =========================================

function saveData() {

    localStorage.setItem(
        "rngdleData",
        JSON.stringify(data)
    );

}

// =========================================
// RANDOM NUMBER
// =========================================

function randomNumber() {

    return Math.floor(
        Math.random() *
        (MAX_NUMBER - MIN_NUMBER + 1)
    ) + MIN_NUMBER;

}

// =========================================
// FORMAT NUMBER
// =========================================

function formatNumber(number) {

    return number
        .toString()
        .padStart(6, "0");

}

// =========================================
// DIGITS
// =========================================

function getDigits(number) {

    return formatNumber(number)
        .split("")
        .map(Number);

}

// =========================================
// DIGIT SUM
// =========================================

function getDigitSum(number) {

    return getDigits(number)
        .reduce(
            (sum, digit) =>
                sum + digit,
            0
        );

}

// =========================================
// PALINDROME
// =========================================

function isPalindrome(number) {

    const digits =
        formatNumber(number);

    return (
        digits ===
        digits.split("").reverse().join("")
    );

}

// =========================================
// PRIME
// =========================================

function isPrime(number) {

    if (number < 2) {
        return false;
    }

    if (number === 2) {
        return true;
    }

    if (number % 2 === 0) {
        return false;
    }

    for (
        let i = 3;
        i * i <= number;
        i += 2
    ) {

        if (number % i === 0) {
            return false;
        }

    }

    return true;

}

// =========================================
// REPEATING DIGITS
// =========================================

function hasRepeatingDigits(number) {

    const digits =
        getDigits(number);

    return new Set(digits).size <
        digits.length;

}

// =========================================
// ASCENDING
// =========================================

function isAscending(number) {

    const digits =
        getDigits(number);

    for (
        let i = 1;
        i < digits.length;
        i++
    ) {

        if (
            digits[i] <
            digits[i - 1]
        ) {

            return false;

        }

    }

    return true;

}

// =========================================
// DESCENDING
// =========================================

function isDescending(number) {

    const digits =
        getDigits(number);

    for (
        let i = 1;
        i < digits.length;
        i++
    ) {

        if (
            digits[i] >
            digits[i - 1]
        ) {

            return false;

        }

    }

    return true;

}

// =========================================
// ALL SAME
// =========================================

function isAllSame(number) {

    const digits =
        getDigits(number);

    return digits.every(
        digit =>
            digit === digits[0]
    );

}

// =========================================
// POWER OF TWO
// =========================================

function isPowerOfTwo(number) {

    return (
        number > 0 &&
        (number & (number - 1)) === 0
    );

}

// =========================================
// FIBONACCI
// =========================================

function isPerfectSquare(number) {

    const root =
        Math.sqrt(number);

    return Number.isInteger(root);

}

function isFibonacci(number) {

    return (
        isPerfectSquare(
            5 * number * number + 4
        ) ||
        isPerfectSquare(
            5 * number * number - 4
        )
    );

}

// =========================================
// MERSENNE PRIME
// =========================================

function isMersennePrime(number) {

    if (!isPrime(number)) {
        return false;
    }

    return (
        number > 1 &&
        ((number + 1) &
            number) === 0
    );

}

// =========================================
// SPECIAL PATTERNS
// =========================================

function isTriplePattern(number) {

    const digits =
        formatNumber(number);

    return (
        digits[0] === digits[1] &&
        digits[2] === digits[3] &&
        digits[4] === digits[5]
    );

}

function isAABBCC(number) {

    const digits =
        formatNumber(number);

    return (
        digits[0] === digits[1] &&
        digits[2] === digits[3] &&
        digits[4] === digits[5]
    );

}

// =========================================
// CONSECUTIVE REPEATED DIGITS
// =========================================

function getLongestRepeatedDigitRun(number) {

    const digits =
        getDigits(number);

    let longestRun = 1;
    let currentRun = 1;

    for (
        let i = 1;
        i < digits.length;
        i++
    ) {

        if (
            digits[i] ===
            digits[i - 1]
        ) {

            currentRun++;

            longestRun =
                Math.max(
                    longestRun,
                    currentRun
                );

        } else {

            currentRun = 1;

        }

    }

    return longestRun;

}

// =========================================
// ANYWHERE DIGIT COUNTS
// =========================================

function getHighestDigitCount(number) {

    const digits =
        getDigits(number);

    const counts = {};

    digits.forEach(
        digit => {

            counts[digit] =
                (counts[digit] || 0) + 1;

        }
    );

    return Math.max(
        ...Object.values(counts)
    );

}

// =========================================
// MINIMUM RARITY FROM DIGITS
// =========================================

function getPatternMinimumRarity(number) {

    const longestRun =
        getLongestRepeatedDigitRun(number);

    const highestDigitCount =
        getHighestDigitCount(number);

    // 4+ consecutive identical digits
    // = MYTHIC
    if (longestRun >= 4) {

        return "Mythic";

    }

    // 4 identical digits anywhere
    // = LEGENDARY
    if (highestDigitCount >= 4) {

        return "Legendary";

    }

    // 3 consecutive identical digits
    // = LEGENDARY
    if (longestRun >= 3) {

        return "Legendary";

    }

    // 2 consecutive identical digits
    // = EPIC
    if (longestRun >= 2) {

        return "Epic";

    }

    return null;

}

// =========================================
// SELF DESCRIPTIVE
// =========================================

function isSelfDescriptive(number) {

    const digits =
        getDigits(number);

    for (
        let i = 0;
        i < digits.length;
        i++
    ) {

        let count = 0;

        for (
            let j = 0;
            j < digits.length;
            j++
        ) {

            if (
                digits[j] === i
            ) {

                count++;

            }

        }

        if (
            count !== digits[i]
        ) {

            return false;

        }

    }

    return true;

}

// =========================================
// SPECIAL NUMBER DETECTION
// =========================================

function getSpecialNumberBonus(number) {

    let bonus = 0;

    const ultraSpecialNumbers = [

        1,
        7,
        42,
        69,
        100,
        111,
        123,
        123456,
        654321,
        777,
        777777,
        999,
        999999,
        100000

    ];

    if (
        ultraSpecialNumbers.includes(number)
    ) {

        bonus += 100;

    }

    if (
        isPalindrome(number)
    ) {

        bonus += 12;

    }

    if (
        isAllSame(number)
    ) {

        bonus += 25;

    }

    if (
        isTriplePattern(number)
    ) {

        bonus += 18;

    }

    if (
        isAscending(number)
    ) {

        bonus += 12;

    }

    if (
        isDescending(number)
    ) {

        bonus += 12;

    }

    if (
        hasRepeatingDigits(number)
    ) {

        bonus += 5;

    }

    if (
        isPowerOfTwo(number)
    ) {

        bonus += 8;

    }

    if (
        isFibonacci(number)
    ) {

        bonus += 7;

    }

    if (
        isMersennePrime(number)
    ) {

        bonus += 20;

    }

    return bonus;

}

// =========================================
// DETERMINE RARITY
// =========================================

function determineRarity(number) {

    const numberPercent =
        number / MAX_NUMBER;

    const numberScore =
        numberPercent * 85;

    const specialBonus =
        getSpecialNumberBonus(number);

    const randomBonus =
        Math.random() * 15;

    const score =
        numberScore +
        specialBonus +
        randomBonus;

    let rarity;

    if (score >= 99.9) {

        rarity = "Mythic";

    } else if (score >= 97) {

        rarity = "Legendary";

    } else if (score >= 90) {

        rarity = "Epic";

    } else if (score >= 78) {

        rarity = "Rare";

    } else if (score >= 60) {

        rarity = "Uncommon";

    } else if (score >= 35) {

        rarity = "Common";

    } else {

        rarity = "Trash";

    }

    // =====================================
    // PATTERN MINIMUM
    // =====================================

    const patternMinimum =
        getPatternMinimumRarity(number);

    if (
        patternMinimum
    ) {

        const currentIndex =
            RARITY_ORDER.indexOf(
                rarity
            );

        const minimumIndex =
            RARITY_ORDER.indexOf(
                patternMinimum
            );

        if (
            minimumIndex >
            currentIndex
        ) {

            rarity =
                patternMinimum;

        }

    }

    // =====================================
    // PERFECT ASCENDING / DESCENDING
    // =====================================

    const formatted =
        formatNumber(number);

    if (
        formatted === "123456" ||
        formatted === "654321"
    ) {

        rarity = "Mythic";

    }

    return rarity;

}

// =========================================
// BADGES
// =========================================

const BADGES = [

    {
        name: "First Roll",
        description: "Roll Your First Number",
        rarity: "Common",
        check: () =>
            data.totalRolls >= 1
    },

    {
        name: "Double Digits",
        description: "Roll Two Of The Same Digit In A Row",
        rarity: "Epic",
        check: number =>
            getLongestRepeatedDigitRun(number) >= 2
    },

    {
        name: "Triple Digits",
        description: "Roll Three Of The Same Digit In A Row",
        rarity: "Legendary",
        check: number =>
            getLongestRepeatedDigitRun(number) >= 3
    },

    {
        name: "Four Of A Kind",
        description: "Roll Four Of The Same Digit Anywhere",
        rarity: "Legendary",
        check: number =>
            getHighestDigitCount(number) >= 4
    },

    {
        name: "Quad Digits",
        description: "Roll Four Of The Same Digit In A Row",
        rarity: "Mythic",
        check: number =>
            getLongestRepeatedDigitRun(number) >= 4
    },

    {
        name: "Six Of A Kind",
        description: "Roll Six Of The Same Digit",
        rarity: "Mythic",
        check: number =>
            getHighestDigitCount(number) >= 6
    },

    {
        name: "Palindrome",
        description: "Roll A Palindrome",
        rarity: "Uncommon",
        check: number =>
            isPalindrome(number)
    },

    {
        name: "Prime Hunter",
        description: "Roll A Prime Number",
        rarity: "Rare",
        check: number =>
            isPrime(number)
    },

    {
        name: "Pattern Master",
        description: "Roll A Triple Pattern",
        rarity: "Epic",
        check: number =>
            isTriplePattern(number)
    },

    {
        name: "Fibonacci",
        description: "Roll A Fibonacci Number",
        rarity: "Epic",
        check: number =>
            isFibonacci(number)
    },

    {
        name: "Power Surge",
        description: "Roll A Power Of Two",
        rarity: "Rare",
        check: number =>
            isPowerOfTwo(number)
    },

    {
        name: "Mersenne",
        description: "Roll A Mersenne Prime",
        rarity: "Legendary",
        check: number =>
            isMersennePrime(number)
    },

    {
        name: "Perfect Number",
        description: "Roll A Number With A Perfect Digit Pattern",
        rarity: "Legendary",
        check: number =>
            isAABBCC(number)
    },

    {
        name: "Self Descriptive",
        description: "Roll A Self Descriptive Number",
        rarity: "Legendary",
        check: number =>
            isSelfDescriptive(number)
    },

    {
        name: "Ascending",
        description: "Roll A Perfectly Ascending Number",
        rarity: "Mythic",
        check: number =>
            formatNumber(number) === "123456"
    },

    {
        name: "Descending",
        description: "Roll A Perfectly Descending Number",
        rarity: "Mythic",
        check: number =>
            formatNumber(number) === "654321"
    },

    {
        name: "THE IMPOSSIBLE ROLL",
        description: "Roll A MYTHIC",
        rarity: "Mythic",
        check: (number, rarity) =>
            rarity === "Mythic"
    }

];

// =========================================
// GET BADGES FOR A NUMBER
// =========================================

function getRollBadges(
    number,
    rarity
) {

    return BADGES.filter(
        badge => {

            try {

                return badge.check(
                    number,
                    rarity
                );

            } catch (error) {

                console.error(
                    "Roll badge error:",
                    error
                );

                return false;

            }

        }
    );

}

// =========================================
// FIND NEW PERMANENT BADGES
// =========================================

function findBadges(
    number,
    rarity
) {

    const unlocked = [];

    for (
        const badge of BADGES
    ) {

        const alreadyUnlocked =
            data.badges.includes(
                badge.name
            );

        if (
            alreadyUnlocked
        ) {

            continue;

        }

        try {

            if (
                badge.check(
                    number,
                    rarity
                )
            ) {

                unlocked.push(
                    badge
                );

            }

        } catch (error) {

            console.error(
                "Badge error:",
                error
            );

        }

    }

    unlocked.forEach(
        badge => {

            data.badges.push(
                badge.name
            );

        }
    );

    data.totalBadges =
        data.badges.length;

    return unlocked;

}

// =========================================
// DISPLAY BADGES
// =========================================

function displayBadges() {

    badgeContainer.innerHTML = "";

    if (
        data.badges.length === 0
    ) {

        const message =
            document.createElement("p");

        message.textContent =
            "No Badges Yet";

        badgeContainer.appendChild(
            message
        );

        return;

    }

    data.badges.forEach(
        badgeName => {

            const badge =
                BADGES.find(
                    item =>
                        item.name ===
                        badgeName
                );

            if (!badge) {
                return;
            }

            const element =
                document.createElement("div");

            element.className =
                `badge badge-${badge.rarity.toLowerCase()}`;

            element.innerHTML = `

                <div class="badge-name">
                    ${badge.name}
                </div>

                <div class="badge-description">
                    ${badge.description}
                </div>

            `;

            badgeContainer.appendChild(
                element
            );

        }
    );

}

// =========================================
// DISPLAY BADGES FOR CURRENT ROLL
// =========================================

function getRollBadgeHTML(
    number,
    rarity
) {

    const badges =
        getRollBadges(
            number,
            rarity
        );

    if (
        badges.length === 0
    ) {

        return "";

    }

    return badges
        .map(
            badge => `

                <div class="
                    roll-badge
                    badge-${badge.rarity.toLowerCase()}
                ">

                    🏅 ${badge.name}

                </div>

            `
        )
        .join("");

}

// =========================================
// ANALYSIS
// =========================================

function updateAnalysis(number) {

    palindromeDisplay.textContent =
        isPalindrome(number)
            ? "Yes"
            : "No";

    primeDisplay.textContent =
        isPrime(number)
            ? "Yes"
            : "No";

    repeatingDisplay.textContent =
        hasRepeatingDigits(number)
            ? "Yes"
            : "No";

    ascendingDisplay.textContent =
        isAscending(number)
            ? "Yes"
            : "No";

    descendingDisplay.textContent =
        isDescending(number)
            ? "Yes"
            : "No";

    allSameDisplay.textContent =
        isAllSame(number)
            ? "Yes"
            : "No";

    evenDisplay.textContent =
        number % 2 === 0
            ? "Yes"
            : "No";

    zeroDisplay.textContent =
        formatNumber(number).includes("0")
            ? "Yes"
            : "No";

    digitSumDisplay.textContent =
        getDigitSum(number);

}

// =========================================
// RARITY DISPLAY
// =========================================

function updateRarityDisplay(rarity) {

    rarityDisplay.className = "";

    rarityDisplay.textContent =
        rarity;

    rarityDisplay.classList.add(
        `rarity-${rarity.toLowerCase()}`
    );

}

// =========================================
// AUDIO ENGINE
// =========================================

let audioContext = null;

function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    return audioContext;

}

function rarityTone(
    frequency,
    duration,
    type = "sine",
    volume = 0.08
) {

    try {

        const ctx =
            getAudioContext();

        const oscillator =
            ctx.createOscillator();

        const gain =
            ctx.createGain();

        oscillator.type =
            type;

        oscillator.frequency.setValueAtTime(
            frequency,
            ctx.currentTime
        );

        gain.gain.setValueAtTime(
            0,
            ctx.currentTime
        );

        gain.gain.linearRampToValueAtTime(
            volume,
            ctx.currentTime + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start();

        oscillator.stop(
            ctx.currentTime + duration
        );

    } catch (error) {

        console.warn(
            "Audio unavailable:",
            error
        );

    }

}

// =========================================
// LEGENDARY CUTSCENE
// =========================================

function triggerLegendaryEffect() {

    if (!mythicEffect) {
        return;
    }

    document.body.classList.add(
        "legendary-cutscene"
    );

    mythicEffect.classList.remove(
        "active"
    );

    void mythicEffect.offsetWidth;

    mythicEffect.classList.add(
        "active"
    );

    // =====================================
    // LEGENDARY SOUND
    // =====================================

    try {

        getAudioContext();

        rarityTone(
            110,
            0.8,
            "triangle",
            0.04
        );

        setTimeout(() => {

            rarityTone(
                220,
                0.8,
                "sine",
                0.05
            );

        }, 500);

        setTimeout(() => {

            rarityTone(
                440,
                1,
                "sine",
                0.06
            );

        }, 1100);

        setTimeout(() => {

            rarityTone(
                660,
                1,
                "triangle",
                0.05
            );

        }, 1700);

    } catch (error) {

        console.warn(
            "Legendary audio failed:",
            error
        );

    }

    // =====================================
    // CLEANUP AFTER 3 SECONDS
    // =====================================

    setTimeout(() => {

        mythicEffect.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "legendary-cutscene"
        );

    }, 3000);

}

// =========================================
// MYTHIC SOUND ENGINE
// =========================================

function mythicTone(
    frequency,
    duration,
    type = "sine",
    volume = 0.08
) {

    try {

        const ctx =
            getAudioContext();

        const oscillator =
            ctx.createOscillator();

        const gain =
            ctx.createGain();

        oscillator.type =
            type;

        oscillator.frequency.setValueAtTime(
            frequency,
            ctx.currentTime
        );

        gain.gain.setValueAtTime(
            0,
            ctx.currentTime
        );

        gain.gain.linearRampToValueAtTime(
            volume,
            ctx.currentTime + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start();

        oscillator.stop(
            ctx.currentTime + duration
        );

    } catch (error) {

        console.warn(
            "Audio unavailable:",
            error
        );

    }

}

// =========================================
// MYTHIC CUTSCENE
// =========================================

function triggerMythicEffect() {

    if (!mythicEffect) {
        return;
    }

    document.body.classList.add(
        "mythic-cutscene"
    );

    mythicEffect.classList.remove(
        "active"
    );

    void mythicEffect.offsetWidth;

    mythicEffect.classList.add(
        "active"
    );

    numberDisplay.classList.add(
        "mythic-number"
    );

    // =====================================
    // MYTHIC SOUND
    // =====================================

    try {

        getAudioContext();

        mythicTone(
            55,
            2.5,
            "sawtooth",
            0.025
        );

        setTimeout(() => {

            mythicTone(
                90,
                2,
                "sine",
                0.035
            );

        }, 1200);

        setTimeout(() => {

            mythicTone(
                180,
                1.5,
                "triangle",
                0.05
            );

        }, 3000);

        setTimeout(() => {

            mythicTone(
                440,
                1,
                "sine",
                0.07
            );

        }, 5000);

        setTimeout(() => {

            mythicTone(
                880,
                1.5,
                "sine",
                0.1
            );

        }, 5900);

        setTimeout(() => {

            mythicTone(
                1320,
                2,
                "triangle",
                0.08
            );

        }, 6200);

        setTimeout(() => {

            mythicTone(
                1760,
                2,
                "sine",
                0.055
            );

        }, 6800);

    } catch (error) {

        console.warn(
            "Mythic audio failed:",
            error
        );

    }

    // =====================================
    // CLEANUP
    // =====================================

    setTimeout(() => {

        mythicEffect.classList.remove(
            "active"
        );

        numberDisplay.classList.remove(
            "mythic-number"
        );

        document.body.classList.remove(
            "mythic-cutscene"
        );

    }, 10000);

}

// =========================================
// NUMBER ANIMATION
// =========================================

function animateNumber(
    finalNumber
) {

    return new Promise(
        resolve => {

            const startTime =
                performance.now();

            const interval =
                setInterval(() => {

                    const elapsed =
                        performance.now() -
                        startTime;

                    const progress =
                        Math.min(
                            elapsed /
                            ROLL_DURATION,
                            1
                        );

                    const random =
                        randomNumber();

                    numberDisplay.textContent =
                        formatNumber(
                            random
                        );

                    if (
                        progress >= 1
                    ) {

                        clearInterval(
                            interval
                        );

                        numberDisplay.textContent =
                            formatNumber(
                                finalNumber
                            );

                        resolve();

                    }

                }, ANIMATION_INTERVAL);

        }
    );

}

// =========================================
// COOLDOWN
// =========================================

function getRemainingCooldown() {

    if (!data.lastRoll) {
        return 0;
    }

    const elapsed =
        Date.now() -
        data.lastRoll;

    return Math.max(
        0,
        ROLL_COOLDOWN -
        elapsed
    );

}

function updateCooldown() {

    const remaining =
        getRemainingCooldown();

    if (
        remaining <= 0
    ) {

        countdownDisplay.textContent =
            "Ready!";

        dailyStatus.textContent =
            "Your Roll Is Ready!";

        rollButton.disabled =
            false;

        return;

    }

    const seconds =
        Math.ceil(
            remaining / 1000
        );

    countdownDisplay.textContent =
        `${seconds}s`;

    dailyStatus.textContent =
        "Roll Cooldown Active";

    rollButton.disabled =
        true;

}

// =========================================
// STATS
// =========================================

function updateStats() {

    totalRollsDisplay.textContent =
        data.totalRolls;

    totalEPDisplay.textContent =
        data.totalEP;

    bestRarityDisplay.textContent =
        data.bestRarity ||
        "---";

    totalBadgesDisplay.textContent =
        `${data.totalBadges} / ${BADGES.length}`;

    const average =
        data.totalRolls > 0
            ? Math.round(
                data.totalRollValue /
                data.totalRolls
            )
            : 0;

    averageRollDisplay.textContent =
        average.toLocaleString();

    highestNumberDisplay.textContent =
        data.highestNumber.toLocaleString();

    dailyStreakDisplay.textContent =
        `${data.dailyStreak} 🔥`;

}

// =========================================
// HISTORY
// =========================================

function updateHistory() {

    historyContainer.innerHTML = "";

    if (
        data.history.length === 0
    ) {

        const message =
            document.createElement("p");

        message.textContent =
            "No Rolls Yet";

        historyContainer.appendChild(
            message
        );

        return;

    }

    data.history
        .slice()
        .reverse()
        .slice(0, 50)
        .forEach(
            roll => {

                const entry =
                    document.createElement("div");

                entry.className =
                    "history-entry";

                const rollBadges =
                    getRollBadgeHTML(
                        roll.number,
                        roll.rarity
                    );

                entry.innerHTML = `

                    <div class="history-main">

                        <span>
                            ${formatNumber(
                                roll.number
                            )}
                        </span>

                        <span class="
                            rarity-${roll.rarity.toLowerCase()}
                        ">
                            ${roll.rarity}
                        </span>

                        <span>
                            +${roll.ep} EP
                        </span>

                    </div>

                    <div class="history-badges">
                        ${rollBadges}
                    </div>

                `;

                historyContainer.appendChild(
                    entry
                );

            }
        );

}

// =========================================
// LEADERBOARD
// =========================================

let currentLeaderboard =
    "ep";

function updateLeaderboard() {

    leaderboardContainer.innerHTML =
        "";

    const entries =
        data.leaderboard[
            currentLeaderboard
        ] || [];

    if (
        entries.length === 0
    ) {

        const message =
            document.createElement("p");

        message.textContent =
            "No Leaderboard Data Yet";

        leaderboardContainer.appendChild(
            message
        );

        return;

    }

    entries.forEach(
        (entry, index) => {

            const element =
                document.createElement("div");

            element.className =
                "leaderboard-entry";

            element.innerHTML = `

                <span>
                    #${index + 1}
                </span>

                <strong>
                    ${entry.name}
                </strong>

                <span>
                    ${entry.value}
                </span>

            `;

            leaderboardContainer.appendChild(
                element
            );

        }
    );

}

// =========================================
// LEADERBOARD TABS
// =========================================

document
    .querySelectorAll(
        ".leaderboard-tab"
    )
    .forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".leaderboard-tab"
                        )
                        .forEach(
                            button =>
                                button.classList
                                    .remove(
                                        "active"
                                    )
                        );

                    tab.classList.add(
                        "active"
                    );

                    currentLeaderboard =
                        tab.dataset.type;

                    updateLeaderboard();

                }
            );

        }
    );

// =========================================
// STREAK
// =========================================

function updateStreak() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    if (
        !data.lastRollDate
    ) {

        data.dailyStreak = 0;
        return;

    }

    const last =
        new Date(
            data.lastRollDate
        );

    const current =
        new Date(today);

    const difference =
        Math.floor(
            (
                current - last
            ) /
            86400000
        );

    if (
        difference > 1
    ) {

        data.dailyStreak = 0;

    }

}

// =========================================
// PERFORM ROLL
// =========================================

async function performRoll() {

    if (
        getRemainingCooldown() > 0
    ) {

        return;

    }

    rollButton.disabled =
        true;

    const finalNumber =
        randomNumber();

    const rarity =
        determineRarity(
            finalNumber
        );

    const ep =
        EP_VALUES[rarity] || 0;

    await animateNumber(
        finalNumber
    );

    updateRarityDisplay(
        rarity
    );

    epDisplay.textContent =
        ep;

    updateAnalysis(
        finalNumber
    );

    // =====================================
    // STATS
    // =====================================

    data.totalRolls++;

    data.totalEP += ep;

    data.totalRollValue +=
        finalNumber;

    data.highestNumber =
        Math.max(
            data.highestNumber,
            finalNumber
        );

    // =====================================
    // BEST RARITY
    // =====================================

    const currentIndex =
        RARITY_ORDER.indexOf(
            rarity
        );

    const bestIndex =
        data.bestRarity
            ? RARITY_ORDER.indexOf(
                data.bestRarity
            )
            : -1;

    if (
        currentIndex >
        bestIndex
    ) {

        data.bestRarity =
            rarity;

    }

    // =====================================
    // BADGES
    // =====================================

    findBadges(
        finalNumber,
        rarity
    );

    // =====================================
    // HISTORY
    // =====================================

    data.history.push({

        number:
            finalNumber,

        rarity:
            rarity,

        ep:
            ep,

        timestamp:
            Date.now()

    });

    if (
        data.history.length > 100
    ) {

        data.history =
            data.history.slice(
                -100
            );

    }

    // =====================================
    // COOLDOWN
    // =====================================

    data.lastRoll =
        Date.now();

    // =====================================
    // SAVE
    // =====================================

    saveData();

    // =====================================
    // UPDATE UI
    // =====================================

    displayBadges();

    updateStats();

    updateHistory();

    updateLeaderboard();

    // =====================================
    // RARITY CUTSCENE
    // =====================================

    if (
        rarity === "Mythic"
    ) {

        triggerMythicEffect();

    } else if (
        rarity === "Legendary"
    ) {

        triggerLegendaryEffect();

    }

    updateCooldown();

}

// =========================================
// ERASE DATA
// =========================================

eraseDataButton.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are You Sure You Want To Erase All RNGdle Data?"
            );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem(
            "rngdleData"
        );

        location.reload();

    }
);

// =========================================
// INITIALIZE
// =========================================

function initialize() {

    loadData();

    updateStreak();

    displayBadges();

    updateStats();

    updateHistory();

    updateLeaderboard();

    updateCooldown();

}

// =========================================
// ROLL BUTTON
// =========================================

rollButton.addEventListener(
    "click",
    performRoll
);

// =========================================
// COOLDOWN TIMER
// =========================================

setInterval(
    updateCooldown,
    250
);

// =========================================
// START
// =========================================

initialize();