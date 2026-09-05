// =========================================
// RNGDLE - MAIN GAME SCRIPT
// =========================================

// =========================================
// DOM ELEMENTS
// =========================================

const rollButton = document.getElementById("rollButton");
const eraseDataButton = document.getElementById("eraseDataButton");

const numberDisplay = document.getElementById("number");
const rarityDisplay = document.getElementById("rarity");
const epDisplay = document.getElementById("ep");

const palindromeDisplay = document.getElementById("palindrome");
const primeDisplay = document.getElementById("prime");
const repeatingDisplay = document.getElementById("repeating");
const ascendingDisplay = document.getElementById("ascending");
const descendingDisplay = document.getElementById("descending");
const allSameDisplay = document.getElementById("allSame");
const evenDisplay = document.getElementById("even");
const zeroDisplay = document.getElementById("zero");
const digitSumDisplay = document.getElementById("digitSum");

const badgeContainer = document.getElementById("badgeContainer");
const noBadges = document.getElementById("noBadges");
const badgesTitle = document.getElementById("badgesTitle");
const badgeIndex = document.getElementById("badgeIndex");
const badgeIndexContainer = document.getElementById("badgeIndexContainer");

const totalRollsDisplay = document.getElementById("totalRolls");
const totalEPDisplay = document.getElementById("totalEP");
const bestRarityDisplay = document.getElementById("bestRarity");
const totalBadgesDisplay = document.getElementById("totalBadges");
const averageRollDisplay = document.getElementById("averageRoll");
const highestNumberDisplay = document.getElementById("highestNumber");
const dailyStreakDisplay = document.getElementById("dailyStreak");

const historyContainer = document.getElementById("historyContainer");
const noHistory = document.getElementById("noHistory");

const countdownDisplay = document.getElementById("countdown");
const dailyStatus = document.getElementById("dailyStatus");

const mythicEffect = document.getElementById("mythicEffect");

// =========================================
// SHOP DOM ELEMENTS
// =========================================

const shopEPDisplay = document.getElementById("shopEP");

const rollSpeedLevelDisplay = document.getElementById("rollSpeedLevel");
const rollSpeedCostDisplay = document.getElementById("rollSpeedCost");
const buyRollSpeedButton = document.getElementById("buyRollSpeed");

const epMultiplierLevelDisplay = document.getElementById("epMultiplierLevel");
const epMultiplierCostDisplay = document.getElementById("epMultiplierCost");
const buyEpMultiplierButton = document.getElementById("buyEpMultiplier");

const luckLevelDisplay = document.getElementById("luckLevel");
const luckCostDisplay = document.getElementById("luckCost");
const buyLuckButton = document.getElementById("buyLuck");

const numberFortuneLevelDisplay = document.getElementById("numberFortuneLevel");
const numberFortuneCostDisplay = document.getElementById("numberFortuneCost");
const buyNumberFortuneButton = document.getElementById("buyNumberFortune");

const doubleRollLevelDisplay = document.getElementById("doubleRollLevel");
const doubleRollCostDisplay = document.getElementById("doubleRollCost");
const buyDoubleRollButton = document.getElementById("buyDoubleRoll");

const secretThingLevelDisplay = document.getElementById("secretThingLevel");
const secretThingDescriptionDisplay = document.getElementById("secretThingDescription");
const secretThingCostDisplay = document.getElementById("secretThingCost");
const buySecretThingButton = document.getElementById("buySecretThing");

// =========================================
// HIDE SECRET LEVEL DISPLAY
// =========================================

if (secretThingLevelDisplay) {
    secretThingLevelDisplay.style.display = "none";
}

// =========================================
// SETTINGS
// =========================================

const MIN_NUMBER = 0;
const MAX_NUMBER = 1000000;

const ROLL_DURATION = 1500;
const ANIMATION_INTERVAL = 45;

// Set To null For Normal Rarity
// Set To "Mythic", "Chroma", Or "Secret" To Force That Rarity
const FORCE_RARITY = null;

// =========================================
// BACKGROUND CUSTOMIZATION
// =========================================

const RANDOM_BACKGROUND_COST = 10000;
const RESET_BACKGROUND_COST = 5000;

let originalBackground = "";
let backgroundCustomizationContainer = null;
let backgroundCustomizationButton = null;

// =========================================
// SHOP UPGRADES
// =========================================

const SHOP_UPGRADES = {
    rollSpeed: {
        levels: [
            10000, 9000, 8000, 7000, 6000,
            5000, 4000, 3000, 2000, 1000
        ],
        costs: [
            50000, 75000, 100000, 150000, 300000,
            500000, 550000, 670000, 700000
        ]
    },

    epMultiplier: {
        levels: Array.from({ length: 100 }, (_, index) => index + 1),

        costs: [
            10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
            200, 300, 400, 500, 600, 700, 800, 900, 1000, 1000,
            2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 10000,
            14000, 18000, 22000, 26000, 30000, 34000, 38000, 42000, 46000, 50000,
            55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
            105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000,
            152000, 154000, 156000, 158000, 160000, 162000, 164000, 166000, 168000, 170000,
            183000, 196000, 209000, 222000, 235000, 248000, 261000, 274000, 287000, 300000,
            320000, 340000, 360000, 380000, 400000, 420000, 440000, 460000, 480000, 500000,
            1000000, 1000000, 1000000, 1000000, 1000000,
            1000000, 1000000, 1000000, 1000000
        ]
    },

    luck: {
        levels: Array.from(
            { length: 91 },
            (_, index) => Number((1 + index * 0.1).toFixed(1))
        ),

        costs: [
            10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
            200, 300, 400, 500, 600, 700, 800, 900, 1000, 1000,
            2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 10000,
            14000, 18000, 22000, 26000, 30000, 34000, 38000, 42000, 46000, 50000,
            55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
            105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000,
            152000, 154000, 156000, 158000, 160000, 162000, 164000, 166000, 168000, 170000,
            183000, 196000, 209000, 222000, 235000, 248000, 261000, 274000, 287000, 300000,
            320000, 340000, 360000, 380000, 400000, 420000, 440000, 460000, 480000, 500000
        ]
    },

    numberFortune: {
        levels: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],

        costs: [
            100000, 100000, 100000, 100000,
            100000, 100000, 100000, 100000
        ]
    },

    doubleRoll: {
        levels: [
            0, 1, 2, 3, 4, 5, 6, 7,
            8, 9, 10, 11, 12, 13, 14, 15
        ],

        costs: [
            15000, 30000, 50000, 100000, 150000,
            150000, 150000, 300000, 350000, 500000,
            500000, 500000, 500000, 500000, 500000
        ]
    },

    secretThing: {
        levels: [
            1, 10, 100, 1000, 10000,
            100000, 1000000, 10000000, 100000000
        ],

        costs: [
            10, 100, 1000, 10000, 100000,
            1000000, 10000000, 100000000
        ]
    }
};

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
    "Mythic",
    "Chroma",
    "Secret"
];

const EP_VALUES = {
    Trash: 10,
    Common: 30,
    Uncommon: 50,
    Rare: 150,
    Epic: 500,
    Legendary: 3000,
    Mythic: 15000,
    Chroma: 100000,
    Secret: 700000
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
    lastRollDate: null,

    history: [],
    badges: [],

    upgrades: {
        rollSpeed: 0,
        epMultiplier: 0,
        luck: 0,
        numberFortune: 0,
        doubleRoll: 0,
        secretThing: 0
    },

    backgroundColor: null,

    shrihanCodeUsed: false,
    shrihanChromaReady: false
};

// =========================================
// ROLL LOCK
// =========================================

let isRolling = false;

// =========================================
// SECRET CODE
// =========================================

let shrihanCodeBuffer = "";

function activateShrihanCode() {
    if (data.shrihanCodeUsed) {
        return;
    }

    data.shrihanCodeUsed = true;
    data.shrihanChromaReady = true;

    saveData();

    dailyStatus.textContent = "Shrihan Code Activated! Next Roll = Chroma!";
}

document.addEventListener("keydown", event => {
    if (event.key.length !== 1) {
        return;
    }

    const target = event.target;

    if (
        target &&
        (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable
        )
    ) {
        return;
    }

    shrihanCodeBuffer += event.key;

    if (shrihanCodeBuffer.length > 7) {
        shrihanCodeBuffer = shrihanCodeBuffer.slice(-7);
    }

    if (shrihanCodeBuffer === "Shrihan") {
        activateShrihanCode();
        shrihanCodeBuffer = "";
    }
});

// =========================================
// LOAD DATA
// =========================================

function loadData() {
    try {
        const saved = localStorage.getItem("rngdleData");

        if (!saved) {
            return;
        }

        const parsed = JSON.parse(saved);

        data = {
            ...data,
            ...parsed,

            upgrades: {
                ...data.upgrades,
                ...(parsed.upgrades || {})
            }
        };
    } catch (error) {
        console.error("Could Not Load RNGdle Data:", error);
    }
}

// =========================================
// SAVE DATA
// =========================================

function saveData() {
    localStorage.setItem("rngdleData", JSON.stringify(data));
}

// =========================================
// SHOP VALUES
// =========================================

function getUpgradeLevel(upgradeName) {
    const upgrade = SHOP_UPGRADES[upgradeName];

    return Math.max(
        0,
        Math.min(
            data.upgrades[upgradeName] || 0,
            upgrade.levels.length - 1
        )
    );
}

function getUpgradeValue(upgradeName) {
    const upgrade = SHOP_UPGRADES[upgradeName];
    const level = getUpgradeLevel(upgradeName);

    return upgrade.levels[level];
}

function getUpgradeCost(upgradeName) {
    const upgrade = SHOP_UPGRADES[upgradeName];
    const level = getUpgradeLevel(upgradeName);

    if (level >= upgrade.levels.length - 1) {
        return null;
    }

    return upgrade.costs[level];
}

// =========================================
// SHOP DISPLAY
// =========================================

function formatUpgradeValue(upgradeName, value) {
    if (upgradeName === "rollSpeed") {
        return `${value / 1000}s`;
    }

    if (upgradeName === "epMultiplier") {
        return `${value}×`;
    }

    if (upgradeName === "luck") {
        return `${Number(value.toFixed(1))}×`;
    }

    if (upgradeName === "numberFortune") {
        return `${value}×`;
    }

    if (upgradeName === "doubleRoll") {
        return `${value}%`;
    }

    if (upgradeName === "secretThing") {
        if (value >= 1000000) {
            return `${(value / 1000000).toLocaleString()}M`;
        }

        if (value >= 1000) {
            return `${(value / 1000).toLocaleString()}K`;
        }

        return value.toLocaleString();
    }

    return value;
}

// =========================================
// SHOP DISPLAY HELPER
// =========================================

function updateShopUpgrade(upgradeName, levelDisplay, costDisplay, buyButton) {
    if (!levelDisplay || !costDisplay || !buyButton) {
        return;
    }

    const value = getUpgradeValue(upgradeName);
    const cost = getUpgradeCost(upgradeName);

    levelDisplay.textContent = formatUpgradeValue(upgradeName, value);

    if (cost === null) {
        costDisplay.textContent = "MAXED";
        buyButton.textContent = "MAXED";
        buyButton.disabled = true;
        return;
    }

    costDisplay.textContent = `Cost: ${cost.toLocaleString()} EP`;
    buyButton.textContent = data.totalEP >= cost ? "Buy" : "Not Enough EP";
    buyButton.disabled = data.totalEP < cost;
}

// =========================================
// UPDATE SHOP
// =========================================

function updateShop() {
    shopEPDisplay.textContent = data.totalEP.toLocaleString();

    updateShopUpgrade(
        "rollSpeed",
        rollSpeedLevelDisplay,
        rollSpeedCostDisplay,
        buyRollSpeedButton
    );

    updateShopUpgrade(
        "epMultiplier",
        epMultiplierLevelDisplay,
        epMultiplierCostDisplay,
        buyEpMultiplierButton
    );

    updateShopUpgrade(
        "luck",
        luckLevelDisplay,
        luckCostDisplay,
        buyLuckButton
    );

    updateShopUpgrade(
        "numberFortune",
        numberFortuneLevelDisplay,
        numberFortuneCostDisplay,
        buyNumberFortuneButton
    );

    updateShopUpgrade(
        "doubleRoll",
        doubleRollLevelDisplay,
        doubleRollCostDisplay,
        buyDoubleRollButton
    );

    updateShopUpgrade(
        "secretThing",
        secretThingLevelDisplay,
        secretThingCostDisplay,
        buySecretThingButton
    );

    if (secretThingDescriptionDisplay) {
        const secretLevel = getUpgradeLevel("secretThing");
        const secretMaxLevel = SHOP_UPGRADES.secretThing.levels.length - 1;

        if (secretLevel >= secretMaxLevel) {
            secretThingDescriptionDisplay.textContent = "0.1% Chance To Get Secret";
        } else {
            secretThingDescriptionDisplay.textContent = "Does Absolutely Nothing... Yet.";
        }
    }
}

// =========================================
// BUY UPGRADE
// =========================================

function buyUpgrade(upgradeName) {
    const cost = getUpgradeCost(upgradeName);

    if (cost === null) {
        return;
    }

    if (data.totalEP < cost) {
        return;
    }

    data.totalEP -= cost;
    data.upgrades[upgradeName]++;

    saveData();

    updateStats();
    updateShop();
}

// =========================================
// SHOP BUTTONS
// =========================================

if (buyRollSpeedButton) {
    buyRollSpeedButton.addEventListener("click", () => {
        buyUpgrade("rollSpeed");
    });
}

if (buyEpMultiplierButton) {
    buyEpMultiplierButton.addEventListener("click", () => {
        buyUpgrade("epMultiplier");
    });
}

if (buyLuckButton) {
    buyLuckButton.addEventListener("click", () => {
        buyUpgrade("luck");
    });
}

if (buyNumberFortuneButton) {
    buyNumberFortuneButton.addEventListener("click", () => {
        buyUpgrade("numberFortune");
    });
}

if (buyDoubleRollButton) {
    buyDoubleRollButton.addEventListener("click", () => {
        buyUpgrade("doubleRoll");
    });
}

if (buySecretThingButton) {
    buySecretThingButton.addEventListener("click", () => {
        buyUpgrade("secretThing");
    });
}

// =========================================
// BACKGROUND CUSTOMIZATION
// =========================================

function generateRandomBackground() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 35) + 55;
    const lightness = Math.floor(Math.random() * 20) + 10;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// =========================================
// APPLY BACKGROUND
// =========================================

function applyBackground() {
    if (data.backgroundColor) {
        document.body.style.background = data.backgroundColor;
        return;
    }

    document.body.style.background = originalBackground;
}

// =========================================
// UPDATE BACKGROUND BUTTON
// =========================================

function updateBackgroundButton() {
    if (!backgroundCustomizationButton) {
        return;
    }

    if (data.backgroundColor) {
        backgroundCustomizationButton.textContent = `↩️ Reset Background — ${RESET_BACKGROUND_COST.toLocaleString()} EP`;
        backgroundCustomizationButton.disabled = data.totalEP < RESET_BACKGROUND_COST;
    } else {
        backgroundCustomizationButton.textContent = `🎨 Randomize Background — ${RANDOM_BACKGROUND_COST.toLocaleString()} EP`;
        backgroundCustomizationButton.disabled = data.totalEP < RANDOM_BACKGROUND_COST;
    }
}

// =========================================
// BACKGROUND BUTTON ACTION
// =========================================

function handleBackgroundButton() {
    if (data.backgroundColor) {
        if (data.totalEP < RESET_BACKGROUND_COST) {
            return;
        }

        data.totalEP -= RESET_BACKGROUND_COST;
        data.backgroundColor = null;

        applyBackground();

        saveData();

        updateStats();
        updateShop();
        updateBackgroundButton();

        return;
    }

    if (data.totalEP < RANDOM_BACKGROUND_COST) {
        return;
    }

    data.totalEP -= RANDOM_BACKGROUND_COST;
    data.backgroundColor = generateRandomBackground();

    applyBackground();

    saveData();

    updateStats();
    updateShop();
    updateBackgroundButton();
}

// =========================================
// CREATE BACKGROUND BUTTON
// =========================================

function createBackgroundButton() {
    if (backgroundCustomizationContainer) {
        return;
    }

    backgroundCustomizationContainer = document.createElement("div");
    backgroundCustomizationContainer.id = "backgroundCustomization";

    backgroundCustomizationContainer.style.width = "100%";
    backgroundCustomizationContainer.style.display = "flex";
    backgroundCustomizationContainer.style.justifyContent = "center";
    backgroundCustomizationContainer.style.alignItems = "center";
    backgroundCustomizationContainer.style.marginTop = "40px";
    backgroundCustomizationContainer.style.marginBottom = "30px";
    backgroundCustomizationContainer.style.background = "transparent";

    backgroundCustomizationButton = document.createElement("button");
    backgroundCustomizationButton.id = "backgroundCustomizationButton";
    backgroundCustomizationButton.type = "button";

    backgroundCustomizationButton.style.background = "rgba(255, 255, 255, 0.08)";
    backgroundCustomizationButton.style.backdropFilter = "blur(8px)";
    backgroundCustomizationButton.style.webkitBackdropFilter = "blur(8px)";
    backgroundCustomizationButton.style.border = "1px solid rgba(255, 255, 255, 0.18)";
    backgroundCustomizationButton.style.color = "inherit";
    backgroundCustomizationButton.style.padding = "10px 18px";
    backgroundCustomizationButton.style.borderRadius = "10px";
    backgroundCustomizationButton.style.cursor = "pointer";
    backgroundCustomizationButton.style.opacity = "0.8";
    backgroundCustomizationButton.style.transition = "all 0.2s ease";

    backgroundCustomizationButton.addEventListener("mouseenter", () => {
        if (!backgroundCustomizationButton.disabled) {
            backgroundCustomizationButton.style.opacity = "1";
            backgroundCustomizationButton.style.background = "rgba(255, 255, 255, 0.14)";
        }
    });

    backgroundCustomizationButton.addEventListener("mouseleave", () => {
        backgroundCustomizationButton.style.opacity = "0.8";
        backgroundCustomizationButton.style.background = "rgba(255, 255, 255, 0.08)";
    });

    backgroundCustomizationButton.addEventListener("click", handleBackgroundButton);

    backgroundCustomizationContainer.appendChild(backgroundCustomizationButton);
    document.body.appendChild(backgroundCustomizationContainer);

    updateBackgroundButton();
}

// =========================================
// INITIALIZE BACKGROUND CUSTOMIZATION
// =========================================

function initializeBackgroundCustomization() {
    originalBackground = document.body.style.background;

    applyBackground();
    createBackgroundButton();
    updateBackgroundButton();
}

// =========================================
// RANDOM NUMBER
// =========================================

function randomNumber() {
    const fortune = getUpgradeValue("numberFortune");

    if (fortune <= 1) {
        return Math.floor(
            Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)
        ) + MIN_NUMBER;
    }

    const random = Math.pow(Math.random(), 1 / fortune);

    return Math.floor(
        random * (MAX_NUMBER - MIN_NUMBER + 1)
    ) + MIN_NUMBER;
}

// =========================================
// RARITY-BASED NUMBER GENERATOR
// =========================================

function generateRarityNumber(rarity) {
    const mythicNumbers = [
    482848, 731137, 590095, 264462, 817718,
    392293, 640046, 758857, 481184, 926629,
    374473, 615516, 842248, 537735, 294492,
    516615, 683386, 729927, 451154, 836638,
    274472, 593395, 718817, 462264, 935539,
    381183, 627726, 849948, 253352, 716617,
    438834, 591195, 827728, 364463, 952259,
    471174, 638836, 285582, 743347, 819918,
    526625, 694496, 357753, 914419, 682286,
    463364, 728827, 351153, 847748
    ];

    const chromaNumbers = [
        500500, 700700, 800800, 900900, 505050,
        707070, 808080, 909090, 550055, 660066,
        770077, 880088, 990099, 121212, 232323,
        343434, 454545, 565656, 676767, 787878,
        898989, 101010, 202020, 303030, 404040,
        606060, 707070, 808080, 909090, 112233,
        223344, 334455, 445566, 556677, 667788,
        778899, 122221, 233332, 344443, 455554,
        500500, 881122, 188889, 727272, 454545,
        818181, 909090, 330033, 550055, 770077,
        212121, 343434, 565656, 676767, 787878,
        898989, 112233, 223344, 334455, 445566,
        556677, 667788, 778899, 990099, 100001,
        200002, 300003, 400004, 600006, 700007,
        800008, 900009, 121212, 232323, 454545,
        565656, 676767, 787878, 898989, 909009,
        808080, 707070, 606060, 505050, 404040,
        303030, 202020, 101010, 111222, 222333,
        333444, 444555, 555666, 666777, 777888,
        888999, 999888, 888777, 777666, 666555,
        555444, 444333, 333222, 222111, 123321,
        234432, 345543, 456654, 567765, 678876,
        789987, 900009, 800008, 700007, 600006,
        500005, 400004, 300003, 200002, 110011,
        220022, 330033, 440044, 550055, 660066,
        770077, 880088, 990099, 122221, 233332,
        344443, 455554, 566665, 677776, 788887,
        899998, 211112, 322223, 433334, 544445,
        655556, 766667, 877778, 988889, 135531,
        246642, 357753, 468864, 579975, 680086,
        791197, 802208, 913319, 124421, 235532,
        346643, 457754, 568865, 679976, 780087,
        891198, 902209, 112211, 223322, 334433,
        445544, 556655, 667766, 778877, 889988,
        998899, 119911, 229922, 339933, 449944,
        559955, 669966, 779977, 889988, 991199,
        181818, 292929, 393939, 494949, 595959,
        696969, 797979, 898989, 919191, 828282,
        737373, 646464, 575757, 484848, 393939,
        282828, 171717, 161616, 252525, 363636,
        474747, 585858, 696969, 797979, 898989,
        909090
    ];

    const secretNumbers = [
        "111111", "222222", "333333", "444444",
        "555555", "666666", "777777", "888888",
        "999999", "000000",

        "123456", "654321", "123123", "321321",
        "121212", "212121",

        "100000", "200000", "300000", "400000",
        "500000", "600000", "700000", "800000",
        "900000",

        "000001", "000010", "000100", "001000",
        "010000", "100000",

        "999998", "999989", "999899", "998999",
        "989999", "899999",

        "100001", "200002", "300003", "400004",
        "500005", "600006", "700007", "800008",
        "900009",

        "111112", "222223", "333334", "444445",
        "555556", "666667", "777778", "888889",
        "999990",

        "101101", "202202", "303303", "404404",
        "505505", "606606", "707707", "808808",
        "909909",

        "010010", "020020", "030030", "040040",
        "050050", "060060", "070070", "080080",
        "090090",

        "110110", "220220", "330330", "440440",
        "550550", "660660", "770770", "880880",
        "990990",

        "909090", "808080", "707070", "606060",
        "505050", "404040", "303030", "202020",
        "101010"
    ];

    if (rarity === "Mythic") {
        return mythicNumbers[
            Math.floor(Math.random() * mythicNumbers.length)
        ];
    }

    if (rarity === "Chroma") {
        return chromaNumbers[
            Math.floor(Math.random() * chromaNumbers.length)
        ];
    }

    if (rarity === "Secret") {
        return secretNumbers[
            Math.floor(Math.random() * secretNumbers.length)
        ];
    }

    return null;
}

// =========================================
// FINAL NUMBER
// =========================================

function getFinalRollNumber(rarity, originalNumber) {
    const rarityNumber = generateRarityNumber(rarity);

    if (rarityNumber !== null) {
        return rarityNumber;
    }

    return originalNumber;
}

// =========================================
// FORMAT NUMBER
// =========================================

function formatNumber(number) {
    return number.toString().padStart(6, "0");
}

// =========================================
// DIGITS
// =========================================

function getDigits(number) {
    return formatNumber(number).split("").map(Number);
}

// =========================================
// DIGIT SUM
// =========================================

function getDigitSum(number) {
    return getDigits(number).reduce(
        (sum, digit) => sum + digit,
        0
    );
}

// =========================================
// PALINDROME
// =========================================

function isPalindrome(number) {
    const digits = formatNumber(number);

    return digits === digits.split("").reverse().join("");
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

    for (let i = 3; i * i <= number; i += 2) {
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
    const digits = getDigits(number);

    return new Set(digits).size < digits.length;
}

// =========================================
// ASCENDING
// =========================================

function isAscending(number) {
    const digits = getDigits(number);

    for (let i = 1; i < digits.length; i++) {
        if (digits[i] < digits[i - 1]) {
            return false;
        }
    }

    return true;
}

// =========================================
// DESCENDING
// =========================================

function isDescending(number) {
    const digits = getDigits(number);

    for (let i = 1; i < digits.length; i++) {
        if (digits[i] > digits[i - 1]) {
            return false;
        }
    }

    return true;
}

// =========================================
// ALL SAME
// =========================================

function isAllSame(number) {
    const digits = getDigits(number);

    return digits.every(digit => digit === digits[0]);
}

// =========================================
// POWER OF TWO
// =========================================

function isPowerOfTwo(number) {
    return number > 0 && (number & (number - 1)) === 0;
}

// =========================================
// FIBONACCI
// =========================================

function isPerfectSquare(number) {
    const root = Math.sqrt(number);

    return Number.isInteger(root);
}

function isFibonacci(number) {
    return (
        isPerfectSquare(5 * number * number + 4) ||
        isPerfectSquare(5 * number * number - 4)
    );
}

// =========================================
// MERSENNE PRIME
// =========================================

function isMersennePrime(number) {
    if (!isPrime(number)) {
        return false;
    }

    return number > 1 && ((number + 1) & number) === 0;
}

// =========================================
// SPECIAL PATTERNS
// =========================================

function isTriplePattern(number) {
    const digits = formatNumber(number);

    return (
        digits[0] === digits[1] &&
        digits[2] === digits[3] &&
        digits[4] === digits[5]
    );
}

function isAABBCC(number) {
    const digits = formatNumber(number);

    return (
        digits[0] === digits[1] &&
        digits[2] === digits[3] &&
        digits[4] === digits[5]
    );
}

// =========================================
// SELF DESCRIPTIVE
// =========================================

function isSelfDescriptive(number) {
    const digits = getDigits(number);

    for (let i = 0; i < digits.length; i++) {
        let count = 0;

        for (let j = 0; j < digits.length; j++) {
            if (digits[j] === i) {
                count++;
            }
        }

        if (digits[i] !== count) {
            return false;
        }
    }

    return true;
}

// =========================================
// CONSECUTIVE REPEATED DIGITS
// =========================================

function getLongestRepeatedDigitRun(number) {
    const digits = getDigits(number);

    let longestRun = 1;
    let currentRun = 1;

    for (let i = 1; i < digits.length; i++) {
        if (digits[i] === digits[i - 1]) {
            currentRun++;

            longestRun = Math.max(
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

function getDigitCounts(number) {
    const digits = getDigits(number);
    const counts = {};

    digits.forEach(digit => {
        counts[digit] = (counts[digit] || 0) + 1;
    });

    return counts;
}

function getHighestDigitCount(number) {
    const counts = getDigitCounts(number);

    return Math.max(...Object.values(counts));
}

// =========================================
// TWO PAIRS
// =========================================

function hasTwoPairs(number) {
    const counts = getDigitCounts(number);

    const pairs = Object.values(counts).filter(
        count => count >= 2
    );

    return pairs.length >= 2;
}

// =========================================
// RANDOM FALLBACK RARITY
// =========================================

function getRandomFallbackRarity() {
    const luck = getUpgradeValue("luck");

    const baseWeights = [
        {
            rarity: "Trash",
            weight: 40
        },
        {
            rarity: "Common",
            weight: 30
        },
        {
            rarity: "Rare",
            weight: 20
        },
        {
            rarity: "Epic",
            weight: 10
        },
        {
            rarity: "Legendary",
            weight: 5
        },
        {
            rarity: "Mythic",
            weight: 1
        },
        {
            rarity: "Chroma",
            weight: 0.1
        }
    ];

    const weights = baseWeights.map((item, index) => {
        if (index <= 1) {
            return {
                ...item,
                weight: item.weight / Math.max(1, luck)
            };
        }

        return {
            ...item,
            weight: item.weight * Math.pow(luck, index / 2)
        };
    });

    const totalWeight = weights.reduce(
        (sum, item) => sum + item.weight,
        0
    );

    let roll = Math.random() * totalWeight;

    for (const item of weights) {
        roll -= item.weight;

        if (roll <= 0) {
            return item.rarity;
        }
    }

    return "Trash";
}

// =========================================
// DETERMINE NATURAL PATTERN RARITY
// =========================================

function getNaturalPatternRarity(number) {
    const longestRun = getLongestRepeatedDigitRun(number);
    const highestDigitCount = getHighestDigitCount(number);
    const twoPairs = hasTwoPairs(number);
    const formatted = formatNumber(number);
    const badgeCount = data.badges.length;

    if (longestRun >= 5) {
        return "Chroma";
    }

    if (number >= 999000) {
        return "Chroma";
    }

    if (badgeCount >= 14 && number >= 900000) {
        return "Chroma";
    }

    if (
        formatted === "123456" ||
        formatted === "654321"
    ) {
        return "Mythic";
    }

    if (
        longestRun >= 4 &&
        number >= 900000
    ) {
        return "Mythic";
    }

    if (
        badgeCount >= 10 &&
        number >= 800000
    ) {
        return "Mythic";
    }

    if (longestRun === 4) {
        return "Legendary";
    }

    if (highestDigitCount >= 4) {
        return "Epic";
    }

    if (twoPairs) {
        return "Epic";
    }

    if (highestDigitCount >= 3) {
        return "Epic";
    }

    if (longestRun === 2) {
        return "Rare";
    }

    return "Common";
}

// =========================================
// DETERMINE RARITY
// =========================================

function determineRarity(number) {
    const secretThingLevel = getUpgradeLevel("secretThing");

    const secretThingMaxed =
        secretThingLevel >=
        SHOP_UPGRADES.secretThing.levels.length - 1;

    if (
        secretThingMaxed &&
        Math.random() < 0.001
    ) {
        return "Secret";
    }

    const longestRun = getLongestRepeatedDigitRun(number);
    const highestDigitCount = getHighestDigitCount(number);
    const twoPairs = hasTwoPairs(number);
    const formatted = formatNumber(number);
    const badgeCount = data.badges.length;

    if (longestRun >= 5) {
        return "Chroma";
    }

    if (number >= 999000) {
        return "Chroma";
    }

    if (
        badgeCount >= 14 &&
        number >= 900000
    ) {
        return "Chroma";
    }

    if (
        formatted === "123456" ||
        formatted === "654321"
    ) {
        return "Mythic";
    }

    if (
        longestRun >= 4 &&
        number >= 900000
    ) {
        return "Mythic";
    }

    if (
        badgeCount >= 10 &&
        number >= 800000
    ) {
        return "Mythic";
    }

    if (longestRun === 4) {
        return "Mythic";
    }

    if (longestRun === 3) {
    return Math.random() < 0.90 ? "Legendary" : "Epic";
    }

    if (highestDigitCount >= 4) {
        return "Epic";
    }

    if (twoPairs) {
        return "Epic";
    }

    if (highestDigitCount >= 3) {
        return "Epic";
    }

    if (longestRun === 2) {
    return Math.random() < 0.70 ? "Rare" : "Epic";
    }

    return getRandomFallbackRarity();
}

// =========================================
// BADGES
// =========================================

const BADGES = [
    {
        name: "First Roll",
        description: "Roll Your First Number",
        rarity: "Common",
        check: (number, rarity, rollNumber) => rollNumber === 1
    },

    {
        name: "Double Digits",
        description: "Roll Two Of The Same Digit In A Row",
        rarity: "Rare",
        check: number => getLongestRepeatedDigitRun(number) >= 2
    },

    {
        name: "Triple Digits",
        description: "Roll Three Of The Same Digit In A Row",
        rarity: "Epic",
        check: number => getLongestRepeatedDigitRun(number) >= 3
    },

    {
        name: "Four Of A Kind",
        description: "Roll Four Of The Same Digit Anywhere",
        rarity: "Epic",
        check: number => getHighestDigitCount(number) >= 4
    },

    {
        name: "Quad Digits",
        description: "Roll Four Of The Same Digit In A Row",
        rarity: "Legendary",
        check: number => getLongestRepeatedDigitRun(number) >= 4
    },

    {
        name: "Six Of A Kind",
        description: "Roll Six Of The Same Digit",
        rarity: "Mythic",
        check: number => getHighestDigitCount(number) >= 6
    },

    {
        name: "Palindrome",
        description: "Roll A Palindrome",
        rarity: "Uncommon",
        check: number => isPalindrome(number)
    },

    {
        name: "Prime Hunter",
        description: "Roll A Prime Number",
        rarity: "Rare",
        check: number => isPrime(number)
    },

    {
        name: "Pattern Master",
        description: "Roll A Triple Pattern",
        rarity: "Epic",
        check: number => isTriplePattern(number)
    },

    {
        name: "Fibonacci",
        description: "Roll A Fibonacci Number",
        rarity: "Epic",
        check: number => isFibonacci(number)
    },

    {
        name: "Power Surge",
        description: "Roll A Power Of Two",
        rarity: "Rare",
        check: number => isPowerOfTwo(number)
    },

    {
        name: "Mersenne",
        description: "Roll A Mersenne Prime",
        rarity: "Legendary",
        check: number => isMersennePrime(number)
    },

    {
        name: "Perfect Number",
        description: "Roll A Number With A Perfect Digit Pattern",
        rarity: "Legendary",
        check: number => isAABBCC(number)
    },

    {
        name: "Self Descriptive",
        description: "Roll A Self Descriptive Number",
        rarity: "Legendary",
        check: number => isSelfDescriptive(number)
    },

    {
        name: "Ascending",
        description: "Roll A Perfectly Ascending Number",
        rarity: "Mythic",
        check: number => formatNumber(number) === "123456"
    },

    {
        name: "Descending",
        description: "Roll A Perfectly Descending Number",
        rarity: "Mythic",
        check: number => formatNumber(number) === "654321"
    },

    {
        name: "The Impossible Roll",
        description: "Roll A Mythic",
        rarity: "Mythic",
        check: (number, rarity) => rarity === "Mythic"
    },

    {
        name: "Chroma",
        description: "Roll A Chroma",
        rarity: "Chroma",
        check: (number, rarity) => rarity === "Chroma"
    },

    {
        name: "Secret",
        description: "Get A Secret",
        rarity: "Secret",
        check: (number, rarity) => rarity === "Secret"
    },

    {
        name: "Six-Seven",
        description: "Your Roll Contains 67 Together Somewhere",
        rarity: "Rare",
        check: number => formatNumber(number).includes("67")
    },

    {
        name: "W Day",
        description: "Your Roll Contains 914 Together Somewhere",
        rarity: "Epic",
        check: number => formatNumber(number).includes("914")
    },

    {
        name: "Lucky 7",
        description: "Your Roll Contains 777 Together Somewhere",
        rarity: "Legendary",
        check: number => formatNumber(number).includes("777")
    }
];

// =========================================
// BADGE INDEX
// =========================================

function displayBadgeIndex() {
    badgeIndexContainer.innerHTML = "";

    const sortedBadges = BADGES
        .map((badge, originalIndex) => ({
            badge,
            originalIndex
        }))
        .sort((a, b) => {
            const rarityDifference =
                RARITY_ORDER.indexOf(a.badge.rarity) -
                RARITY_ORDER.indexOf(b.badge.rarity);

            if (rarityDifference !== 0) {
                return rarityDifference;
            }

            return a.originalIndex - b.originalIndex;
        });

    sortedBadges.forEach(({ badge }) => {
        const unlocked = data.badges.includes(badge.name);
        const element = document.createElement("div");

        element.className =
            `badge-index-entry badge-index-${badge.rarity.toLowerCase()} ${
                unlocked
                    ? "badge-index-unlocked"
                    : "badge-index-locked"
            }`;

        element.innerHTML = `
            <div class="badge-index-number">
                ${unlocked ? "✓" : "?"}
            </div>

            <div class="badge-index-info">
                <div class="badge-index-name">
                    ${unlocked ? badge.name : "Locked Badge"}
                </div>

                <div class="badge-index-description">
                    ${badge.description}
                </div>
            </div>

            <div class="
                badge-index-rarity
                rarity-${badge.rarity.toLowerCase()}
            ">
                ${badge.rarity}
            </div>
        `;

        badgeIndexContainer.appendChild(element);
    });
}

// =========================================
// BADGE INDEX TOGGLE
// =========================================

function toggleBadgeIndex() {
    const isOpen = !badgeIndex.hidden;

    badgeIndex.hidden = isOpen;

    badgesTitle.setAttribute(
        "aria-expanded",
        String(!isOpen)
    );

    badgesTitle.classList.toggle(
        "badge-index-open",
        !isOpen
    );

    if (!isOpen) {
        displayBadgeIndex();
    }
}

badgesTitle.addEventListener(
    "click",
    toggleBadgeIndex
);

badgesTitle.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            toggleBadgeIndex();
        }
    }
);

// =========================================
// GET BADGES FOR CURRENT ROLL
// =========================================

function getRollBadges(number, rarity, rollNumber = null) {
    return BADGES.filter(badge => {
        try {
            return badge.check(
                number,
                rarity,
                rollNumber
            );
        } catch (error) {
            console.error(
                "Roll Badge Error:",
                error
            );

            return false;
        }
    });
}

// =========================================
// FIND NEW PERMANENT BADGES
// =========================================

function findBadges(number, rarity, rollNumber) {
    const unlocked = [];

    for (const badge of BADGES) {
        if (data.badges.includes(badge.name)) {
            continue;
        }

        try {
            if (
                badge.check(
                    number,
                    rarity,
                    rollNumber
                )
            ) {
                unlocked.push(badge);
            }
        } catch (error) {
            console.error(
                "Badge Error:",
                error
            );
        }
    }

    unlocked.forEach(badge => {
        data.badges.push(badge.name);
    });

    data.totalBadges = data.badges.length;

    return unlocked;
}

// =========================================
// DISPLAY BADGES
// =========================================

function displayBadges() {
    badgeContainer.innerHTML = "";

    if (data.badges.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No Badges Yet";

        badgeContainer.appendChild(message);

        return;
    }

    data.badges.forEach(badgeName => {
        const badge = BADGES.find(
            item => item.name === badgeName
        );

        if (!badge) {
            return;
        }

        const element = document.createElement("div");

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

        badgeContainer.appendChild(element);
    });
}

// =========================================
// CURRENT ROLL BADGES
// =========================================

function getRollBadgeHTML(number, rarity, rollNumber = null) {
    const badges = getRollBadges(
        number,
        rarity,
        rollNumber
    );

    if (badges.length === 0) {
        return `
            <div class="roll-badge empty-roll-badge">
                No Badge
            </div>
        `;
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
        isPalindrome(number) ? "Yes" : "No";

    primeDisplay.textContent =
        isPrime(number) ? "Yes" : "No";

    repeatingDisplay.textContent =
        hasRepeatingDigits(number) ? "Yes" : "No";

    ascendingDisplay.textContent =
        isAscending(number) ? "Yes" : "No";

    descendingDisplay.textContent =
        isDescending(number) ? "Yes" : "No";

    allSameDisplay.textContent =
        isAllSame(number) ? "Yes" : "No";

    evenDisplay.textContent =
        number % 2 === 0 ? "Yes" : "No";

    zeroDisplay.textContent =
        formatNumber(number).includes("0") ? "Yes" : "No";

    digitSumDisplay.textContent =
        getDigitSum(number);
}

// =========================================
// RARITY DISPLAY
// =========================================

function updateRarityDisplay(rarity) {
    rarityDisplay.className = "";
    rarityDisplay.textContent = rarity;

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
        const ctx = getAudioContext();

        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = type;

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
            "Audio Unavailable:",
            error
        );
    }
}

// =========================================
// MYTHIC SOUND
// =========================================

function mythicTone(
    frequency,
    duration,
    type = "sine",
    volume = 0.08
) {
    rarityTone(
        frequency,
        duration,
        type,
        volume
    );
}

// =========================================
// MYTHIC CUTSCENE
// =========================================

function triggerMythicEffect() {
    if (!mythicEffect) {
        return;
    }

    const title =
        mythicEffect.querySelector(
            ".mythic-title"
        );

    let oldTitle = null;

    if (title) {
        oldTitle = title.innerHTML;

        title.innerHTML = `
            <div class="mythic-crown">♛</div>
            <span>MYTHIC</span>
            <small>The Impossible Roll</small>
        `;
    }

    document.body.classList.add(
        "mythic-cutscene"
    );

    mythicEffect.classList.remove("active");

    void mythicEffect.offsetWidth;

    mythicEffect.classList.add("active");

    numberDisplay.classList.add(
        "mythic-number"
    );

    mythicTone(
        55,
        1.25,
        "sawtooth",
        0.025
    );

    setTimeout(() => {
        mythicTone(
            90,
            1,
            "sine",
            0.035
        );
    }, 600);

    setTimeout(() => {
        mythicTone(
            180,
            0.75,
            "triangle",
            0.05
        );
    }, 1500);

    setTimeout(() => {
        mythicTone(
            440,
            0.5,
            "sine",
            0.07
        );
    }, 2500);

    setTimeout(() => {
        mythicTone(
            880,
            0.75,
            "sine",
            0.1
        );
    }, 2950);

    setTimeout(() => {
        mythicTone(
            1320,
            1,
            "triangle",
            0.08
        );
    }, 3100);

    setTimeout(() => {
        mythicTone(
            1760,
            1,
            "sine",
            0.055
        );
    }, 3400);

    setTimeout(() => {
        mythicEffect.classList.remove("active");

        numberDisplay.classList.remove(
            "mythic-number"
        );

        document.body.classList.remove(
            "mythic-cutscene"
        );

        if (
            title &&
            oldTitle !== null
        ) {
            title.innerHTML = oldTitle;
        }
    }, 5000);
}

// =========================================
// CHROMA CUTSCENE
// =========================================

function triggerChromaEffect() {
    if (!mythicEffect) {
        return;
    }

    const title =
        mythicEffect.querySelector(
            ".mythic-title"
        );

    let oldTitle = null;

    if (title) {
        oldTitle = title.innerHTML;

        title.innerHTML = `
            <div class="mythic-crown">✦</div>
            <span>CHROMA</span>
            <small>The Impossible Roll</small>
        `;
    }

    document.body.classList.add(
        "chroma-cutscene"
    );

    mythicEffect.classList.remove("active");

    void mythicEffect.offsetWidth;

    mythicEffect.classList.add("active");

    numberDisplay.classList.add(
        "chroma-number"
    );

    rarityTone(
        220,
        1.2,
        "sine",
        0.05
    );

    setTimeout(() => {
        rarityTone(
            330,
            1,
            "triangle",
            0.055
        );
    }, 700);

    setTimeout(() => {
        rarityTone(
            440,
            1,
            "sine",
            0.065
        );
    }, 1400);

    setTimeout(() => {
        rarityTone(
            660,
            1.2,
            "triangle",
            0.075
        );
    }, 2200);

    setTimeout(() => {
        rarityTone(
            880,
            1.4,
            "sine",
            0.08
        );
    }, 3200);

    setTimeout(() => {
        rarityTone(
            1320,
            1.8,
            "triangle",
            0.09
        );
    }, 4300);

    setTimeout(() => {
        rarityTone(
            1760,
            2,
            "sine",
            0.1
        );
    }, 5200);

    setTimeout(() => {
        mythicEffect.classList.remove("active");

        numberDisplay.classList.remove(
            "chroma-number"
        );

        document.body.classList.remove(
            "chroma-cutscene"
        );

        if (
            title &&
            oldTitle !== null
        ) {
            title.innerHTML = oldTitle;
        }
    }, 7000);
}

// =========================================
// SECRET CUTSCENE
// =========================================

function triggerSecretEffect() {
    if (!mythicEffect) {
        return;
    }

    const title =
        mythicEffect.querySelector(
            ".mythic-title"
        );

    let oldTitle = null;

    if (title) {
        oldTitle = title.innerHTML;

        title.innerHTML = `
            <div class="mythic-crown"></div>
            <span>SECRET</span>
            <small>THE IMPOSSIBLE THING</small>
        `;
    }

    document.body.classList.add(
        "secret-cutscene"
    );

    mythicEffect.classList.remove("active");

    void mythicEffect.offsetWidth;

    mythicEffect.classList.add("active");

    numberDisplay.classList.add(
        "secret-number"
    );

    rarityTone(
        65,
        2,
        "sine",
        0.035
    );

    setTimeout(() => {
        rarityTone(
            90,
            1.5,
            "triangle",
            0.045
        );
    }, 1000);

    setTimeout(() => {
        rarityTone(
            130,
            1.5,
            "sine",
            0.055
        );
    }, 2200);

    setTimeout(() => {
        rarityTone(
            220,
            1.3,
            "triangle",
            0.065
        );
    }, 3400);

    setTimeout(() => {
        rarityTone(
            440,
            1.2,
            "sine",
            0.075
        );
    }, 4500);

    setTimeout(() => {
        rarityTone(
            880,
            1.1,
            "triangle",
            0.085
        );
    }, 5500);

    setTimeout(() => {
        rarityTone(
            1320,
            1.5,
            "sine",
            0.095
        );
    }, 6500);

    setTimeout(() => {
        rarityTone(
            1760,
            1.8,
            "triangle",
            0.11
        );
    }, 7600);

    setTimeout(() => {
        rarityTone(
            2200,
            2.2,
            "sine",
            0.12
        );
    }, 8500);

    setTimeout(() => {
        rarityTone(
            2640,
            2,
            "triangle",
            0.13
        );
    }, 9000);

    setTimeout(() => {
        rarityTone(
            3520,
            2,
            "sine",
            0.14
        );
    }, 9400);

    setTimeout(() => {
        mythicEffect.classList.remove("active");

        numberDisplay.classList.remove(
            "secret-number"
        );

        document.body.classList.remove(
            "secret-cutscene"
        );

        if (
            title &&
            oldTitle !== null
        ) {
            title.innerHTML = oldTitle;
        }
    }, 10000);
}

// =========================================
// NUMBER ANIMATION
// =========================================

function animateNumber(finalNumber) {
    return new Promise(resolve => {
        const startTime = performance.now();

        const interval = setInterval(() => {
            const elapsed =
                performance.now() - startTime;

            const progress = Math.min(
                elapsed / ROLL_DURATION,
                1
            );

            numberDisplay.textContent =
                formatNumber(randomNumber());

            if (progress >= 1) {
                clearInterval(interval);

                numberDisplay.textContent =
                    formatNumber(finalNumber);

                resolve();
            }
        }, ANIMATION_INTERVAL);
    });
}

// =========================================
// COOLDOWN
// =========================================

function getCurrentRollCooldown() {
    return getUpgradeValue("rollSpeed");
}

function getRemainingCooldown() {
    if (!data.lastRoll) {
        return 0;
    }

    const elapsed =
        Date.now() - data.lastRoll;

    return Math.max(
        0,
        getCurrentRollCooldown() - elapsed
    );
}

function updateCooldown() {
    if (isRolling) {
        countdownDisplay.textContent = "Rolling...";
        dailyStatus.textContent = "Your Number Is Rolling!";
        rollButton.disabled = true;

        return;
    }

    const remaining = getRemainingCooldown();

    if (remaining <= 0) {
        countdownDisplay.textContent = "Ready!";

        if (data.shrihanChromaReady) {
            dailyStatus.textContent =
                "Shrihan Code Active! Next Roll = Chroma!";
        } else {
            dailyStatus.textContent =
                "Your Roll Is Ready!";
        }

        rollButton.disabled = false;

        return;
    }

    const seconds = Math.ceil(
        remaining / 1000
    );

    countdownDisplay.textContent =
        `${seconds}s`;

    dailyStatus.textContent =
        "Roll Cooldown Active";

    rollButton.disabled = true;
}

// =========================================
// STATS
// =========================================

function updateStats() {
    totalRollsDisplay.textContent =
        data.totalRolls;

    totalEPDisplay.textContent =
        data.totalEP.toLocaleString();

    bestRarityDisplay.textContent =
        data.bestRarity || "---";

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

    updateShop();
    updateBackgroundButton();
}

// =========================================
// HISTORY
// =========================================

function updateHistory() {
    historyContainer.innerHTML = "";

    if (data.history.length === 0) {
        const message =
            document.createElement("p");

        message.textContent = "No Rolls Yet";

        historyContainer.appendChild(message);

        return;
    }

    data.history
        .slice()
        .reverse()
        .slice(0, 50)
        .forEach(roll => {
            const entry =
                document.createElement("div");

            entry.className =
                "history-entry";

            entry.innerHTML = `
                <div class="history-main">
                    <span class="history-number">
                        ${formatNumber(roll.number)}
                    </span>

                    <span class="
                        history-rarity
                        rarity-${roll.rarity.toLowerCase()}
                    ">
                        ${roll.rarity}
                    </span>

                    <span class="history-ep">
                        +${roll.ep.toLocaleString()} EP
                    </span>
                </div>

                <div class="history-badges">
                    ${getRollBadgeHTML(
                        roll.number,
                        roll.rarity,
                        roll.rollNumber
                    )}
                </div>
            `;

            historyContainer.appendChild(entry);
        });
}

// =========================================
// STREAK
// =========================================

function updateStreak() {
    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    if (!data.lastRollDate) {
        data.dailyStreak = 0;
        return;
    }

    const last =
        new Date(data.lastRollDate);

    const current =
        new Date(today);

    const difference =
        Math.floor(
            (current - last) /
            86400000
        );

    if (difference > 1) {
        data.dailyStreak = 0;
    }
}

// =========================================
// PROCESS SINGLE ROLL
// =========================================

async function processRoll() {
    const originalNumber = randomNumber();

    let rarity;

    // =========================================
    // FORCE RARITY TESTING
    // =========================================

    if (FORCE_RARITY) {
        rarity = FORCE_RARITY;
    } else if (data.shrihanChromaReady) {
        rarity = "Chroma";
    } else {
        rarity = determineRarity(originalNumber);
    }

    // =========================================
    // DETERMINE IF SPECIAL NUMBER IS NEEDED
    // =========================================

    const naturalRarity =
        getNaturalPatternRarity(originalNumber);

    const forcedRarity =
        Boolean(FORCE_RARITY);

    const shouldUseSpecialNumber =
        forcedRarity ||
        rarity === "Secret" ||
        (
            rarity === "Chroma" &&
            naturalRarity !== "Chroma"
        ) ||
        (
            rarity === "Mythic" &&
            naturalRarity !== "Mythic" &&
            naturalRarity !== "Chroma"
        );

    const finalNumber =
        shouldUseSpecialNumber
            ? getFinalRollNumber(
                rarity,
                originalNumber
            )
            : originalNumber;

    const baseEP =
        EP_VALUES[rarity] || 0;

    const epMultiplier =
        getUpgradeValue("epMultiplier");

    const earnedEP =
        Math.floor(
            baseEP * epMultiplier
        );

    await animateNumber(finalNumber);

    updateRarityDisplay(rarity);

    epDisplay.textContent =
        earnedEP.toLocaleString();

    updateAnalysis(finalNumber);

    data.totalRolls++;

    const currentRollNumber =
        data.totalRolls;

    data.totalEP += earnedEP;

    // Convert special Secret strings like "000001"
    // into numbers for statistics.
    const numericFinalNumber =
        Number(finalNumber);

    data.totalRollValue +=
        numericFinalNumber;

    data.highestNumber =
        Math.max(
            data.highestNumber,
            numericFinalNumber
        );

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    if (data.lastRollDate !== today) {
        if (data.lastRollDate) {
            const previousDate =
                new Date(data.lastRollDate);

            const currentDate =
                new Date(today);

            const difference =
                Math.floor(
                    (currentDate - previousDate) /
                    86400000
                );

            if (difference === 1) {
                data.dailyStreak++;
            } else {
                data.dailyStreak = 1;
            }
        } else {
            data.dailyStreak = 1;
        }

        data.lastRollDate = today;
    }

    const currentIndex =
        RARITY_ORDER.indexOf(rarity);

    const bestIndex =
        data.bestRarity
            ? RARITY_ORDER.indexOf(
                data.bestRarity
            )
            : -1;

    if (currentIndex > bestIndex) {
        data.bestRarity = rarity;
    }

    findBadges(
        finalNumber,
        rarity,
        currentRollNumber
    );

    data.history.push({
        number: finalNumber,
        rarity: rarity,
        ep: earnedEP,
        rollNumber: currentRollNumber,
        timestamp: Date.now()
    });

    if (data.history.length > 100) {
        data.history =
            data.history.slice(-100);
    }

    if (
        data.shrihanChromaReady &&
        rarity === "Chroma"
    ) {
        data.shrihanChromaReady = false;
    }

    displayBadges();
    displayBadgeIndex();
    updateStats();
    updateHistory();

    // =========================================
    // SECRET HAS HIGHEST PRIORITY
    // =========================================

    if (rarity === "Secret") {
        triggerSecretEffect();
    } else if (rarity === "Chroma") {
        triggerChromaEffect();
    } else if (rarity === "Mythic") {
        triggerMythicEffect();
    }

    return {
        number: finalNumber,
        rarity: rarity,
        ep: earnedEP
    };
}

// =========================================
// PERFORM ROLL
// =========================================

async function performRoll() {
    if (isRolling) {
        return;
    }

    if (getRemainingCooldown() > 0) {
        return;
    }

    isRolling = true;

    rollButton.disabled = true;

    updateCooldown();

    try {
        await processRoll();

        const doubleRollChance =
            getUpgradeValue("doubleRoll");

        if (
            doubleRollChance > 0 &&
            Math.random() < doubleRollChance / 100
        ) {
            await new Promise(resolve => {
                setTimeout(
                    resolve,
                    250
                );
            });

            await processRoll();
        }

        data.lastRoll = Date.now();

        saveData();

        updateStats();
        updateShop();
    } finally {
        isRolling = false;

        updateCooldown();
    }
}

// =========================================
// ERASE DATA
// =========================================

eraseDataButton.addEventListener(
    "click",
    () => {
        const confirmed =
            confirm(
                "Are You Sure You Want To Erase All RNG Data?"
            );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem("rngdleData");

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
    displayBadgeIndex();

    updateStats();
    updateHistory();
    updateShop();
    updateCooldown();

    initializeBackgroundCustomization();
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
