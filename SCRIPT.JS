// ============================================================
// RNG THING — DEVTOOLS / INSPECT DETERRENT
// ============================================================

(() => {
    "use strict";

    // ------------------------------------------------------------
    // SETTINGS
    // ------------------------------------------------------------

    const DEVTOOLS_CHECK_INTERVAL = 1000;
    const DEVTOOLS_SIZE_THRESHOLD = 180;

    let gameLocked = false;


    // ------------------------------------------------------------
    // LOCK GAME
    // ------------------------------------------------------------

    function lockGame(reason = "Developer Tools Were Detected.") {

        if (gameLocked) return;

        gameLocked = true;

        // Prevent The Game From Continuing To Receive Input
        document.documentElement.style.pointerEvents = "none";

        // Create Overlay
        const overlay = document.createElement("div");

        overlay.id = "rng-devtools-lock";

        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.zIndex = "2147483647";

        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";

        overlay.style.background = "#080808";
        overlay.style.color = "#ffffff";

        overlay.style.fontFamily =
            "Arial, Helvetica, sans-serif";

        overlay.style.textAlign = "center";

        overlay.style.pointerEvents = "auto";

        overlay.innerHTML = `
            <div
                style="
                    font-size:48px;
                    margin-bottom:20px;
                "
            >
                🔒
            </div>

            <div
                style="
                    font-size:30px;
                    font-weight:bold;
                    margin-bottom:12px;
                "
            >
                Game Locked
            </div>

            <div
                style="
                    font-size:17px;
                    opacity:.75;
                    max-width:500px;
                    padding:0 20px;
                    line-height:1.5;
                "
            >
                ${reason}
                <br>
                Please Close Developer Tools And Reload RNG Thing.
            </div>
        `;

        document.body.appendChild(overlay);


        // Block Interaction With The Game
        const blockInteraction = (event) => {

            if (event.target === overlay ||
                overlay.contains(event.target)) {

                return;
            }

            event.preventDefault();
            event.stopPropagation();
        };

        [
            "click",
            "mousedown",
            "mouseup",
            "pointerdown",
            "pointerup",
            "touchstart",
            "touchend",
            "keydown",
            "keyup",
            "keypress"
        ].forEach(eventName => {

            document.addEventListener(
                eventName,
                blockInteraction,
                true
            );

        });
    }


    // ------------------------------------------------------------
    // KEYBOARD SHORTCUT BLOCKING
    // ------------------------------------------------------------

    document.addEventListener(
        "keydown",
        function (event) {

            const key = String(event.key).toLowerCase();

            const ctrl = event.ctrlKey;
            const cmd = event.metaKey;
            const shift = event.shiftKey;
            const alt = event.altKey;


            // F12
            if (key === "f12") {

                event.preventDefault();
                event.stopPropagation();

                return;
            }


            // Ctrl + Shift + I
            // Cmd + Shift + I
            // Cmd + Option + I
            if (
                (ctrl && shift && key === "i") ||
                (cmd && shift && key === "i") ||
                (cmd && alt && key === "i")
            ) {

                event.preventDefault();
                event.stopPropagation();

                return;
            }


            // Ctrl + Shift + J
            // Cmd + Shift + J
            // Cmd + Option + J
            if (
                (ctrl && shift && key === "j") ||
                (cmd && shift && key === "j") ||
                (cmd && alt && key === "j")
            ) {

                event.preventDefault();
                event.stopPropagation();

                return;
            }


            // Ctrl + Shift + C
            // Cmd + Shift + C
            // Cmd + Option + C
            if (
                (ctrl && shift && key === "c") ||
                (cmd && shift && key === "c") ||
                (cmd && alt && key === "c")
            ) {

                event.preventDefault();
                event.stopPropagation();

                return;
            }


            // Ctrl + U / Cmd + U
            if (
                (ctrl || cmd) &&
                key === "u"
            ) {

                event.preventDefault();
                event.stopPropagation();

                return;
            }


            // Ctrl + Shift + K
            // Ctrl + Shift + S
            // Ctrl + Shift + E
            if (
                ctrl &&
                shift &&
                ["k", "s", "e"].includes(key)
            ) {

                event.preventDefault();
                event.stopPropagation();

                return;
            }


            // Cmd + Option + K
            // Cmd + Option + E
            if (
                cmd &&
                alt &&
                ["k", "e"].includes(key)
            ) {

                event.preventDefault();
                event.stopPropagation();

                return;
            }

        },
        true
    );


    // ------------------------------------------------------------
    // RIGHT CLICK
    // ------------------------------------------------------------

    document.addEventListener(
        "contextmenu",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

        },
        true
    );


    // ------------------------------------------------------------
    // TEXT / ELEMENT DRAGGING
    // ------------------------------------------------------------

    document.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();

        },
        true
    );


    // ------------------------------------------------------------
    // DEVTOOLS WINDOW SIZE DETECTION
    // ------------------------------------------------------------

    function checkDevToolsSize() {

        if (gameLocked) return;

        const widthDifference =
            window.outerWidth - window.innerWidth;

        const heightDifference =
            window.outerHeight - window.innerHeight;


        /*
            Large Differences Can Occur When DevTools
            Are Docked Beside Or Below The Page.

            This Is Only A Deterrent And May Trigger False Positives
            With Unusual Browser Window Sizes.

        */

        if (
            widthDifference > DEVTOOLS_SIZE_THRESHOLD ||
            heightDifference > DEVTOOLS_SIZE_THRESHOLD
        ) {

            lockGame(
                "Developer Tools Were Detected."
            );

        }
    }


    // Run Periodically
    setInterval(
        checkDevToolsSize,
        DEVTOOLS_CHECK_INTERVAL
    );


    // Also Check When Window Size Changes
    window.addEventListener(
        "resize",
        function () {

            checkDevToolsSize();

        }
    );


    // ------------------------------------------------------------
    // PREVENT SELECTION OUTSIDE INPUTS
    // ------------------------------------------------------------

    document.addEventListener(
        "selectstart",
        function (event) {

            const element =
                event.target;

            if (
                element &&
                (
                    element.tagName === "INPUT" ||
                    element.tagName === "TEXTAREA" ||
                    element.tagName === "SELECT"
                )
            ) {

                return;
            }

            event.preventDefault();

        },
        true
    );


    // ------------------------------------------------------------
    // VISIBILITY CHECK
    // ------------------------------------------------------------

    document.addEventListener(
        "visibilitychange",
        function () {

            /*
                We Intentionally DON'T Lock The Game Here.

                Switching Tabs, Minimizing The Browser,
                Opening Another App, Etc. Is Completely Normal.

            */

        }
    );


    // ------------------------------------------------------------
    // EXTRA INSPECT DETERRENT
    // ------------------------------------------------------------

    document.addEventListener(
        "keydown",
        function (event) {

            // Prevent Common "View Source" Attempts
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "u"
            ) {

                event.preventDefault();

            }

        },
        true
    );


    // ------------------------------------------------------------
    // INITIAL CHECK
    // ------------------------------------------------------------

    setTimeout(
        checkDevToolsSize,
        1500
    );

})();


const SUPABASE_URL = "https://vkuxbhnptsvwwcmqblrr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_aSmWV8Z1yitZvf5kricD3Q_aoslLEwE";

var supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("RNGdle connected to Supabase!");

// =========================================
// ACCOUNT / SIGN UP
// =========================================

const accountSection =
    document.getElementById("accountSection");

const signUpForm =
    document.getElementById("signUpForm");

const signUpUsername =
    document.getElementById("signUpUsername");

const signUpEmail =
    document.getElementById("signUpEmail");

const signUpPassword =
    document.getElementById("signUpPassword");

const signUpButton =
    document.getElementById("signUpButton");

const signUpMessage =
    document.getElementById("signUpMessage");


// =========================================
// SIGN UP
// =========================================

signUpForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const username =
            signUpUsername.value.trim();

        const email =
            signUpEmail.value.trim();

        const password =
            signUpPassword.value;


        if (!username || !email || !password) {

            signUpMessage.textContent =
                "Please Fill In Every Field.";

            return;
        }


        signUpButton.disabled =
            true;

        signUpMessage.textContent =
            "Creating Your Account...";


        try {

            const {
                data: authData,
                error
            } =
                await supabase.auth.signUp({
                    email: email,
                    password: password,

                    options: {
                        data: {
                            username: username
                        }
                    }
                });


            if (error) {
                throw error;
            }


            console.log(
                "Account Created:",
                authData
            );


            // =========================================
            // NEW ACCOUNT MUST START WITH FRESH QUESTS
            // =========================================

            data.questsCompleted = 0;
            data.currentQuestIndex = 0;
            data.questProgress = 0;

            // =========================================
            // CLEAR GUEST'S LAST ROLL DISPLAY
            // =========================================

            data.lastRoll = null;

            // =========================================
            // SAVE FRESH QUEST DATA TO THE NEW ACCOUNT
            // =========================================

            if (authData.user) {

                const currentUpgrades = {
                    ...(data.upgrades || {}),

                    __questsCompleted: 0,
                    __currentQuestIndex: 0,
                    __questProgress: 0
                };


                const {
                    error: profileError
                } =
                    await supabase
                        .from("profiles")
                        .update({

                            upgrades:
                                currentUpgrades

                        })
                        .eq(
                            "id",
                            authData.user.id
                        );


                if (profileError) {

                    console.error(
                        "New Account Quest Reset Error:",
                        profileError
                    );

                }

            }


            // =========================================
            // REFRESH QUEST UI IMMEDIATELY
            // =========================================

            updateQuestDisplay();


            // =========================================
            // REFRESH LAST ROLL UI
            // =========================================

            numberDisplay.textContent =
                "------";

            rarityDisplay.textContent =
                "";

            epDisplay.textContent =
                "";

            signUpMessage.textContent =
    "Account Created Successfully!";

const loaded =
    await loadDataFromSupabase();

if (!loaded) {

    signUpMessage.textContent =
        "Account Created, But Unable To Load Your New Account Data.";

    return;
}

signUpForm.reset();


        } catch (error) {

            console.error(
                "Sign Up Error:",
                error
            );


            signUpMessage.textContent =
                error.message ||
                "Unable To Create Account.";

        }


        signUpButton.disabled =
            false;

    }
);

// =========================================
// ACCOUNT / SIGN IN
// =========================================

const signInSection =
    document.getElementById("signInSection");

const signInForm =
    document.getElementById("signInForm");

const signInEmail =
    document.getElementById("signInEmail");

const signInPassword =
    document.getElementById("signInPassword");

const signInButton =
    document.getElementById("signInButton");

const signInMessage =
    document.getElementById("signInMessage");


// =========================================
// SIGN IN
// =========================================

signInForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const email =
            signInEmail.value.trim();

        const password =
            signInPassword.value;


        if (!email || !password) {

            signInMessage.textContent =
                "Please Fill In Every Field.";

            return;
        }


        signInButton.disabled =
            true;

        signInMessage.textContent =
            "Signing You In...";


        try {

            const {
                data: authData,
                error
            } =
                await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {
                throw error;
            }


            console.log(
                "Signed In:",
                authData
            );


            signInMessage.textContent =
    "Signed In Successfully!";

const loaded =
    await loadDataFromSupabase();

if (!loaded) {

    signInMessage.textContent =
        "Signed In, But Unable To Load Your Account Data.";

    return;
}

signInForm.reset();


        } catch (error) {

            console.error(
                "Sign In Error:",
                error
            );


            signInMessage.textContent =
                error.message ||
                "Unable To Sign In.";

        }


        signInButton.disabled =
            false;

    }
);

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

const questContainer =
    document.getElementById("questContainer");

const questName =
    document.getElementById("questName");

const questDescription =
    document.getElementById("questDescription");

const questProgressBar =
    document.getElementById("questProgressBar");

const questProgress =
    document.getElementById("questProgress");

const questReward =
    document.getElementById("questReward");

    const vipEpDisplay =
    document.getElementById(
        "vipEpDisplay"
    );

    const vipLuckDisplay =
    document.getElementById(
        "vipLuckDisplay"
    );

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

const buyRarityPurificationButton =
    document.getElementById(
        "buyRarityPurification"
    );

    const rebirthNumberEffectLevelDisplay =
    document.getElementById(
        "rebirthNumberEffectLevel"
    );

const rebirthNumberEffectDescriptionDisplay =
    document.getElementById(
        "rebirthNumberEffectDescription"
    );

const rebirthNumberEffectCostDisplay =
    document.getElementById(
        "rebirthNumberEffectCost"
    );

const buyRebirthNumberEffectButton =
    document.getElementById(
        "buyRebirthNumberEffect"
    );

const rebirthCountDisplay =
    document.getElementById("rebirthCount");

const rebirthTokensDisplay =
    document.getElementById("rebirthTokens");

const rebirthShopTokensDisplay =
    document.getElementById("rebirthShopTokens");

const rebirthCostMultiplierDisplay =
    document.getElementById("rebirthCostMultiplier");

const rebirthNotification =
    document.getElementById("rebirthNotification");

const rebirthNotificationText =
    document.getElementById("rebirthNotificationText");

const rebirthYesButton =
    document.getElementById("rebirthYesButton");

const rebirthNoButton =
    document.getElementById("rebirthNoButton");

const rebirthShopTab =
    document.getElementById("rebirthShopTab");

const epShopTab =
    document.getElementById("epShopTab");

const epShopContent =
    document.getElementById("epShopContent");

const rebirthShopContent =
    document.getElementById("rebirthShopContent");

    const vipShopDiscountDisplay =
    document.getElementById(
        "vipShopDiscountDisplay"
    );

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
// VIP ROLL
// =========================================

function canUseVIPRoll() {

    if (!isPlayerVIP()) {
        return false;
    }

    if (!data.vipRollLastUsed) {
        return true;
    }

    const lastUsed =
        new Date(
            data.vipRollLastUsed
        );

    const now =
        new Date();

    return (
        lastUsed.toDateString() !==
        now.toDateString()
    );
}

function activateVIPRoll() {

    if (!canUseVIPRoll()) {

        const message =
            isPlayerVIP()
                ? "VIPRoll Has Already Been Used Today!"
                : "VIPRoll Is Only Available To VIP Players!";

        vipRollMessageActive = true;

        dailyStatus.textContent =
            message;

        setTimeout(() => {

            vipRollMessageActive = false;

            if (
                dailyStatus.textContent ===
                message
            ) {
                dailyStatus.textContent = "";
            }

        }, 5000);

        return false;
    }

    data.vipRollArmed = true;

    saveData();

    const message =
        "VIPRoll Activated! Your Next Roll Is Guaranteed Secret!";

    vipRollMessageActive = true;

    dailyStatus.textContent =
        message;

    setTimeout(() => {

        vipRollMessageActive = false;

        if (
            dailyStatus.textContent ===
            message
        ) {
            dailyStatus.textContent = "";
        }

    }, 5000);

    return true;
}

function useVIPRoll() {

    if (!data.vipRollArmed) {
        return false;
    }

    if (!canUseVIPRoll()) {

        data.vipRollArmed = false;

        saveData();

        return false;
    }

    data.vipRollLastUsed =
        new Date().toISOString();

    data.vipRollArmed = false;

    saveData();

    return true;
}

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
// REBIRTH SHOP UPGRADES
// =========================================

const REBIRTH_SHOP_UPGRADE = {

    name: "Rarity Purification",

    levels: [

        {
            tokenCost: 0,
            epCost: 0,
            effect: "No Rarities Removed"
        },

        {
            tokenCost: 1,
            epCost: 500_000_000,
            effect: "Removes Trash"
        },

        {
            tokenCost: 3,
            epCost: 1_000_000_000,
            effect: "Removes Trash + Common"
        },

        {
            tokenCost: 5,
            epCost: 1_500_000_000,
            effect: "Removes Trash + Common + Uncommon"
        },

        {
            tokenCost: 7,
            epCost: 3_000_000_000,
            effect: "Removes Trash + Common + Uncommon + Rare"
        },

        {
            tokenCost: 10,
            epCost: 5_000_000_000,
            effect: "Removes Trash + Common + Uncommon + Rare + Epic"
        }

    ]

};

// =========================================
// REBIRTH SHOP — NUMBER EFFECTS
// =========================================

const REBIRTH_NUMBER_EFFECT_UPGRADE = {

    name: "Number Effects",

    levels: [

        {
            tokenCost: 0,
            epCost: 0,

            goldChance: 0,
            diamondChance: 0,
            rainbowChance: 0,

            goldMultiplier: 1,
            diamondMultiplier: 1,
            rainbowMultiplier: 1,

            effect: "No Special Number Effect"
        },

        {
            tokenCost: 5,
            epCost: 150_000_000,

            goldChance: 0.01,
            diamondChance: 0,
            rainbowChance: 0,

            goldMultiplier: 3,
            diamondMultiplier: 1,
            rainbowMultiplier: 1,

            effect: "1% Chance For Gold"
        },

        {
            tokenCost: 7,
            epCost: 300_000_000,

            goldChance: 0.10,
            diamondChance: 0.01,
            rainbowChance: 0,

            goldMultiplier: 3,
            diamondMultiplier: 7,
            rainbowMultiplier: 1,

            effect: "10% Gold + 1% Diamond"
        },

        {
            tokenCost: 14,
            epCost: 1_000_000_000,

            goldChance: 0.30,
            diamondChance: 0.10,
            rainbowChance: 0.01,

            goldMultiplier: 3,
            diamondMultiplier: 7,
            rainbowMultiplier: 15,

            effect: "30% Gold + 10% Diamond + 1% Rainbow"
        }

    ]

};

// =========================================
// REBIRTH SYSTEM
// =========================================

const MAX_REBIRTHS = 7;

const REBIRTH_COST_MULTIPLIERS = [
    1,
    1.5,
    3,
    5,
    7,
    10,
    11,
    15
];

const REBIRTH_TOKEN_REWARDS = [
    0,
    1,
    3,
    5,
    7,
    10,
    11,
    15
];

function getRebirthCostMultiplier() {
    const rebirthLevel =
        Math.max(
            0,
            Math.min(
                data.rebirths || 0,
                MAX_REBIRTHS
            )
        );

    return REBIRTH_COST_MULTIPLIERS[rebirthLevel];
}

function getRebirthTokenReward() {
    const nextRebirth =
        Math.min(
            MAX_REBIRTHS,
            (data.rebirths || 0) + 1
        );

    return REBIRTH_TOKEN_REWARDS[nextRebirth];
}

function getAvailableUpgradeNames() {
    return Object.keys(SHOP_UPGRADES);
}

function areAllUpgradesMaxed() {
    return getAvailableUpgradeNames().every(
        upgradeName =>
            getUpgradeLevel(upgradeName) >=
            SHOP_UPGRADES[upgradeName].levels.length - 1
    );
}

function canRebirth() {
    return (
        (data.rebirths || 0) < MAX_REBIRTHS &&
        areAllUpgradesMaxed()
    );
}

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
    Secret: 1500000
};

// =========================================
// CHROMA LUCK TABLE
// =========================================

const CHROMA_LUCK_DENOMINATORS = {
    1: 1000,
    2: 900,
    3: 750,
    4: 550,
    5: 500,
    6: 350,
    7: 300,
    8: 170,
    9: 150,
    10: 100,

    // VIP Luck
    11: 95,
    12: 90,
    13: 85,
    14: 80,
    15: 75
};

function getChromaDenominator(luck) {

    const cappedLuck =
        Math.min(
            15,
            Math.max(
                1,
                Math.floor(luck)
            )
        );

    return CHROMA_LUCK_DENOMINATORS[
        cappedLuck
    ];
}

function getChromaChance(luck) {

    const denominator =
        getChromaDenominator(luck);

    return 1 / denominator;
}

// =========================================
// TITLES
// =========================================

const TITLES = [
    {
        id: "rookieRoller",
        name: "Rookie Roller",
        requirement: "Roll 100 Times",
        check: () => data.totalRolls >= 100
    },

    {
        id: "gettingStarted",
        name: "Getting Started",
        requirement: "Roll 500 Times",
        check: () => data.totalRolls >= 500
    },

    {
        id: "questRookie",
        name: "Quest Rookie",
        requirement: "Complete 10 Quests",
        check: () => data.questsCompleted >= 10
    },

    {
        id: "luckyStart",
        name: "Lucky Start",
        requirement: "Get Your First Mythic",
        check: () => data.mythicRolls >= 1
    },

    {
        id: "dedicated",
        name: "Dedicated",
        requirement: "Play For 3 Hours",
        check: () => data.playTimeSeconds >= 10800
    },

    {
        id: "roller",
        name: "Roller",
        requirement: "Roll 1,500 Times",
        check: () => data.totalRolls >= 1500
    },

    {
        id: "rareHunter",
        name: "Rare Hunter",
        requirement: "Get 500 Rare+ Rolls",
        check: () => data.rarePlusRolls >= 500
    },

    {
        id: "questSeeker",
        name: "Quest Seeker",
        requirement: "Complete 50 Quests",
        check: () => data.questsCompleted >= 50
    },

    {
        id: "secretFinder",
        name: "Secret Finder",
        requirement: "Get Your First Secret",
        check: () => data.secretRolls >= 1
    },

    {
        id: "luckyRoller",
        name: "Lucky Roller",
        requirement: "Earn 1,000,000,000 EP",
        check: () => data.totalEP >= 1_000_000_000
    },

    {
        id: "rngVeteran",
        name: "RNG Veteran",
        requirement: "Roll 25,000 Times",
        check: () => data.totalRolls >= 25_000
    },

    {
        id: "legendaryHunter",
        name: "Legendary Hunter",
        requirement: "Get 500 Legendary Rolls",
        check: () => data.legendaryRolls >= 500
    },

    {
        id: "mythicHunter",
        name: "Mythic Hunter",
        requirement: "Get 700 Mythics",
        check: () => data.mythicRolls >= 700
    },

    {
        id: "questLegend",
        name: "Quest Legend",
        requirement: "Complete 500 Quests",
        check: () => data.questsCompleted >= 500
    },

    {
        id: "rebirthMaster",
        name: "Rebirth Master",
        requirement: "Reach 5 Rebirths",
        check: () => data.rebirths >= 5
    },

    {
        id: "rngMaster",
        name: "RNG Master",
        requirement: "Roll 500,000 Times",
        check: () => data.totalRolls >= 500_000
    },

    {
        id: "chromaHunter",
        name: "Chroma Hunter",
        requirement: "Get 3,000 Chromas",
        check: () => data.chromaRolls >= 3_000
    },

    {
        id: "secretHunter",
        name: "Secret Hunter",
        requirement: "Get 50 Secrets",
        check: () => data.secretRolls >= 50
    },

    {
        id: "theImpossible",
        name: "The Impossible",
        requirement: "Roll 999,999",
        check: () => data.rolled999999 === true
    },

    {
        id: "rngThingLegend",
        name: "RNG Thing Legend",
        requirement: "Reach 7 Rebirths + 1,000,000 Rolls",
        check: () =>
            data.rebirths >= 7 &&
            data.totalRolls >= 1_000_000
    }
];

// =========================================
// QUEST SYSTEM
// =========================================

const QUESTS = [

    {
        id: "roll10",
        name: "Warm Up",
        description: "Roll 10 Times",
        requirement: 10,
        reward: 100,
        check: () => data.totalRolls
    },

    {
        id: "roll25",
        name: "Getting Rolling",
        description: "Roll 25 Times",
        requirement: 25,
        reward: 250,
        check: () => data.totalRolls
    },

    {
        id: "roll50",
        name: "Roller In Training",
        description: "Roll 50 Times",
        requirement: 50,
        reward: 500,
        check: () => data.totalRolls
    },

    {
        id: "roll100",
        name: "Century Roller",
        description: "Roll 100 Times",
        requirement: 100,
        reward: 1_000,
        check: () => data.totalRolls
    },

    {
        id: "roll250",
        name: "Dedicated Roller",
        description: "Roll 250 Times",
        requirement: 250,
        reward: 2_500,
        check: () => data.totalRolls
    },

    {
        id: "roll500",
        name: "Rolling Along",
        description: "Roll 500 Times",
        requirement: 500,
        reward: 5_000,
        check: () => data.totalRolls
    },

    {
        id: "roll1000",
        name: "Roll Machine",
        description: "Roll 1,000 Times",
        requirement: 1_000,
        reward: 10_000,
        check: () => data.totalRolls
    },

    {
        id: "roll2500",
        name: "RNG Grinder",
        description: "Roll 2,500 Times",
        requirement: 2_500,
        reward: 25_000,
        check: () => data.totalRolls
    },

    {
        id: "roll5000",
        name: "RNG Addict",
        description: "Roll 5,000 Times",
        requirement: 5_000,
        reward: 50_000,
        check: () => data.totalRolls
    },

    {
        id: "roll10000",
        name: "Ten Thousand",
        description: "Roll 10,000 Times",
        requirement: 10_000,
        reward: 100_000,
        check: () => data.totalRolls
    }

];

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

titles: [],
equippedTitle: null,

questsCompleted: 0,
currentQuestIndex: 0,
questProgress: 0,

mythicRolls: 0,
legendaryRolls: 0,
chromaRolls: 0,
secretRolls: 0,
rarePlusRolls: 0,

rolled999999: false,

playTimeSeconds: 0,

    upgrades: {
        rollSpeed: 0,
        epMultiplier: 0,
        luck: 0,
        numberFortune: 0,
        doubleRoll: 0,
        secretThing: 0
    },

    rebirths: 0,
rebirthTokens: 0,

// Rarity Purification
rebirthShopUpgrade: 0,

// Special Number Effects
rebirthNumberEffectUpgrade: 0,

    backgroundColor: null,

isVIP: false,
vipRollLastUsed: null,
vipRollArmed: false,

shrihanCodeUsed: false,
shrihanChromaReady: false
};

// =========================================
// TITLE SYSTEM
// =========================================

function updateTitles() {

    if (!Array.isArray(data.titles)) {
        data.titles = [];
    }

    const newlyUnlocked = [];

    TITLES.forEach(title => {

        if (
            !data.titles.includes(title.id) &&
            title.check()
        ) {

            data.titles.push(title.id);

            newlyUnlocked.push(title);

            // Automatically Equip The First Title
            if (!data.equippedTitle) {
                data.equippedTitle = title.id;
            }

        }

    });

    if (newlyUnlocked.length > 0) {

    const titleNames =
        newlyUnlocked
            .map(title => title.name)
            .join(", ");

    dailyStatus.textContent =
        `New Title Unlocked: ${titleNames}!`;

    saveData();

    displayTitles();
}

    return newlyUnlocked;
}


function getEquippedTitle() {

    if (!data.equippedTitle) {
        return null;
    }

    return (
        TITLES.find(
            title =>
                title.id ===
                data.equippedTitle
        ) || null
    );

}


function equipTitle(titleId) {

    if (
        !data.titles.includes(titleId)
    ) {
        return false;
    }

    const title =
        TITLES.find(
            item =>
                item.id === titleId
        );

    if (!title) {
        return false;
    }

    data.equippedTitle =
        titleId;

    saveData();

    return true;
}

function updateVIPEpDisplay() {

    if (!vipEpDisplay) {
        return;
    }

    if (isPlayerVIP()) {

        vipEpDisplay.hidden =
            false;

    } else {

        vipEpDisplay.hidden =
            true;

    }

}

function updateVIPLuckDisplay() {

    if (!vipLuckDisplay) {
        return;
    }

    if (isPlayerVIP()) {

        vipLuckDisplay.hidden =
            false;

    } else {

        vipLuckDisplay.hidden =
            true;

    }

}

// =========================================
// ROLL LOCK
// =========================================

let isRolling = false;

// =========================================
// SECRET CODE
// =========================================

let shrihanCodeBuffer = "";
let vipRollCodeBuffer = "";
let vipRollMessageActive = false;

function activateShrihanCode() {
    if (data.shrihanCodeUsed) {
        return;
    }

    data.shrihanCodeUsed = true;
    data.shrihanChromaReady = true;

    saveData();

    dailyStatus.textContent =
        "Shrihan Code Activated! Next Roll = Chroma!";
}

document.addEventListener("keydown", event => {

    if (
        !event ||
        typeof event.key !== "string" ||
        event.key.length !== 1
    ) {
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
        shrihanCodeBuffer =
            shrihanCodeBuffer.slice(-7);
    }

    if (shrihanCodeBuffer === "Shrihan") {
        activateShrihanCode();
        shrihanCodeBuffer = "";
    }
});

// =========================================
// VIP ROLL CODE
// =========================================

document.addEventListener("keydown", event => {

    if (!event) {
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

    // Ignore modifier keys.
    if (
        event.key === "Shift" ||
        event.key === "Control" ||
        event.key === "Alt" ||
        event.key === "Meta"
    ) {
        return;
    }

    const key = event.key;

    if (
        typeof key !== "string" ||
        key.length === 0
    ) {
        return;
    }

    vipRollCodeBuffer += key;

    if (vipRollCodeBuffer.length > 8) {
        vipRollCodeBuffer =
            vipRollCodeBuffer.slice(-8);
    }

    console.log(
        "VIPRoll Buffer:",
        vipRollCodeBuffer
    );

    if (
        vipRollCodeBuffer ===
        "/VIPRoll"
    ) {

        activateVIPRoll();

        vipRollCodeBuffer = "";
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

        // =========================================
        // TITLE DATA SAFETY
        // =========================================

        if (!Array.isArray(data.titles)) {
            data.titles = [];
        }

        if (
            typeof data.equippedTitle !== "string" &&
            data.equippedTitle !== null
        ) {
            data.equippedTitle = null;
        }

        if (
            typeof data.questsCompleted !== "number"
        ) {
            data.questsCompleted = 0;
        }

        if (
            typeof data.mythicRolls !== "number"
        ) {
            data.mythicRolls = 0;
        }

        if (
            typeof data.legendaryRolls !== "number"
        ) {
            data.legendaryRolls = 0;
        }

        if (
            typeof data.chromaRolls !== "number"
        ) {
            data.chromaRolls = 0;
        }

        if (
            typeof data.secretRolls !== "number"
        ) {
            data.secretRolls = 0;
        }

        if (
            typeof data.rarePlusRolls !== "number"
        ) {
            data.rarePlusRolls = 0;
        }

        if (
            typeof data.rolled999999 !== "boolean"
        ) {
            data.rolled999999 = false;
        }

        if (
            typeof data.playTimeSeconds !== "number"
        ) {
            data.playTimeSeconds = 0;
        }

        if (
            typeof data.currentQuestIndex !== "number"
        ) {
            data.currentQuestIndex = 0;
        }

        if (
            typeof data.questProgress !== "number"
        ) {
            data.questProgress = 0;
        }

// =========================================
// REMOVE RETIRED BADGES
// =========================================

if (Array.isArray(data.badges)) {

    data.badges =
        data.badges.filter(
            badgeName =>
                badgeName !== "W Day"
        );

    data.totalBadges =
        data.badges.length;

}

        if (
            typeof parsed.rebirths !== "number" &&
            typeof parsed.upgrades?.__rebirths === "number"
        ) {
            data.rebirths =
                parsed.upgrades.__rebirths;
        }

        if (
            typeof parsed.rebirthTokens !== "number" &&
            typeof parsed.upgrades?.__rebirthTokens === "number"
        ) {
            data.rebirthTokens =
                parsed.upgrades.__rebirthTokens;
        }

        data.rebirths =
            Math.max(
                0,
                Math.min(
                    MAX_REBIRTHS,
                    Number(data.rebirths) || 0
                )
            );

        data.rebirthTokens =
            Math.max(
                0,
                Number(data.rebirthTokens) || 0
            );
    } catch (error) {
        console.error("Could Not Load RNGdle Data:", error);
    }
}

// =========================================
// LOAD DATA FROM SUPABASE
// =========================================

async function loadDataFromSupabase() {
    try {
        var {
            data: {
                user
            }
        } =
            await supabase.auth.getUser();

        if (!user) {
            return false;
        }

        var {
            data: profile,
            error
        } =
            await supabase
                .from("profiles")
                .select("*")
                .eq(
                    "id",
                    user.id
                )
                .single();

        if (error) {
            console.error(
                "Supabase Load Error:",
                error
            );

            return false;
        }

        if (!profile) {
            return false;
        }

                const profileUpgrades =
            profile.upgrades &&
            typeof profile.upgrades === "object"
                ? profile.upgrades
                : {};

        data = {

            totalRolls:
                profile.rolls ?? 0,

            totalEP:
                profile.ep ?? 0,

            bestRarity:
                profile.rarest_rarity ?? null,

            totalBadges:
                Array.isArray(profile.badges)
                    ? profile.badges.length
                    : 0,

            totalRollValue:
                profile.total_roll_value ?? 0,

            highestNumber:
                profile.highest_number ?? 0,

            dailyStreak:
                profile.daily_streak ?? 0,

            lastRoll:
                profile.last_roll_date ?? null,

            lastRollDate:
                profile.last_roll ?? null,

            history:
                Array.isArray(profile.history)
                    ? profile.history
                    : [],

            badges:
                Array.isArray(profile.badges)
                    ? profile.badges
                    : [],

            upgrades: {
                ...profileUpgrades,

                rollSpeed:
                    profileUpgrades.rollSpeed ?? 0,

                epMultiplier:
                    profileUpgrades.epMultiplier ?? 0,

                luck:
                    profileUpgrades.luck ?? 0,

                numberFortune:
                    profileUpgrades.numberFortune ?? 0,

                doubleRoll:
                    profileUpgrades.doubleRoll ?? 0,

                secretThing:
                    profileUpgrades.secretThing ?? 0
            },

            rebirths:
                profileUpgrades.__rebirths ?? 0,

            rebirthTokens:
                profileUpgrades.__rebirthTokens ?? 0,

            rebirthShopUpgrade:
                profileUpgrades.__rebirthShopUpgrade ?? 0,

            rebirthNumberEffectUpgrade:
                profileUpgrades.__rebirthNumberEffectUpgrade ?? 0,

            titles:
                Array.isArray(
                    profileUpgrades.__titles
                )
                    ? profileUpgrades.__titles
                    : [],

            equippedTitle:
                profileUpgrades.__equippedTitle ??
                null,

            questsCompleted:
                profileUpgrades.__questsCompleted ??
                0,

            currentQuestIndex:
                profileUpgrades.__currentQuestIndex ??
                0,

            questProgress:
                profileUpgrades.__questProgress ??
                0,

            mythicRolls:
                profileUpgrades.__mythicRolls ??
                0,

            legendaryRolls:
                profileUpgrades.__legendaryRolls ??
                0,

            chromaRolls:
                profileUpgrades.__chromaRolls ??
                0,

            secretRolls:
                profileUpgrades.__secretRolls ??
                0,

            rarePlusRolls:
                profileUpgrades.__rarePlusRolls ??
                0,

            rolled999999:
                profileUpgrades.__rolled999999 ??
                false,

            playTimeSeconds:
                profileUpgrades.__playTimeSeconds ??
                0,

            isVIP:
                profileUpgrades.__isVIP === true,

            vipRollLastUsed:
    profileUpgrades.__vipRollLastUsed ??
    null,

    vipRollArmed:
    profileUpgrades.__vipRollArmed === true,

            backgroundColor:
                profile.background_color ?? null,

            shrihanCodeUsed:
                profile.shrihan_code_used ?? false,

            shrihanChromaReady:
                profile.shrihan_chroma_ready ?? false
        };

// =========================================
// REMOVE RETIRED BADGES FROM ACCOUNT
// =========================================

if (Array.isArray(data.badges)) {

    data.badges =
        data.badges.filter(
            badgeName =>
                badgeName !== "W Day"
        );

    data.totalBadges =
        data.badges.length;

}

                if (
            !Number.isFinite(Number(data.totalRollValue)) ||
            Number(data.totalRollValue) < 0 ||
            Number(data.totalRollValue) >
                MAX_NUMBER * Number(data.totalRolls || 0)
        ) {
            data.totalRollValue =
                Array.isArray(data.history)
                    ? data.history.reduce(
                        (sum, roll) =>
                            sum + Number(roll.number || 0),
                        0
                    )
                    : 0;
        }

        delete data.upgrades.__rebirths;
        delete data.upgrades.__rebirthTokens;

        data.rebirths =
            Math.max(
                0,
                Math.min(
                    MAX_REBIRTHS,
                    Number(data.rebirths) || 0
                )
            );

        data.rebirthTokens =
            Math.max(
                0,
                Number(data.rebirthTokens) || 0
            );

if (typeof data.rebirthShopUpgrade !== "number") {
    data.rebirthShopUpgrade = 0;
}

if (typeof data.rebirthNumberEffectUpgrade !== "number") {
    data.rebirthNumberEffectUpgrade = 0;
}

        localStorage.setItem(
            "rngdleData",
            JSON.stringify(data)
        );

        displayBadges();
        displayBadgeIndex();
        updateStats();
        updateHistory();
        updateShop();
        updateCooldown();
        updateBackgroundButton();

        displayTitles();
        updateVIPEpDisplay();
        updateVIPLuckDisplay();
        updateVIPPriceDisplay();
        
        console.log(
            "RNGdle data loaded from Supabase!"
        );

        return true;

    } catch (error) {
        console.error(
            "Supabase Load Error:",
            error
        );

        return false;
    }
}

// =========================================
// VIP SYSTEM
// =========================================

const VIP_EP_MULTIPLIER = 5;
const VIP_LUCK_BONUS = 5;
const VIP_SHOP_DISCOUNT = 0.50;


// =========================================
// VIP CHECK
// =========================================

function isPlayerVIP() {

    return data.isVIP === true;

}


// =========================================
// VIP EP MULTIPLIER
// =========================================

function getVIPEpMultiplier() {

    return isPlayerVIP()
        ? VIP_EP_MULTIPLIER
        : 1;

}


// =========================================
// VIP LUCK
// =========================================

function getVIPLuckBonus() {

    return isPlayerVIP()
        ? VIP_LUCK_BONUS
        : 0;

}


// =========================================
// FINAL LUCK
// =========================================

function getEffectiveLuck() {

    const normalLuck =
        getUpgradeValue("luck");

    return Number(
        (
            normalLuck +
            getVIPLuckBonus()
        ).toFixed(1)
    );

}


// =========================================
// VIP SHOP DISCOUNT
// =========================================

function getVIPShopPrice(basePrice) {

    if (!isPlayerVIP()) {
        return basePrice;
    }

    return Math.ceil(
        basePrice *
        VIP_SHOP_DISCOUNT
    );

}

// =========================================
// VIP SHOP DISPLAY
// =========================================

function updateVIPShopDisplay() {

    if (!vipShopDiscountDisplay) {
        return;
    }

    vipShopDiscountDisplay.hidden =
        !isPlayerVIP();

}

// =========================================
// VIP PRICE SCHEDULE
// =========================================

const VIP_LAUNCH_DATE =
    "2026-09-23T00:00:00-04:00";

const VIP_FIRST_INCREASE =
    "2026-09-30T00:00:00-04:00";

const VIP_FINAL_INCREASE =
    "2026-10-07T00:00:00-04:00";

const VIP_PRICES = {
    launch: 15,
    second: 30,
    final: 50
};

function getVIPPriceInfo() {

    const now =
        new Date();

    const launchDate =
        new Date(
            VIP_LAUNCH_DATE
        );

    const firstIncrease =
        new Date(
            VIP_FIRST_INCREASE
        );

    const finalIncrease =
        new Date(
            VIP_FINAL_INCREASE
        );

    if (now < launchDate) {

        return {
            price: VIP_PRICES.launch,
            label: "Launch Price",
            nextDate: launchDate
        };

    }

    if (now < firstIncrease) {

        return {
            price: VIP_PRICES.launch,
            label: "Launch Price",
            nextDate: firstIncrease
        };

    }

    if (now < finalIncrease) {

        return {
            price: VIP_PRICES.second,
            label: "Limited Price",
            nextDate: finalIncrease
        };

    }

    return {
        price: VIP_PRICES.final,
        label: "Final Price — No More Increases",
        nextDate: null
    };
}

function updateVIPPriceDisplay() {

    const priceDisplay =
        document.getElementById(
            "vipPrice"
        );

    const labelDisplay =
        document.getElementById(
            "vipPriceLabel"
        );

    const countdownDisplay =
        document.getElementById(
            "vipCountdown"
        );

    const buyButton =
        document.getElementById(
            "buyVIPButton"
        );

    if (
        !priceDisplay ||
        !labelDisplay ||
        !countdownDisplay ||
        !buyButton
    ) {
        return;
    }

    if (isPlayerVIP()) {

        priceDisplay.textContent =
            "VIP Unlocked";

        labelDisplay.textContent =
            "Permanent VIP";

        countdownDisplay.textContent =
            "You Already Have VIP!";

        buyButton.textContent =
            "VIP Active";

        buyButton.disabled =
            true;

        return;
    }

    const info =
        getVIPPriceInfo();

    priceDisplay.textContent =
        `$${info.price}`;

    labelDisplay.textContent =
        info.label;

    if (!info.nextDate) {

        countdownDisplay.textContent =
            "Final Price — No More Increases";

        return;
    }

    const difference =
        info.nextDate.getTime() -
        Date.now();

    if (difference <= 0) {
        return;
    }

    const totalSeconds =
        Math.floor(
            difference / 1000
        );

    const days =
        Math.floor(
            totalSeconds / 86400
        );

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;

    countdownDisplay.textContent =
        `Price Increases In: ${days}d ${hours}h ${minutes}m ${seconds}s`;

}

// =========================================
// VIP PURCHASE INFORMATION
// =========================================

const buyVIPButton =
    document.getElementById(
        "buyVIPButton"
    );

if (buyVIPButton) {

    buyVIPButton.addEventListener(
        "click",
        () => {

            if (isPlayerVIP()) {

                alert(
                    "You Already Have VIP! 👑"
                );

                return;
            }

            const vipInfo =
                getVIPPriceInfo();

            alert(
                "👑 VIP Purchase\n\n" +
                `Current Price: $${vipInfo.price}\n\n` +
                "VIP Is Purchased Separately.\n\n" +
                "Contact Shrihan To Purchase VIP. " +
                "After Payment Is Confirmed, " +
                "Your Account Will Be Granted VIP."
            );

        }
    );

}

// =========================================
// SAVE DATA
// =========================================

async function syncDataToSupabase() {
    try {
        var {
            data: {
                user
            }
        } =
            await supabase.auth.getUser();

        if (!user) {
            return;
        }

        console.log(
    "LAST ROLL:",
    data.lastRoll
);

console.log(
    "LAST ROLL DATE:",
    data.lastRollDate
);


        var {
            error
        } =
            await supabase
                .from("profiles")
                .update({
                    username:
                        user.user_metadata?.username ||
                        user.email ||
                        "Account",

                    ep:
                        data.totalEP,

                    rolls:
                        data.totalRolls,

                    best_roll:
                        data.highestNumber,

                    rarest_rarity:
                        data.bestRarity,

                    badges:
                        data.badges,

                    total_roll_value:
                        data.totalRollValue,

                    highest_number:
                        data.highestNumber,

                    daily_streak:
                        data.dailyStreak,

                    last_roll:
                        data.lastRollDate,

                    last_roll_date:
                        data.lastRoll,

                    history:
                        data.history,

                   upgrades: {
    ...data.upgrades,

    __rebirths:
        data.rebirths || 0,

    __rebirthTokens:
        data.rebirthTokens || 0,

    __rebirthShopUpgrade:
        data.rebirthShopUpgrade || 0,

    __rebirthNumberEffectUpgrade:
    data.rebirthNumberEffectUpgrade || 0,

__titles:
    Array.isArray(data.titles)
        ? data.titles
        : [],

__equippedTitle:
    data.equippedTitle || null,

__questsCompleted:
    data.questsCompleted || 0,

__currentQuestIndex:
    data.currentQuestIndex || 0,

__questProgress:
    data.questProgress || 0,

__mythicRolls:
    data.mythicRolls || 0,

__legendaryRolls:
    data.legendaryRolls || 0,

__chromaRolls:
    data.chromaRolls || 0,

__secretRolls:
    data.secretRolls || 0,

__rarePlusRolls:
    data.rarePlusRolls || 0,

__rolled999999:
    data.rolled999999 || false,

__playTimeSeconds:
    data.playTimeSeconds || 0,

__isVIP:
    data.isVIP === true,

__vipRollLastUsed:
    data.vipRollLastUsed || null,

    __vipRollArmed:
    data.vipRollArmed === true
},

                    background_color:
                        data.backgroundColor,

                    shrihan_code_used:
                        data.shrihanCodeUsed,

                    shrihan_chroma_ready:
                        data.shrihanChromaReady
                })
                .eq(
                    "id",
                    user.id
                );

        if (error) {
            console.error(
                "Supabase Sync Error:",
                error
            );

            return;
        }

        console.log(
            "RNGdle data synced to Supabase!"
        );

    } catch (error) {
        console.error(
            "Supabase Sync Error:",
            error
        );
    }
}

function saveData() {
    localStorage.setItem(
        "rngdleData",
        JSON.stringify(data)
    );

    syncDataToSupabase();
}

// =========================================
// QUEST SYSTEM
// =========================================

function getCurrentQuest() {

    if (!QUESTS.length) {
        return null;
    }

    const index =
        Math.max(
            0,
            Math.min(
                data.currentQuestIndex || 0,
                QUESTS.length - 1
            )
        );

    return QUESTS[index];
}


// =========================================
// UPDATE QUEST DISPLAY
// =========================================

function updateQuestDisplay() {

    const quest =
        getCurrentQuest();

    if (!quest) {
        if (questName) {
            questName.textContent =
                "No Quest Available";
        }

        return;
    }

    const progress =
        Math.min(
            data.questProgress || 0,
            quest.requirement
        );

    if (questName) {
        questName.textContent =
            quest.name;
    }

    if (questDescription) {
        questDescription.textContent =
            quest.description;
    }

    if (questProgress) {
        questProgress.textContent =
            `${progress.toLocaleString()} / ${quest.requirement.toLocaleString()}`;
    }

    if (questReward) {
        questReward.textContent =
            `Reward: ${quest.reward.toLocaleString()} EP`;
    }

    if (questProgressBar) {

        const percentage =
            Math.min(
                100,
                (progress / quest.requirement) * 100
            );

        questProgressBar.style.width =
            `${percentage}%`;
    }
}


// =========================================
// ADD QUEST PROGRESS
// =========================================

function addQuestProgress(amount) {

    const quest =
        getCurrentQuest();

    if (!quest) {
        return;
    }

    data.questProgress =
        Math.min(
            quest.requirement,
            (data.questProgress || 0) + amount
        );

    updateQuestDisplay();

    if (
        data.questProgress >=
        quest.requirement
    ) {
        completeCurrentQuest();
    }

    saveData();
}


// =========================================
// COMPLETE QUEST
// =========================================

function completeCurrentQuest() {

    const quest =
        getCurrentQuest();

    if (!quest) {
        return;
    }

    // Give EP Reward
    data.totalEP +=
        quest.reward;

    // Increase Completed Quest Count
    data.questsCompleted =
        (data.questsCompleted || 0) + 1;

    // Move To Next Quest
    data.currentQuestIndex =
        (data.currentQuestIndex || 0) + 1;

    // Reset Progress
    data.questProgress = 0;

    // Loop Back If We Reach The End
    if (
        data.currentQuestIndex >=
        QUESTS.length
    ) {
        data.currentQuestIndex = 0;
    }

    updateQuestDisplay();

    updateStats();

    dailyStatus.textContent =
        `Quest Complete! +${quest.reward.toLocaleString()} EP!`;

    updateTitles();

    saveData();
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

    const upgrade =
        SHOP_UPGRADES[upgradeName];

    const level =
        getUpgradeLevel(upgradeName);

    if (
        level >=
        upgrade.levels.length - 1
    ) {
        return null;
    }

    const baseCost =
        upgrade.costs[level];

    const rebirthMultiplier =
        getRebirthCostMultiplier();

    const rebirthAdjustedCost =
        Math.ceil(
            baseCost *
            rebirthMultiplier
        );

    return getVIPShopPrice(
        rebirthAdjustedCost
    );

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

    levelDisplay.textContent = formatUpgradeValue(
        upgradeName,
        value
    );

    if (cost === null) {
        costDisplay.textContent = "MAXED";
        buyButton.textContent = "MAXED";
        buyButton.disabled = true;
        return;
    }

   if (isPlayerVIP()) {

    const upgrade =
        SHOP_UPGRADES[upgradeName];

    const level =
        getUpgradeLevel(upgradeName);

    const baseCost =
        upgrade.costs[level];

    const rebirthMultiplier =
        getRebirthCostMultiplier();

    const originalCost =
        Math.ceil(
            baseCost *
            rebirthMultiplier
        );

    costDisplay.innerHTML =
        `
        <span class="vip-original-price">
            ${originalCost.toLocaleString()} EP
        </span>

        <span class="vip-sale-price">
            ${cost.toLocaleString()} EP
        </span>

        <span class="vip-sale-label">
            50% OFF — VIP
        </span>
        `;

} else {

    costDisplay.textContent =
        `Cost: ${cost.toLocaleString()} EP`;

}

buyButton.textContent =
    data.totalEP >= cost
        ? "Buy"
        : "Not Enough EP";

buyButton.disabled =
    data.totalEP < cost;

    buyButton.disabled =
        data.totalEP < cost;
}

// =========================================
// UPDATE REBIRTH UI
// =========================================

function updateRebirthUI() {
    const rebirths =
        data.rebirths || 0;

    const tokens =
        data.rebirthTokens || 0;

    if (rebirthCountDisplay) {
        rebirthCountDisplay.textContent =
            `${rebirths} / ${MAX_REBIRTHS}`;
    }

    if (rebirthTokensDisplay) {
        rebirthTokensDisplay.textContent =
            tokens.toLocaleString();
    }

    if (rebirthShopTokensDisplay) {
        rebirthShopTokensDisplay.textContent =
            tokens.toLocaleString();
    }

    if (rebirthCostMultiplierDisplay) {
        rebirthCostMultiplierDisplay.textContent =
            `×${getRebirthCostMultiplier().toLocaleString()}`;
    }

    if (rebirthShopTab) {
        rebirthShopTab.hidden =
            rebirths <= 0;
    }

    if (rebirthShopContent && rebirths <= 0) {
        rebirthShopContent.hidden = true;
    }

    if (epShopContent && rebirths <= 0) {
        epShopContent.hidden = false;
    }

    if (rebirthNotification) {
        const showNotification =
            canRebirth();

        rebirthNotification.hidden =
            !showNotification;
    }

    if (rebirthNotificationText) {
        if (rebirths >= MAX_REBIRTHS) {
            rebirthNotificationText.textContent =
                "Maximum Rebirth Reached!";
        } else {
            const reward =
                getRebirthTokenReward();

            rebirthNotificationText.textContent =
                `You Have Maxed Every Upgrade! Rebirth Now And Gain +${reward} Rebirth Token${reward === 1 ? "" : "s"}.`;
        }
    }

    if (rebirthYesButton) {
        rebirthYesButton.disabled =
            !canRebirth();
    }

    if (rebirthNoButton) {
        rebirthNoButton.disabled =
            false;
    }

    // =========================================
    // RARITY PURIFICATION UI
    // =========================================

    const purificationLevel =
        data.rebirthShopUpgrade || 0;

    const purificationMaxLevel =
        REBIRTH_SHOP_UPGRADE.levels.length - 1;

    const purificationLevelDisplay =
        document.getElementById(
            "rebirthPurificationLevel"
        );

    const purificationDescriptionDisplay =
        document.getElementById(
            "rebirthPurificationDescription"
        );

    const purificationCostDisplay =
        document.getElementById(
            "rebirthPurificationCost"
        );

    const purificationButton =
        document.getElementById(
            "buyRarityPurification"
        );

    if (purificationLevelDisplay) {
        purificationLevelDisplay.textContent =
            `Level ${purificationLevel} / ${purificationMaxLevel}`;
    }

    if (purificationDescriptionDisplay) {
        purificationDescriptionDisplay.textContent =
            REBIRTH_SHOP_UPGRADE
                .levels[purificationLevel]
                .effect;
    }

    if (purificationLevel >= purificationMaxLevel) {

        if (purificationCostDisplay) {
            purificationCostDisplay.textContent =
                "MAX LEVEL REACHED";
        }

        if (purificationButton) {
            purificationButton.textContent =
                "MAXED";
            purificationButton.disabled =
                true;
        }

    } else {

        const nextPurificationLevel =
            purificationLevel + 1;

        const nextPurification =
            REBIRTH_SHOP_UPGRADE
                .levels[nextPurificationLevel];

        if (purificationCostDisplay) {
            purificationCostDisplay.textContent =
                `Cost: ${nextPurification.tokenCost.toLocaleString()} Rebirth Token${nextPurification.tokenCost === 1 ? "" : "s"} + ${nextPurification.epCost.toLocaleString()} EP`;
        }

        if (purificationButton) {

    const hasEnoughTokens =
        tokens >= nextPurification.tokenCost;

    const hasEnoughEP =
        data.totalEP >= nextPurification.epCost;

    const canAfford =
        hasEnoughTokens &&
        hasEnoughEP;

    purificationButton.textContent =
        canAfford
            ? "Buy"
            : "Not Enough Resources";

    purificationButton.disabled =
        !canAfford;
}
    }

// =========================================
// NUMBER EFFECT UI
// =========================================

const numberEffectLevel =
    data.rebirthNumberEffectUpgrade || 0;

const numberEffectMaxLevel =
    REBIRTH_NUMBER_EFFECT_UPGRADE
        .levels.length - 1;

const numberEffectUpgrade =
    REBIRTH_NUMBER_EFFECT_UPGRADE
        .levels[numberEffectLevel];

if (rebirthNumberEffectLevelDisplay) {

    rebirthNumberEffectLevelDisplay.textContent =
        `Level ${numberEffectLevel} / ${numberEffectMaxLevel}`;

}

if (rebirthNumberEffectDescriptionDisplay) {

    rebirthNumberEffectDescriptionDisplay.textContent =
        numberEffectUpgrade.effect;

}

if (
    numberEffectLevel >=
    numberEffectMaxLevel
) {

    if (rebirthNumberEffectCostDisplay) {

        rebirthNumberEffectCostDisplay.textContent =
            "MAX LEVEL REACHED";

    }

    if (buyRebirthNumberEffectButton) {

        buyRebirthNumberEffectButton.textContent =
            "MAXED";

        buyRebirthNumberEffectButton.disabled =
            true;

    }

} else {

    const nextNumberEffect =
        REBIRTH_NUMBER_EFFECT_UPGRADE
            .levels[numberEffectLevel + 1];

    if (rebirthNumberEffectCostDisplay) {

        rebirthNumberEffectCostDisplay.textContent =
            `Cost: ${nextNumberEffect.tokenCost.toLocaleString()} Rebirth Token${nextNumberEffect.tokenCost === 1 ? "" : "s"} + ${nextNumberEffect.epCost.toLocaleString()} EP`;

    }

    const hasEnoughTokens =
        (data.rebirthTokens || 0) >=
        nextNumberEffect.tokenCost;

    const hasEnoughEP =
        data.totalEP >=
        nextNumberEffect.epCost;

    const canAfford =
        hasEnoughTokens &&
        hasEnoughEP;

    if (buyRebirthNumberEffectButton) {

        buyRebirthNumberEffectButton.textContent =
            canAfford
                ? "Buy"
                : "Not Enough Resources";

        buyRebirthNumberEffectButton.disabled =
            !canAfford;

    }

}
}
// =========================================
// UPDATE SHOP
// =========================================

function updateShop() {

    updateVIPShopDisplay();

    shopEPDisplay.textContent =
        data.totalEP.toLocaleString();

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
        const secretLevel =
            getUpgradeLevel("secretThing");

        const secretMaxLevel =
            SHOP_UPGRADES.secretThing.levels.length - 1;

        if (secretLevel >= secretMaxLevel) {
            secretThingDescriptionDisplay.textContent =
                "0.1% Chance To Get Secret";
        } else {
            secretThingDescriptionDisplay.textContent =
                "Does Absolutely Nothing... Yet.";
        }
    }

    updateRebirthUI();
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
// BUY REBIRTH SHOP UPGRADE
// =========================================

function buyRebirthShopUpgrade() {

    const currentLevel =
        data.rebirthShopUpgrade || 0;

    const maxLevel =
        REBIRTH_SHOP_UPGRADE.levels.length - 1;

    // Already Maxed
    if (currentLevel >= maxLevel) {
        return;
    }

    const nextLevel =
        currentLevel + 1;

    const upgrade =
        REBIRTH_SHOP_UPGRADE.levels[nextLevel];

    // Not Enough Rebirth Tokens
    if (
        (data.rebirthTokens || 0) <
        upgrade.tokenCost
    ) {
        return;
    }

    // Not Enough EP
    if (
        data.totalEP <
        upgrade.epCost
    ) {
        return;
    }

    // Pay Costs
    data.rebirthTokens -=
        upgrade.tokenCost;

    data.totalEP -=
        upgrade.epCost;

    // Give Upgrade
    data.rebirthShopUpgrade =
        nextLevel;

    saveData();

    updateStats();
    updateShop();
    updateRebirthUI();
}

// =========================================
// BUY REBIRTH NUMBER EFFECT UPGRADE
// =========================================

function buyRebirthNumberEffectUpgrade() {

    const currentLevel =
        data.rebirthNumberEffectUpgrade || 0;

    const maxLevel =
        REBIRTH_NUMBER_EFFECT_UPGRADE.levels.length - 1;

    // Already Maxed
    if (currentLevel >= maxLevel) {
        return;
    }

    const nextLevel =
        currentLevel + 1;

    const upgrade =
        REBIRTH_NUMBER_EFFECT_UPGRADE
            .levels[nextLevel];

    // Not Enough Rebirth Tokens
    if (
        (data.rebirthTokens || 0) <
        upgrade.tokenCost
    ) {
        return;
    }

    // Not Enough EP
    if (
        data.totalEP <
        upgrade.epCost
    ) {
        return;
    }

    // Pay Costs
    data.rebirthTokens -=
        upgrade.tokenCost;

    data.totalEP -=
        upgrade.epCost;

    // Give Upgrade
    data.rebirthNumberEffectUpgrade =
        nextLevel;

    saveData();

    updateStats();
    updateShop();
    updateRebirthUI();
}

// =========================================
// REBIRTH
// =========================================

function resetUpgradesForRebirth() {
    Object.keys(SHOP_UPGRADES).forEach(
        upgradeName => {
            data.upgrades[upgradeName] = 0;
        }
    );
}

async function performRebirth() {
    if (!canRebirth()) {
        return;
    }

    if (isRolling) {
        return;
    }

    const nextRebirth =
        (data.rebirths || 0) + 1;

    const tokenReward =
        REBIRTH_TOKEN_REWARDS[nextRebirth];

    data.rebirths =
        nextRebirth;

    data.rebirthTokens =
        (data.rebirthTokens || 0) +
        tokenReward;

    // IMPORTANT:
    // EP IS NOT RESET.
    // Rolls, badges, history, rarity records,
    // and every other permanent stat stay intact.
    resetUpgradesForRebirth();

    saveData();

    updateStats();
    updateShop();

    await triggerRebirthCutscene(
        nextRebirth,
        tokenReward
    );

    updateRebirthUI();
    updateShop();
}

if (rebirthYesButton) {
    rebirthYesButton.addEventListener(
        "click",
        async () => {
            rebirthYesButton.disabled = true;

            try {
                await performRebirth();
            } finally {
                updateRebirthUI();
            }
        }
    );
}

if (rebirthNoButton) {
    rebirthNoButton.addEventListener(
        "click",
        () => {
            if (rebirthNotification) {
                rebirthNotification.hidden = true;
            }
        }
    );
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

if (buyRarityPurificationButton) {

    buyRarityPurificationButton.addEventListener(
        "click",
        () => {

            buyRebirthShopUpgrade();

        }
    );

}

if (buyRebirthNumberEffectButton) {

    buyRebirthNumberEffectButton.addEventListener(
        "click",
        () => {

            buyRebirthNumberEffectUpgrade();

        }
    );

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
        document.body.style.background =
            data.backgroundColor;

        return;
    }

    document.body.style.background =
        originalBackground;
}

// =========================================
// UPDATE BACKGROUND BUTTON
// =========================================

function updateBackgroundButton() {
    if (!backgroundCustomizationButton) {
        return;
    }

    if (data.backgroundColor) {
        backgroundCustomizationButton.textContent =
            `↩️ Reset Background — ${RESET_BACKGROUND_COST.toLocaleString()} EP`;

        backgroundCustomizationButton.disabled =
            data.totalEP < RESET_BACKGROUND_COST;
    } else {
        backgroundCustomizationButton.textContent =
            `🎨 Randomize Background — ${RANDOM_BACKGROUND_COST.toLocaleString()} EP`;

        backgroundCustomizationButton.disabled =
            data.totalEP < RANDOM_BACKGROUND_COST;
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
    data.backgroundColor =
        generateRandomBackground();

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

    backgroundCustomizationContainer =
        document.createElement("div");

    backgroundCustomizationContainer.id =
        "backgroundCustomization";

    backgroundCustomizationContainer.style.width =
        "100%";

    backgroundCustomizationContainer.style.display =
        "flex";

    backgroundCustomizationContainer.style.justifyContent =
        "center";

    backgroundCustomizationContainer.style.alignItems =
        "center";

    backgroundCustomizationContainer.style.marginTop =
        "40px";

    backgroundCustomizationContainer.style.marginBottom =
        "30px";

    backgroundCustomizationContainer.style.background =
        "transparent";

    backgroundCustomizationButton =
        document.createElement("button");

    backgroundCustomizationButton.id =
        "backgroundCustomizationButton";

    backgroundCustomizationButton.type =
        "button";

    backgroundCustomizationButton.style.background =
        "rgba(255, 255, 255, 0.08)";

    backgroundCustomizationButton.style.backdropFilter =
        "blur(8px)";

    backgroundCustomizationButton.style.webkitBackdropFilter =
        "blur(8px)";

    backgroundCustomizationButton.style.border =
        "1px solid rgba(255, 255, 255, 0.18)";

    backgroundCustomizationButton.style.color =
        "inherit";

    backgroundCustomizationButton.style.padding =
        "10px 18px";

    backgroundCustomizationButton.style.borderRadius =
        "10px";

    backgroundCustomizationButton.style.cursor =
        "pointer";

    backgroundCustomizationButton.style.opacity =
        "0.8";

    backgroundCustomizationButton.style.transition =
        "all 0.2s ease";

    backgroundCustomizationButton.addEventListener(
        "mouseenter",
        () => {
            if (!backgroundCustomizationButton.disabled) {
                backgroundCustomizationButton.style.opacity =
                    "1";

                backgroundCustomizationButton.style.background =
                    "rgba(255, 255, 255, 0.14)";
            }
        }
    );

    backgroundCustomizationButton.addEventListener(
        "mouseleave",
        () => {
            backgroundCustomizationButton.style.opacity =
                "0.8";

            backgroundCustomizationButton.style.background =
                "rgba(255, 255, 255, 0.08)";
        }
    );

    backgroundCustomizationButton.addEventListener(
        "click",
        handleBackgroundButton
    );

    backgroundCustomizationContainer.appendChild(
        backgroundCustomizationButton
    );

    document.body.appendChild(
        backgroundCustomizationContainer
    );

    updateBackgroundButton();
}

// =========================================
// INITIALIZE BACKGROUND CUSTOMIZATION
// =========================================

function initializeBackgroundCustomization() {
    originalBackground =
        document.body.style.background;

    applyBackground();
    createBackgroundButton();
    updateBackgroundButton();
}

// =========================================
// RANDOM NUMBER
// =========================================

function randomNumber() {
    const fortune =
        getUpgradeValue("numberFortune");

    if (fortune <= 1) {
        return Math.floor(
            Math.random() *
            (MAX_NUMBER - MIN_NUMBER + 1)
        ) + MIN_NUMBER;
    }

    const random =
        Math.pow(
            Math.random(),
            1 / fortune
        );

    return Math.floor(
        random *
        (MAX_NUMBER - MIN_NUMBER + 1)
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
            Math.floor(
                Math.random() *
                mythicNumbers.length
            )
        ];
    }

    if (rarity === "Chroma") {
        return chromaNumbers[
            Math.floor(
                Math.random() *
                chromaNumbers.length
            )
        ];
    }

    if (rarity === "Secret") {
        return secretNumbers[
            Math.floor(
                Math.random() *
                secretNumbers.length
            )
        ];
    }

    return null;
}

// =========================================
// FINAL NUMBER
// =========================================

function getFinalRollNumber(rarity, originalNumber) {
    const rarityNumber =
        generateRarityNumber(rarity);

    if (rarityNumber !== null) {
        return rarityNumber;
    }

    return originalNumber;
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
    return getDigits(number).reduce(
        (sum, digit) => sum + digit,
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
        digits
            .split("")
            .reverse()
            .join("")
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
    const digits =
        getDigits(number);

    for (
        let i = 1;
        i < digits.length;
        i++
    ) {
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
    const digits =
        getDigits(number);

    return digits.every(
        digit => digit === digits[0]
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
        ((number + 1) & number) === 0
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
    const digits =
        getDigits(number);

    let longestRun = 1;
    let currentRun = 1;

    for (
        let i = 1;
        i < digits.length;
        i++
    ) {
        if (digits[i] === digits[i - 1]) {
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

function getDigitCounts(number) {
    const digits =
        getDigits(number);

    const counts = {};

    digits.forEach(digit => {
        counts[digit] =
            (counts[digit] || 0) + 1;
    });

    return counts;
}

function getHighestDigitCount(number) {
    const counts =
        getDigitCounts(number);

    return Math.max(
        ...Object.values(counts)
    );
}

// =========================================
// TWO PAIRS
// =========================================

function hasTwoPairs(number) {
    const counts =
        getDigitCounts(number);

    const pairs =
        Object.values(counts)
            .filter(count => count >= 2);

    return pairs.length >= 2;
}

// =========================================
// RANDOM FALLBACK RARITY
// =========================================

function getRandomFallbackRarity() {
    const luck =
    getEffectiveLuck();

    const baseWeights = [
        { rarity: "Trash", weight: 40 },
        { rarity: "Common", weight: 30 },
        { rarity: "Uncommon", weight: 20 },
        { rarity: "Rare", weight: 15 },
        { rarity: "Epic", weight: 10 },
        { rarity: "Legendary", weight: 5 },
        { rarity: "Mythic", weight: 1 },
        { rarity: "Chroma", weight: 0.1 }
    ];

    const weights =
        baseWeights
            .filter(item =>
                isRarityAllowed(item.rarity)
            )
            .map(item => {
                const index =
                    baseWeights.findIndex(
                        base =>
                            base.rarity ===
                            item.rarity
                    );

                if (index <= 1) {
                    return {
                        ...item,
                        weight:
                            item.weight /
                            Math.max(1, luck)
                    };
                }

                return {
                    ...item,
                    weight:
                        item.weight *
                        Math.pow(
                            luck,
                            index / 2
                        )
                };
            });

    const totalWeight =
        weights.reduce(
            (sum, item) =>
                sum + item.weight,
            0
        );

    let roll =
        Math.random() *
        totalWeight;

    for (const item of weights) {
        roll -= item.weight;

        if (roll <= 0) {
            return item.rarity;
        }
    }

    return weights[weights.length - 1].rarity;
}
// =========================================
// DETERMINE NATURAL PATTERN RARITY
// =========================================

function getNaturalPatternRarity(number) {
    const longestRun =
        getLongestRepeatedDigitRun(number);

    const highestDigitCount =
        getHighestDigitCount(number);

    const twoPairs =
        hasTwoPairs(number);

    const formatted =
        formatNumber(number);

    if (
    isRarityAllowed("Chroma") &&
    longestRun >= 5
) {
    return "Chroma";
}

    if (
    isRarityAllowed("Chroma") &&
    number >= 999000
) {
    return "Chroma";
}

    if (
    isRarityAllowed("Chroma") &&
    (
        formatted === "123456" ||
        formatted === "654321"
    )
) {
    return "Chroma";
}

    if (
    isRarityAllowed("Mythic") &&
    longestRun >= 4 &&
    number >= 900000
) {
    return "Mythic";
}

    if (longestRun === 4) {
    if (isRarityAllowed("Legendary")) {
        return "Legendary";
    }
}

   if (highestDigitCount >= 4) {
    if (isRarityAllowed("Epic")) {
        return "Epic";
    }
}

    if (twoPairs) {
    if (isRarityAllowed("Epic")) {
        return "Epic";
    }
}

    if (highestDigitCount >= 3) {
    if (isRarityAllowed("Epic")) {
        return "Epic";
    }
}

   if (longestRun === 2) {
    if (isRarityAllowed("Rare")) {
        return "Rare";
    }
}

    return getRandomFallbackRarity();
}

// =========================================
// REBIRTH SHOP RARITY FILTER
// =========================================

function isRarityAllowed(rarity) {
    const level =
        data.rebirthShopUpgrade || 0;

    if (level >= 1 && rarity === "Trash") {
        return false;
    }

    if (level >= 2 && rarity === "Common") {
        return false;
    }

    if (level >= 3 && rarity === "Uncommon") {
        return false;
    }

    if (level >= 4 && rarity === "Rare") {
        return false;
    }

    if (level >= 5 && rarity === "Epic") {
        return false;
    }

    return true;
}

// =========================================
// DETERMINE RARITY
// =========================================

function determineRarity(number) {
    const secretThingLevel =
        getUpgradeLevel("secretThing");

    const secretThingMaxed =
        secretThingLevel >=
        SHOP_UPGRADES.secretThing.levels.length - 1;

    if (
    secretThingMaxed &&
    isRarityAllowed("Secret") &&
    Math.random() < 0.001
) {
    return "Secret";
}

    // =========================================
    // CHROMA LOTTERY
    // =========================================

    const luck =
    getEffectiveLuck();

const chromaChance =
    getChromaChance(luck);

    if (
    isRarityAllowed("Chroma") &&
    Math.random() < chromaChance
) {
    return "Chroma";
}

    const longestRun =
        getLongestRepeatedDigitRun(number);

    const highestDigitCount =
        getHighestDigitCount(number);

    const twoPairs =
        hasTwoPairs(number);

    const formatted =
        formatNumber(number);

   if (
    isRarityAllowed("Chroma") &&
    longestRun >= 5
) {
    return "Chroma";
}

if (
    isRarityAllowed("Chroma") &&
    number >= 999000
) {
    return "Chroma";
}

    if (
    isRarityAllowed("Chroma") &&
    (
        formatted === "123456" ||
        formatted === "654321"
    )
) {
    return "Chroma";
}

if (
    isRarityAllowed("Mythic") &&
    longestRun >= 4 &&
    number >= 900000
) {
    return "Mythic";
}

if (
    isRarityAllowed("Mythic") &&
    longestRun === 4
) {
    return "Mythic";
}

    if (longestRun === 3) {
    const rarity =
        Math.random() < 0.90
            ? "Legendary"
            : "Epic";

    if (isRarityAllowed(rarity)) {
        return rarity;
    }
}

    if (highestDigitCount >= 4) {
    if (isRarityAllowed("Epic")) {
        return "Epic";
    }
}

    if (twoPairs) {
    if (isRarityAllowed("Epic")) {
        return "Epic";
    }
}

    if (highestDigitCount >= 3) {
    if (isRarityAllowed("Epic")) {
        return "Epic";
    }
}

    if (longestRun === 2) {
    const rarity =
        Math.random() < 0.70
            ? "Rare"
            : "Epic";

    if (isRarityAllowed(rarity)) {
        return rarity;
    }
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
        check: (number, rarity, rollNumber) =>
            rollNumber === 1
    },

    {
        name: "Double Digits",
        description: "Roll Two Of The Same Digit In A Row",
        rarity: "Rare",
        check: number =>
            getLongestRepeatedDigitRun(number) >= 2
    },

    {
        name: "Triple Digits",
        description: "Roll Three Of The Same Digit In A Row",
        rarity: "Epic",
        check: number =>
            getLongestRepeatedDigitRun(number) >= 3
    },

    {
        name: "Four Of A Kind",
        description: "Roll Four Of The Same Digit Anywhere",
        rarity: "Epic",
        check: number =>
            getHighestDigitCount(number) >= 4
    },

    {
        name: "Quad Digits",
        description: "Roll Four Of The Same Digit In A Row",
        rarity: "Legendary",
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
        name: "The Impossible Roll",
        description: "Roll A Mythic",
        rarity: "Mythic",
        check: (number, rarity) =>
            rarity === "Mythic"
    },

    {
        name: "Chroma",
        description: "Roll A Chroma",
        rarity: "Chroma",
        check: (number, rarity) =>
            rarity === "Chroma"
    },

    {
        name: "Secret",
        description: "Get A Secret",
        rarity: "Secret",
        check: (number, rarity) =>
            rarity === "Secret"
    },

    {
        name: "Six-Seven",
        description: "Your Roll Contains 67 Together Somewhere",
        rarity: "Rare",
        check: number =>
            formatNumber(number).includes("67")
    },

    {
        name: "Lucky 7",
        description: "Your Roll Contains 777 Together Somewhere",
        rarity: "Legendary",
        check: number =>
            formatNumber(number).includes("777")
    }
];

// =========================================
// BADGE INDEX
// =========================================

function displayBadgeIndex() {
    badgeIndexContainer.innerHTML = "";

    const sortedBadges =
        BADGES
            .map(
                (badge, originalIndex) => ({
                    badge,
                    originalIndex
                })
            )
            .sort((a, b) => {
                const rarityDifference =
                    RARITY_ORDER.indexOf(
                        a.badge.rarity
                    ) -
                    RARITY_ORDER.indexOf(
                        b.badge.rarity
                    );

                if (rarityDifference !== 0) {
                    return rarityDifference;
                }

                return (
                    a.originalIndex -
                    b.originalIndex
                );
            });

    sortedBadges.forEach(
        ({ badge, originalIndex }) => {
            const unlocked =
                data.badges.includes(
                    badge.name
                );

            const element =
                document.createElement("div");

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

            badgeIndexContainer.appendChild(
                element
            );
        }
    );
}

// =========================================
// BADGE INDEX TOGGLE
// =========================================

function toggleBadgeIndex() {
    const isOpen =
        !badgeIndex.hidden;

    badgeIndex.hidden =
        isOpen;

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

function getRollBadges(
    number,
    rarity,
    rollNumber = null
) {
    return BADGES.filter(
        badge => {
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
        }
    );
}

// =========================================
// FIND NEW PERMANENT BADGES
// =========================================

function findBadges(
    number,
    rarity,
    rollNumber
) {
    const unlocked = [];

    for (const badge of BADGES) {
        if (
            data.badges.includes(
                badge.name
            )
        ) {
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
// TITLES UI STYLES
// =========================================

function createTitlesStyles() {

    if (
        document.getElementById(
            "titlesStyles"
        )
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "titlesStyles";

    style.textContent = `

        #titlesSection {

            margin-top: 24px;
            padding: 24px;

            border-radius: 18px;

            background:
                rgba(255, 255, 255, 0.06);

            border:
                1px solid
                rgba(255, 255, 255, 0.12);

            box-shadow:
                0 10px 35px
                rgba(0, 0, 0, 0.18);

        }

        .titles-header {

            display: flex;
            justify-content: space-between;
            align-items: center;

            gap: 20px;

            margin-bottom: 20px;

        }

        .titles-header h2 {

            margin: 0;

        }

        #equippedTitleDisplay {

            margin:
                6px 0 0;

            opacity: .7;

            font-size: 14px;

        }

        .titles-progress {

            font-weight: 700;

            opacity: .8;

            white-space: nowrap;

        }

        .titles-container {

            display: flex;

            flex-direction: column;

            gap: 10px;

        }

        .titles-tier-title {

            margin-top: 18px;

            margin-bottom: 4px;

            font-size: 14px;

            font-weight: 800;

            text-transform: uppercase;

            letter-spacing: .08em;

            opacity: .8;

        }

        .titles-tier-title:first-child {

            margin-top: 0;

        }

        .title-card {

            display: flex;

            justify-content: space-between;

            align-items: center;

            gap: 16px;

            padding: 15px 17px;

            border-radius: 13px;

            border:
                1px solid
                rgba(255, 255, 255, .10);

            background:
                rgba(255, 255, 255, .035);

            transition:
                transform .15s ease,
                background .15s ease,
                border-color .15s ease;

        }

        .title-card:hover {

            transform:
                translateY(-1px);

            background:
                rgba(255, 255, 255, .06);

        }

        .title-unlocked {

            border-color:
                rgba(255, 255, 255, .18);

        }

        .title-locked {

            opacity: .55;

        }

        .title-equipped {

            border-color:
                rgba(255, 215, 0, .65);

            box-shadow:
                0 0 18px
                rgba(255, 215, 0, .10);

        }

        .title-card-name {

            font-size: 17px;

            font-weight: 800;

        }

        .title-locked .title-card-name {

            color:
                rgba(255, 255, 255, .55);

        }

        .title-card-requirement {

            margin-top: 3px;

            font-size: 13px;

            opacity: .65;

        }

        .title-card-progress {

            margin-top: 5px;

            font-size: 12px;

            opacity: .5;

        }

        .title-card-action {

            flex-shrink: 0;

        }

        .title-equip-button {

            padding:
                8px 14px;

            border: none;

            border-radius: 9px;

            cursor: pointer;

            font-weight: 700;

            background:
                rgba(255, 255, 255, .12);

            color: inherit;

        }

        .title-equip-button:hover {

            background:
                rgba(255, 255, 255, .20);

        }

        .title-equip-button:disabled {

            cursor: default;

            opacity: .55;

        }

        .title-locked-label {

            font-size: 13px;

            opacity: .5;

        }

        @media (max-width: 600px) {

            #titlesSection {

                padding: 16px;

            }

            .titles-header {

                align-items: flex-start;

            }

            .title-card {

                align-items: flex-start;

            }

            .title-card-action {

                margin-top: 2px;

            }

        }

    `;

    document.head.appendChild(
        style
    );

}

// =========================================
// TITLES UI
// =========================================

function createTitlesUI() {

    createTitlesStyles();

    // Prevent Duplicate Titles UI
    if (
        document.getElementById(
            "titlesSection"
        )
    ) {
        return;
    }

    const titlesSection =
        document.createElement("section");

    titlesSection.id =
        "titlesSection";

    titlesSection.innerHTML = `
        <div
            class="titles-header"
            id="titlesHeader"
            role="button"
            tabindex="0"
            aria-expanded="false"
        >

            <div>
                <h2>Player Titles</h2>

                <p id="equippedTitleDisplay">
                    No Title Equipped
                </p>
            </div>

            <div
                class="titles-header-right"
            >

                <div
                    id="titlesProgressDisplay"
                    class="titles-progress"
                >
                    0 / ${TITLES.length}
                </div>

                <span
                    id="titlesDropdownArrow"
                    class="titles-dropdown-arrow"
                >
                    ▼
                </span>

            </div>

        </div>

        <div
            id="titlesContainer"
            class="titles-container"
            hidden
        ></div>
    `;

    /*
        Try To Place The Titles Section
        Directly After The Badges Section.
    */

    const badgeSection =
        badgeContainer?.closest(
            "section"
        );

    if (badgeSection) {

        badgeSection.insertAdjacentElement(
            "afterend",
            titlesSection
        );

    } else if (
        badgeContainer?.parentElement
    ) {

        badgeContainer.parentElement
            .insertAdjacentElement(
                "afterend",
                titlesSection
            );

    } else {

        document.body.appendChild(
            titlesSection
        );

    }

    // =========================================
    // TITLES DROPDOWN
    // =========================================

    const titlesHeader =
        document.getElementById(
            "titlesHeader"
        );

    const titlesContainer =
        document.getElementById(
            "titlesContainer"
        );

    const titlesDropdownArrow =
        document.getElementById(
            "titlesDropdownArrow"
        );

    function toggleTitles() {

        const isOpen =
            !titlesContainer.hidden;

        titlesContainer.hidden =
            isOpen;

        titlesHeader.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        titlesHeader.classList.toggle(
            "titles-open",
            !isOpen
        );

        if (titlesDropdownArrow) {

            titlesDropdownArrow.textContent =
                isOpen
                    ? "▼"
                    : "▲";

        }

        if (!isOpen) {

            displayTitles();

        }

    }

    titlesHeader.addEventListener(
        "click",
        toggleTitles
    );

    titlesHeader.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                toggleTitles();

            }

        }
    );

    displayTitles();
}

// =========================================
// DISPLAY TITLES
// =========================================

function displayTitles() {

    const container =
        document.getElementById(
            "titlesContainer"
        );

    const equippedDisplay =
        document.getElementById(
            "equippedTitleDisplay"
        );

    const progressDisplay =
        document.getElementById(
            "titlesProgressDisplay"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const unlockedTitles =
        TITLES.filter(
            title =>
                data.titles.includes(
                    title.id
                )
        );

    // =========================================
    // EQUIPPED TITLE
    // =========================================

    const equippedTitle =
        getEquippedTitle();

    if (equippedDisplay) {

        equippedDisplay.textContent =
            equippedTitle
                ? `Equipped Title: ${equippedTitle.name}`
                : "No Title Equipped";

    }

    // =========================================
    // TITLE PROGRESS
    // =========================================

    if (progressDisplay) {

        progressDisplay.textContent =
            `${unlockedTitles.length} / ${TITLES.length}`;

    }

    // =========================================
    // TIER DISPLAY
    // =========================================

    const tiers = [
        {
            name: "🟢 Beginner",
            start: 0,
            end: 5,
            className: "titles-tier-easy"
        },
        {
            name: "🔵 Advanced",
            start: 5,
            end: 10,
            className: "titles-tier-hour"
        },
        {
            name: "🟣 Elite",
            start: 10,
            end: 15,
            className: "titles-tier-grind"
        },
        {
            name: "🔴 Legendary",
            start: 15,
            end: 20,
            className: "titles-tier-impossible"
        }
    ];

    tiers.forEach(
        tier => {

            const tierTitle =
                document.createElement(
                    "div"
                );

            tierTitle.className =
                `titles-tier-title ${tier.className}`;

            tierTitle.textContent =
                tier.name;

            container.appendChild(
                tierTitle
            );

            for (
                let index = tier.start;
                index < tier.end;
                index++
            ) {

                const title =
                    TITLES[index];

                if (!title) {
                    continue;
                }

                const unlocked =
                    data.titles.includes(
                        title.id
                    );

                const equipped =
                    data.equippedTitle ===
                    title.id;

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "title-card";

                if (unlocked) {
                    card.classList.add(
                        "title-unlocked"
                    );
                } else {
                    card.classList.add(
                        "title-locked"
                    );
                }

                if (equipped) {
                    card.classList.add(
                        "title-equipped"
                    );
                }

                const progress =
                    getTitleProgress(
                        title
                    );

                card.innerHTML = `
                    <div class="title-card-info">

                        <div class="title-card-name">
                            ${unlocked
                                ? title.name
                                : "Locked Title"
                            }
                        </div>

                        <div class="title-card-requirement">
                            ${title.requirement}
                        </div>

                        <div class="title-card-progress">
                            ${progress.text}
                        </div>

                    </div>

                    <div class="title-card-action">

                        ${
                            unlocked
                                ? `
                                    <button
                                        class="title-equip-button"
                                        data-title-id="${title.id}"
                                        ${
                                            equipped
                                                ? "disabled"
                                                : ""
                                        }
                                    >
                                        ${
                                            equipped
                                                ? "Equipped"
                                                : "Equip"
                                        }
                                    </button>
                                `
                                : `
                                    <span class="title-locked-label">
                                        🔒 Locked
                                    </span>
                                `
                        }

                    </div>
                `;

                container.appendChild(
                    card
                );

            }

        }
    );

    // =========================================
    // EQUIP BUTTONS
    // =========================================

    container
        .querySelectorAll(
            ".title-equip-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const titleId =
                            button.dataset
                                .titleId;

                        if (
                            equipTitle(
                                titleId
                            )
                        ) {

                            displayTitles();

                            saveData();

                        }

                    }
                );

            }
        );
}


// =========================================
// TITLE PROGRESS
// =========================================

function getTitleProgress(title) {

    switch (title.id) {

        case "rookieRoller":
            return {
                current: data.totalRolls,
                required: 100,
                text:
                    `${Math.min(data.totalRolls, 100).toLocaleString()} / 100 Rolls`
            };

        case "gettingStarted":
            return {
                current: data.totalRolls,
                required: 500,
                text:
                    `${Math.min(data.totalRolls, 500).toLocaleString()} / 500 Rolls`
            };

        case "questRookie":
            return {
                current: data.questsCompleted,
                required: 10,
                text:
                    `${Math.min(data.questsCompleted, 10)} / 10 Quests`
            };

        case "luckyStart":
            return {
                current: data.mythicRolls,
                required: 1,
                text:
                    `${Math.min(data.mythicRolls, 1)} / 1 Mythic`
            };

        case "dedicated":
            return {
                current: data.playTimeSeconds,
                required: 10800,
                text:
                    `${formatPlayTime(
                        Math.min(
                            data.playTimeSeconds,
                            10800
                        )
                    )} / 3 Hours`
            };

        case "roller":
            return {
                current: data.totalRolls,
                required: 1500,
                text:
                    `${Math.min(data.totalRolls, 1500).toLocaleString()} / 1,500 Rolls`
            };

        case "rareHunter":
            return {
                current: data.rarePlusRolls,
                required: 500,
                text:
                    `${Math.min(data.rarePlusRolls, 500).toLocaleString()} / 500 Rare+ Rolls`
            };

        case "questSeeker":
            return {
                current: data.questsCompleted,
                required: 50,
                text:
                    `${Math.min(data.questsCompleted, 50)} / 50 Quests`
            };

        case "secretFinder":
            return {
                current: data.secretRolls,
                required: 1,
                text:
                    `${Math.min(data.secretRolls, 1)} / 1 Secret`
            };

        case "luckyRoller":
            return {
                current: data.totalEP,
                required: 1_000_000_000,
                text:
                    `${Math.min(
                        data.totalEP,
                        1_000_000_000
                    ).toLocaleString()} / 1,000,000,000 EP`
            };

        case "rngVeteran":
            return {
                current: data.totalRolls,
                required: 25_000,
                text:
                    `${Math.min(data.totalRolls, 25_000).toLocaleString()} / 25,000 Rolls`
            };

        case "legendaryHunter":
            return {
                current: data.legendaryRolls,
                required: 500,
                text:
                    `${Math.min(data.legendaryRolls, 500).toLocaleString()} / 500 Legendary Rolls`
            };

        case "mythicHunter":
            return {
                current: data.mythicRolls,
                required: 700,
                text:
                    `${Math.min(data.mythicRolls, 700).toLocaleString()} / 700 Mythics`
            };

        case "questLegend":
            return {
                current: data.questsCompleted,
                required: 500,
                text:
                    `${Math.min(data.questsCompleted, 500)} / 500 Quests`
            };

        case "rebirthMaster":
            return {
                current: data.rebirths,
                required: 5,
                text:
                    `${Math.min(data.rebirths, 5)} / 5 Rebirths`
            };

        case "rngMaster":
            return {
                current: data.totalRolls,
                required: 500_000,
                text:
                    `${Math.min(data.totalRolls, 500_000).toLocaleString()} / 500,000 Rolls`
            };

        case "chromaHunter":
            return {
                current: data.chromaRolls,
                required: 3_000,
                text:
                    `${Math.min(data.chromaRolls, 3_000).toLocaleString()} / 3,000 Chromas`
            };

        case "secretHunter":
            return {
                current: data.secretRolls,
                required: 50,
                text:
                    `${Math.min(data.secretRolls, 50)} / 50 Secrets`
            };

        case "theImpossible":
            return {
                current:
                    data.rolled999999
                        ? 1
                        : 0,
                required: 1,
                text:
                    data.rolled999999
                        ? "999,999 Rolled!"
                        : "0 / 1 — Roll 999,999"
            };

        case "rngThingLegend":
            return {
                current:
                    Math.min(
                        data.rebirths,
                        7
                    ),
                required: 7,
                text:
                    `${Math.min(data.rebirths, 7)} / 7 Rebirths + ${Math.min(data.totalRolls, 1_000_000).toLocaleString()} / 1,000,000 Rolls`
            };

        default:
            return {
                current: 0,
                required: 1,
                text: title.requirement
            };

    }

}


// =========================================
// FORMAT PLAY TIME
// =========================================

function formatPlayTime(seconds) {

    const hours =
        Math.floor(
            seconds / 3600
        );

    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );

    const remainingSeconds =
        seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

// =========================================
// DISPLAY BADGES
// =========================================

function displayBadges() {
    badgeContainer.innerHTML = "";

    if (data.badges.length === 0) {
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
// CURRENT ROLL BADGES
// =========================================

function getRollBadgeHTML(
    number,
    rarity,
    rollNumber = null
) {
    const badges =
        getRollBadges(
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
// SPECIAL NUMBER DISPLAY
// =========================================

function updateNumberEffectDisplay(effect) {

    numberDisplay.classList.remove(
        "number-gold",
        "number-diamond",
        "number-rainbow"
    );

    if (effect === "gold") {

        numberDisplay.classList.add(
            "number-gold"
        );

    } else if (effect === "diamond") {

        numberDisplay.classList.add(
            "number-diamond"
        );

    } else if (effect === "rainbow") {

        numberDisplay.classList.add(
            "number-rainbow"
        );

    }

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
            ctx.currentTime +
            duration
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
        oldTitle =
            title.innerHTML;

        title.innerHTML = `
            <div class="mythic-crown">♛</div>
            <span>MYTHIC</span>
            <small>The Impossible Roll</small>
        `;
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
        mythicEffect.classList.remove(
            "active"
        );

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
            title.innerHTML =
                oldTitle;
        }

        playPostRarityEffect(
            "mythic"
        );
    }, 5000);
}

// =========================================
// POST RARITY EFFECT
// =========================================

function playPostRarityEffect(rarity) {
    const duration = 7000;

    numberDisplay.classList.remove(
        "post-mythic",
        "post-chroma",
        "post-secret"
    );

    void numberDisplay.offsetWidth;

    numberDisplay.classList.add(
        `post-${rarity}`
    );

    setTimeout(() => {
        numberDisplay.classList.remove(
            `post-${rarity}`
        );
    }, duration);
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
        oldTitle =
            title.innerHTML;

        title.innerHTML = `
            <div class="mythic-crown">✦</div>
            <span>CHROMA</span>
            <small>The Impossible Roll</small>
        `;
    }

    document.body.classList.add(
        "chroma-cutscene"
    );

    mythicEffect.classList.remove(
        "active"
    );

    void mythicEffect.offsetWidth;

    mythicEffect.classList.add(
        "active"
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
        mythicEffect.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "chroma-cutscene"
        );

        if (
            title &&
            oldTitle !== null
        ) {
            title.innerHTML =
                oldTitle;
        }

        playPostRarityEffect(
            "chroma"
        );
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
        oldTitle =
            title.innerHTML;

        title.innerHTML = `
            <div class="mythic-crown"></div>
            <span>SECRET</span>
            <small>THE IMPOSSIBLE THING</small>
        `;
    }

    document.body.classList.add(
        "secret-cutscene"
    );

    mythicEffect.classList.remove(
        "active"
    );

    void mythicEffect.offsetWidth;

    mythicEffect.classList.add(
        "active"
    );

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
        mythicEffect.classList.remove(
            "active"
        );

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
            title.innerHTML =
                oldTitle;
        }

        playPostRarityEffect(
            "secret"
        );
    }, 10000);
}

// =========================================
// REBIRTH CUTSCENE
// =========================================

function triggerRebirthCutscene(
    rebirthNumber,
    tokenReward
) {
    const effect =
        document.getElementById(
            "rebirthEffect"
        );

    if (!effect) {
        return Promise.resolve();
    }

    const title =
        document.getElementById(
            "rebirthCutsceneTitle"
        );

    const subtitle =
        document.getElementById(
            "rebirthCutsceneSubtitle"
        );

    const coin =
        document.getElementById(
            "rebirthCoin"
        );

    const reward =
        document.getElementById(
            "rebirthCutsceneReward"
        );

    if (title) {
        title.textContent =
            `REBIRTH ${rebirthNumber}`;
    }

    if (subtitle) {
        subtitle.textContent =
            "YOUR UPGRADES HAVE BEEN REBORN";
    }

    if (reward) {
        reward.textContent =
            `+${tokenReward} REBIRTH TOKEN${tokenReward === 1 ? "" : "S"}`;
    }

    document.body.classList.add(
        "rebirth-cutscene"
    );

    effect.classList.remove(
        "active"
    );

    if (coin) {
        coin.classList.remove(
            "rebirth-coin-fly"
        );
    }

    void effect.offsetWidth;

    effect.classList.add(
        "active"
    );

    rarityTone(
        110,
        1.2,
        "sine",
        0.035
    );

    setTimeout(() => {
        rarityTone(
            165,
            1.2,
            "triangle",
            0.045
        );
    }, 700);

    setTimeout(() => {
        rarityTone(
            247,
            1.2,
            "sine",
            0.055
        );
    }, 1500);

    setTimeout(() => {
        rarityTone(
            330,
            1.4,
            "triangle",
            0.065
        );
    }, 2300);

    setTimeout(() => {
        rarityTone(
            494,
            1.5,
            "sine",
            0.075
        );
    }, 3200);

    setTimeout(() => {
        rarityTone(
            659,
            1.6,
            "triangle",
            0.085
        );
    }, 4300);

    setTimeout(() => {
        rarityTone(
            988,
            1.8,
            "sine",
            0.095
        );
    }, 5400);

    setTimeout(() => {
        rarityTone(
            1318,
            1.8,
            "triangle",
            0.11
        );
    }, 6500);

    setTimeout(() => {
        rarityTone(
            1760,
            2,
            "sine",
            0.12
        );

        if (coin) {
            coin.classList.add(
                "rebirth-coin-fly"
            );
        }
    }, 7800);

    return new Promise(
        resolve => {
            setTimeout(() => {
                effect.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "rebirth-cutscene"
                );

                if (coin) {
                    coin.classList.remove(
                        "rebirth-coin-fly"
                    );
                }

                resolve();
            }, 10000);
        }
    );
}

// =========================================
// NUMBER ANIMATION
// =========================================

function animateNumber(finalNumber) {
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

                    numberDisplay.textContent =
                        formatNumber(
                            randomNumber()
                        );

                    if (progress >= 1) {
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

function getCurrentRollCooldown() {
    return getUpgradeValue(
        "rollSpeed"
    );
}

function getRemainingCooldown() {
    if (!data.lastRoll) {
        return 0;
    }

    const elapsed =
        Date.now() -
        data.lastRoll;

    return Math.max(
        0,
        getCurrentRollCooldown() -
        elapsed
    );
}

function updateCooldown() {

    if (vipRollMessageActive) {
    return;
}
    if (isRolling) {
        countdownDisplay.textContent =
            "Rolling...";

        dailyStatus.textContent =
            "Your Number Is Rolling!";

        rollButton.disabled =
            true;

        return;
    }

    const remaining =
        getRemainingCooldown();

    if (remaining <= 0) {
        countdownDisplay.textContent =
            "Ready!";

        if (
            data.shrihanChromaReady
        ) {
            dailyStatus.textContent =
                "Shrihan Code Active! Next Roll = Chroma!";
        } else {
            dailyStatus.textContent =
                "Your Roll Is Ready!";
        }

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
        data.totalEP.toLocaleString();

    bestRarityDisplay.textContent =
        data.bestRarity || "---";

    totalBadgesDisplay.textContent =
        `${data.totalBadges} / ${BADGES.length}`;

    const safeTotalRollValue =
    Number.isFinite(
        Number(data.totalRollValue)
    )
        ? Number(data.totalRollValue)
        : 0;

const average =
    data.totalRolls > 0
        ? Math.round(
            safeTotalRollValue /
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
    historyContainer.innerHTML =
        "";

    if (data.history.length === 0) {
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
        .slice(0, 30)
        .forEach(roll => {
            const entry =
                document.createElement("div");

            entry.className =
                "history-entry";

            entry.innerHTML = `
                <div class="history-main">
                    <span
    class="
        history-number
        ${
            roll.numberEffect === "gold"
                ? "number-gold"
                : ""
        }
        ${
            roll.numberEffect === "diamond"
                ? "number-diamond"
                : ""
        }
        ${
            roll.numberEffect === "rainbow"
                ? "number-rainbow"
                : ""
        }
    "
>
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

            historyContainer.appendChild(
                entry
            );
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
        new Date(
            data.lastRollDate
        );

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
    const originalNumber =
        randomNumber();

    let rarity;

const vipRollActive =
    data.vipRollArmed &&
    canUseVIPRoll();


// =========================================
// FORCE RARITY TESTING
// =========================================

if (FORCE_RARITY) {

    rarity =
        FORCE_RARITY;

} else if (
    vipRollActive
) {

    rarity =
        "Secret";

} else if (
    data.shrihanChromaReady
) {

    rarity =
        "Chroma";

} else {

    rarity =
        determineRarity(
            originalNumber
        );

}

    // =========================================
    // DETERMINE IF SPECIAL NUMBER IS NEEDED
    // =========================================

    const naturalRarity =
        getNaturalPatternRarity(
            originalNumber
        );

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
    getUpgradeValue(
        "epMultiplier"
    );


// =========================================
// SPECIAL NUMBER EFFECT
// =========================================

const numberEffectLevel =
    data.rebirthNumberEffectUpgrade || 0;

const numberEffect =
    REBIRTH_NUMBER_EFFECT_UPGRADE
        .levels[numberEffectLevel];

let numberEffectType =
    "normal";

const effectRoll =
    Math.random();

if (vipRollActive) {

    // VIPRoll:
    // Rainbow = 10%
    // Diamond = 35%
    // Gold = 55%

    if (effectRoll < 0.10) {

        numberEffectType =
            "rainbow";

    } else if (effectRoll < 0.45) {

        numberEffectType =
            "diamond";

    } else {

        numberEffectType =
            "gold";

    }

} else {

    if (
        effectRoll <
        numberEffect.rainbowChance
    ) {

        numberEffectType =
            "rainbow";

    } else if (
        effectRoll <
        numberEffect.rainbowChance +
        numberEffect.diamondChance
    ) {

        numberEffectType =
            "diamond";

    } else if (
        effectRoll <
        numberEffect.rainbowChance +
        numberEffect.diamondChance +
        numberEffect.goldChance
    ) {

        numberEffectType =
            "gold";

    }

}

// =========================================
// SPECIAL NUMBER EP
// =========================================

let numberEffectMultiplier =
    1;

if (numberEffectType === "gold") {

    numberEffectMultiplier = 3;

} else if (numberEffectType === "diamond") {

    numberEffectMultiplier = 7;

} else if (numberEffectType === "rainbow") {

    numberEffectMultiplier = 15;

}

const earnedEP =
    Math.floor(
        baseEP *
        epMultiplier *
        numberEffectMultiplier *
        getVIPEpMultiplier()
    );    data.totalRolls++;

    if (vipRollActive) {
    useVIPRoll();
}

addQuestProgress(1);
    data.totalEP +=
        earnedEP;

    // =========================================
    // TITLE PROGRESS
    // =========================================

    if (rarity === "Mythic") {
        data.mythicRolls++;
    }

    if (rarity === "Legendary") {
        data.legendaryRolls++;
    }

    if (rarity === "Chroma") {
        data.chromaRolls++;
    }

    if (rarity === "Secret") {
        data.secretRolls++;
    }

    if (
        [
            "Rare",
            "Epic",
            "Legendary",
            "Mythic",
            "Chroma",
            "Secret"
        ].includes(rarity)
    ) {
        data.rarePlusRolls++;
    }

    if (
        Number(finalNumber) ===
        999999
    ) {
        data.rolled999999 = true;
    }

    updateTitles();

displayTitles();

    data.totalRollValue +=
    Number(finalNumber);

    data.highestNumber =
        Math.max(
            data.highestNumber,
            Number(finalNumber)
        );

    if (
        !data.bestRarity ||
        RARITY_ORDER.indexOf(rarity) >
        RARITY_ORDER.indexOf(
            data.bestRarity
        )
    ) {
        data.bestRarity =
            rarity;
    }

    const rollBadges =
        getRollBadges(
            Number(finalNumber),
            rarity,
            data.totalRolls
        );

    const newBadges =
        findBadges(
            Number(finalNumber),
            rarity,
            data.totalRolls
        );

    data.history.push({
    number:
        Number(finalNumber),

    rarity:
        rarity,

    ep:
        earnedEP,

    numberEffect:
        numberEffectType,

    rollNumber:
        data.totalRolls,

    badges:
        rollBadges.map(
            badge =>
                badge.name
        )
});

    if (data.history.length > 100) {
        data.history =
            data.history.slice(
                -100
            );
    }

    data.lastRoll =
        Date.now();

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    if (
        data.lastRollDate !==
        today
    ) {
        if (!data.lastRollDate) {
            data.dailyStreak = 1;
        } else {
            const lastDate =
                new Date(
                    data.lastRollDate
                );

            const currentDate =
                new Date(today);

            const difference =
                Math.floor(
                    (
                        currentDate -
                        lastDate
                    ) /
                    86400000
                );

            if (difference === 1) {
                data.dailyStreak++;
            } else if (difference > 1) {
                data.dailyStreak = 1;
            }
        }

        data.lastRollDate =
            today;
    }

    if (data.shrihanChromaReady) {
        data.shrihanChromaReady =
            false;
    }

    saveData();

    await animateNumber(
        finalNumber
    );

    numberDisplay.textContent =
    formatNumber(finalNumber);

updateRarityDisplay(
    rarity
);

updateNumberEffectDisplay(
    numberEffectType
);

    epDisplay.textContent =
        `+${earnedEP.toLocaleString()} EP`;

    updateAnalysis(
        Number(finalNumber)
    );

    displayBadges();
    displayBadgeIndex();
    updateStats();
    updateHistory();
    updateCooldown();

    if (newBadges.length > 0) {
        dailyStatus.textContent =
            `New Badge${newBadges.length === 1 ? "" : "s"} Unlocked!`;
    }

    if (rarity === "Secret") {
        triggerSecretEffect();
    } else if (rarity === "Chroma") {
        triggerChromaEffect();
    } else if (rarity === "Mythic") {
        triggerMythicEffect();
    }
}

// =========================================
// ROLL BUTTON
// =========================================

rollButton.addEventListener(
    "click",
    async () => {

        if (isRolling) {
            return;
        }

        if (
            getRemainingCooldown() >
            0
        ) {
            return;
        }

        isRolling = true;

        updateCooldown();

        try {

            await processRoll();

        } catch (error) {

            console.error(
                "Roll Error:",
                error
            );

        } finally {

            isRolling = false;

            updateCooldown();

        }

    }
);

// =========================================
// ERASE DATA
// =========================================

if (eraseDataButton) {

    eraseDataButton.addEventListener(
        "click",
        async () => {

            // =========================================
            // CHECK IF USER IS SIGNED IN
            // =========================================

            const {
                data: {
                    user
                }
            } = await supabase.auth.getUser();


            // =========================================
            // PASSWORD VERIFICATION
            // ONLY REQUIRED WHEN SIGNED IN
            // =========================================

            if (user) {

                const password =
                    prompt(
                        "Enter Your Password To Continue:"
                    );

                if (password === null) {
                    return;
                }

                if (!password) {

                    alert(
                        "Password Required."
                    );

                    return;
                }


                const {
                    error: passwordError
                } =
                    await supabase.auth.signInWithPassword({
                        email: user.email,
                        password: password
                    });


                if (passwordError) {

                    alert(
                        "Incorrect Password. Your Data Was Not Erased."
                    );

                    return;
                }

            }


            // =========================================
            // FINAL CONFIRMATION
            // =========================================

            const confirmed =
                confirm(
                    "Are You Sure You Want To Erase All RNG Thing Data?"
                );

            if (!confirmed) {
                return;
            }


            // =========================================
            // RESET LOCAL DATA
            // =========================================

const preservedVIP =
    data.isVIP === true;

const preservedVIPRollLastUsed =
    data.vipRollLastUsed || null;

    const preservedVIPRollArmed =
    false;

data = {
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

                titles: [],

equippedTitle: null,

questsCompleted: 0,

currentQuestIndex: 0,

questProgress: 0,

mythicRolls: 0,

                legendaryRolls: 0,

                chromaRolls: 0,

                secretRolls: 0,

                rarePlusRolls: 0,

                rolled999999: false,

                playTimeSeconds: 0,

                upgrades: {
                    rollSpeed: 0,
                    epMultiplier: 0,
                    luck: 0,
                    numberFortune: 0,
                    doubleRoll: 0,
                    secretThing: 0
                },

                rebirths: 0,

                rebirthTokens: 0,

                rebirthShopUpgrade: 0,

                rebirthNumberEffectUpgrade: 0,

                backgroundColor: null,

isVIP:
    preservedVIP,

vipRollLastUsed:
    preservedVIPRollLastUsed,

vipRollArmed:
    preservedVIPRollArmed,

shrihanCodeUsed: false,

shrihanChromaReady: false
            };


            localStorage.removeItem(
                "rngdleData"
            );


            // =========================================
            // RESET SUPABASE DATA IF SIGNED IN
            // =========================================

            try {

                const {
                    data: {
                        currentUser
                    }
                } =
                    await supabase.auth.getUser();


                if (currentUser) {

                    const {
                        error
                    } =
                        await supabase
                            .from("profiles")
                            .update({

                                ep: 0,

                                rolls: 0,

                                best_roll: 0,

                                rarest_rarity: null,

                                badges: [],

                                total_roll_value: 0,

                                highest_number: 0,

                                daily_streak: 0,

                                last_roll: null,

                                last_roll_date: null,

                                history: [],

                                upgrades: {

                                    rollSpeed: 0,

                                    epMultiplier: 0,

                                    luck: 0,

                                    numberFortune: 0,

                                    doubleRoll: 0,

                                    secretThing: 0,

                                    __rebirths: 0,

                                    __rebirthTokens: 0,

                                    __rebirthShopUpgrade: 0,

                                    __rebirthNumberEffectUpgrade: 0,

                                    __titles: [],

                                    __equippedTitle: null,

                                    __questsCompleted: 0,

                                    __mythicRolls: 0,

                                    __legendaryRolls: 0,

                                    __chromaRolls: 0,

                                    __secretRolls: 0,

                                    __rarePlusRolls: 0,

                                    __rolled999999: false,

                                    __playTimeSeconds: 0,

__isVIP:
    preservedVIP === true,

__vipRollLastUsed:
    preservedVIPRollLastUsed,

__vipRollArmed:
    false

                                },

                                background_color: null,

                                shrihan_code_used: false,

                                shrihan_chroma_ready: false

                            })
                            .eq(
                                "id",
                                currentUser.id
                            );


                    if (error) {
                        throw error;
                    }

                }

            } catch (error) {

                console.error(
                    "Supabase Erase Error:",
                    error
                );

                alert(
                    "Unable To Erase Your Data."
                );

                return;
            }


            // =========================================
            // REFRESH UI
            // =========================================

            numberDisplay.textContent =
                "------";

            rarityDisplay.textContent =
                "---";

            rarityDisplay.className =
                "";

            epDisplay.textContent =
                "+0 EP";


            updateAnalysis(0);

            displayBadges();

            displayBadgeIndex();

            displayTitles();

            updateStats();

            updateHistory();

            updateCooldown();

            updateShop();

            applyBackground();

            updateBackgroundButton();


            if (dailyStatus) {

                dailyStatus.textContent =
                    "All RNG Thing Data Has Been Erased.";

            }

        }
    );

}

// =========================================
// DELETE ACCOUNT
// =========================================

var deleteAccountButton =
    document.getElementById(
        "deleteAccountButton"
    );

var deleteAccountMessage =
    document.getElementById(
        "deleteAccountMessage"
    );


if (deleteAccountButton) {

    deleteAccountButton.addEventListener(
        "click",
        async () => {

            const firstConfirmation =
                confirm(
                    "WARNING: This Will Erase Your RNG Thing Data And Delete Your Account. This Cannot Be Undone. Continue?"
                );


            if (!firstConfirmation) {
                return;
            }


            const secondConfirmation =
                confirm(
                    "Are You ABSOLUTELY Sure You Want To Delete Your Account?"
                );


            if (!secondConfirmation) {
                return;
            }


            deleteAccountButton.disabled =
                true;


            if (deleteAccountMessage) {

                deleteAccountMessage.textContent =
                    "Erasing Your Data And Deleting Your Account...";

            }


            try {

                const {
                    data: {
                        user
                    }
                } =
                    await supabase.auth.getUser();


                if (!user) {

                    throw new Error(
                        "You Must Be Signed In To Delete Your Account."
                    );

                }

// =========================================
// PASSWORD VERIFICATION
// =========================================

const deletePassword =
    prompt(
        "Enter Your Password To Continue:"
    );

if (deletePassword === null) {
    deleteAccountButton.disabled = false;
    return;
}

if (!deletePassword) {

    if (deleteAccountMessage) {

        deleteAccountMessage.textContent =
            "Password Required.";

    }

    deleteAccountButton.disabled = false;

    return;
}


const {
    error: deletePasswordError
} =
    await supabase.auth.signInWithPassword({

        email: user.email,

        password:
            deletePassword

    });


if (deletePasswordError) {

    if (deleteAccountMessage) {

        deleteAccountMessage.textContent =
            "Incorrect Password. Your Account Was Not Deleted.";

    }

    deleteAccountButton.disabled = false;

    return;
}


                const {
                    data: {
                        session
                    }
                } =
                    await supabase.auth.getSession();


                if (!session) {

                    throw new Error(
                        "You Must Be Signed In To Delete Your Account."
                    );

                }


                // =========================================
                // ERASE ALL GAME DATA FIRST
                // =========================================

                data = {
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

                    titles: [],

equippedTitle: null,

questsCompleted: 0,

currentQuestIndex: 0,

questProgress: 0,

mythicRolls: 0,
legendaryRolls: 0,
chromaRolls: 0,
secretRolls: 0,
rarePlusRolls: 0,

rolled999999: false,

playTimeSeconds: 0,

                    upgrades: {
                        rollSpeed: 0,
                        epMultiplier: 0,
                        luck: 0,
                        numberFortune: 0,
                        doubleRoll: 0,
                        secretThing: 0
                    },

                    rebirths: 0,

                    rebirthTokens: 0,

                    backgroundColor: null,

                    shrihanCodeUsed: false,

                    shrihanChromaReady: false
                };


                // Clear local saved data
                localStorage.removeItem(
                    "rngdleData"
                );


                // Clear the user's Supabase profile data
                const {
                    error: eraseError
                } =
                    await supabase
                        .from("profiles")
                        .update({
                            ep: 0,

                            rolls: 0,

                            best_roll: 0,

                            rarest_rarity: null,

                            badges: [],

                            total_roll_value: 0,

                            highest_number: 0,

                            daily_streak: 0,

                            last_roll: null,

                            last_roll_date: null,

                            history: [],

                            upgrades: {
                                rollSpeed: 0,

                                epMultiplier: 0,

                                luck: 0,

                                numberFortune: 0,

                                doubleRoll: 0,

                                secretThing: 0,

                                __rebirths: 0,

                                __rebirthTokens: 0
                            },

                            background_color: null,

                            shrihan_code_used: false,

                            shrihan_chroma_ready: false

                        })
                        .eq(
                            "id",
                            user.id
                        );


                if (eraseError) {

                    console.error(
                        "Supabase Erase Error:",
                        eraseError
                    );

                    throw eraseError;

                }


                // =========================================
                // DELETE THE ACCOUNT
                // =========================================

                const {
                    data: deleteResult,
                    error: deleteError
                } =
                    await supabase.functions.invoke(
                        "delete-account"
                    );


                if (deleteError) {

                    console.error(
                        "Delete Account Function Error:",
                        deleteError
                    );


                    if (deleteError.context) {

                        console.error(
                            "Status:",
                            deleteError.context.status
                        );


                        try {

                            const functionError =
                                await deleteError
                                    .context
                                    .json();


                            console.error(
                                "Function Response:",
                                functionError
                            );

                        } catch (responseError) {

                            console.error(
                                "Could Not Read Function Response:",
                                responseError
                            );

                        }

                    }


                    throw deleteError;

                }


                if (
                    !deleteResult ||
                    !deleteResult.success
                ) {

                    throw new Error(
                        deleteResult?.error ||
                        "Unable To Delete Account."
                    );

                }


                // Make absolutely sure local data is gone
                localStorage.removeItem(
                    "rngdleData"
                );


                // Sign out
                await supabase.auth.signOut();


                if (deleteAccountMessage) {

                    deleteAccountMessage.textContent =
                        "Account And All Data Deleted Successfully!";

                }


                setTimeout(
                    () => {
                        location.reload();
                    },
                    1000
                );


            } catch (error) {

                console.error(
                    "Delete Account Error:",
                    error
                );


                if (deleteAccountMessage) {

                    deleteAccountMessage.textContent =
                        error.message ||
                        "Unable To Delete Account.";
                }

            }


            deleteAccountButton.disabled =
                false;

        }
    );

}


// =========================================
// SHOP TABS
// =========================================

function showEpShop() {

    if (epShopContent) {

        epShopContent.hidden =
            false;

    }


    if (rebirthShopContent) {

        rebirthShopContent.hidden =
            true;

    }


    if (epShopTab) {

        epShopTab.classList.add(
            "active"
        );

    }


    if (rebirthShopTab) {

        rebirthShopTab.classList.remove(
            "active"
        );

    }

}


function showRebirthShop() {

    if (
        (data.rebirths || 0) <= 0
    ) {

        showEpShop();

        return;

    }


    if (epShopContent) {

        epShopContent.hidden =
            true;

    }


    if (rebirthShopContent) {

        rebirthShopContent.hidden =
            false;

    }


    if (epShopTab) {

        epShopTab.classList.remove(
            "active"
        );

    }


    if (rebirthShopTab) {

        rebirthShopTab.classList.add(
            "active"
        );

    }


    if (rebirthShopTokensDisplay) {

        rebirthShopTokensDisplay.textContent =
            (
                data.rebirthTokens || 0
            ).toLocaleString();

    }

}


if (epShopTab) {

    epShopTab.addEventListener(
        "click",
        showEpShop
    );

}


if (rebirthShopTab) {

    rebirthShopTab.addEventListener(
        "click",
        showRebirthShop
    );

}


// =========================================
// SHOP MENU
// =========================================

const shopButton =
    document.getElementById(
        "shopButton"
    );

const shopPanel =
    document.getElementById(
        "shopPanel"
    );

const closeShopButton =
    document.getElementById(
        "closeShopButton"
    );

const shopOverlay =
    document.getElementById(
        "shopOverlay"
    );


function openShopMenu() {

    if (!shopPanel) {
        return;
    }

    shopPanel.hidden =
        false;

    if (shopOverlay) {
        shopOverlay.hidden =
            false;
    }

    if (shopButton) {
        shopButton.setAttribute(
            "aria-expanded",
            "true"
        );
    }

    // Always Open The EP Shop First
    showEpShop();

    updateShop();
}


function closeShopMenu() {

    if (!shopPanel) {
        return;
    }


    shopPanel.hidden =
        true;


    if (shopOverlay) {

        shopOverlay.hidden =
            true;

    }


    if (shopButton) {

        shopButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


if (shopButton) {

    shopButton.addEventListener(
        "click",
        () => {

            if (shopPanel.hidden) {

                openShopMenu();

            } else {

                closeShopMenu();

            }

        }
    );

}


if (closeShopButton) {

    closeShopButton.addEventListener(
        "click",
        closeShopMenu
    );

}


if (shopOverlay) {

    shopOverlay.addEventListener(
        "click",
        closeShopMenu
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            shopPanel &&
            !shopPanel.hidden
        ) {

            closeShopMenu();

        }

    }
);


// =========================================
// LEADERBOARD MENU
// =========================================

var leaderboardToggle =
    document.getElementById(
        "leaderboardToggle"
    );

var leaderboardContainer =
    document.getElementById(
        "leaderboardContainer"
    );

var leaderboardArrow =
    document.getElementById(
        "leaderboardArrow"
    );

var leaderboardEpButton =
    document.getElementById(
        "leaderboardEpButton"
    );

var leaderboardRollsButton =
    document.getElementById(
        "leaderboardRollsButton"
    );


function openLeaderboard() {

    if (!leaderboardContainer) {
        return;
    }


    leaderboardContainer.hidden =
        false;


    if (leaderboardToggle) {

        leaderboardToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    if (leaderboardArrow) {

        leaderboardArrow.style.transform =
            "rotate(180deg)";

    }

}


function closeLeaderboard() {

    if (!leaderboardContainer) {
        return;
    }


    leaderboardContainer.hidden =
        true;


    if (leaderboardToggle) {

        leaderboardToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (leaderboardArrow) {

        leaderboardArrow.style.transform =
            "rotate(0deg)";

    }

}


if (leaderboardToggle) {

    leaderboardToggle.addEventListener(
        "click",
        () => {

            if (
                leaderboardContainer &&
                leaderboardContainer.hidden
            ) {

                openLeaderboard();

            } else {

                closeLeaderboard();

            }

        }
    );

}


if (leaderboardEpButton) {

    leaderboardEpButton.addEventListener(
        "click",
        () => {

            leaderboardEpButton.classList.add(
                "active"
            );


            if (leaderboardRollsButton) {

                leaderboardRollsButton.classList.remove(
                    "active"
                );

            }


            loadLeaderboard(
                "ep"
            );

        }
    );

}


if (leaderboardRollsButton) {

    leaderboardRollsButton.addEventListener(
        "click",
        () => {

            leaderboardRollsButton.classList.add(
                "active"
            );


            if (leaderboardEpButton) {

                leaderboardEpButton.classList.remove(
                    "active"
                );

            }


            loadLeaderboard(
                "rolls"
            );

        }
    );

}


// =========================================
// LOAD LEADERBOARD
// =========================================

async function loadLeaderboard(
    sortBy = "ep"
) {

    var leaderboardList =
        document.getElementById(
            "leaderboardList"
        );


    if (!leaderboardList) {
        return;
    }


    leaderboardList.innerHTML =
        `
        <p class="leaderboard-empty">
            Leaderboard Loading...
        </p>
        `;


    try {

        const {
            data: players,
            error
        } =
            await supabase
                .from("leaderboard")
                .select(
    "username, ep, rolls, is_vip"
)
                .order(
                    sortBy,
                    {
                        ascending: false
                    }
                )
                .limit(100);


        if (error) {
            throw error;
        }


        if (
            !players ||
            players.length === 0
        ) {

            leaderboardList.innerHTML =
                `
                <p class="leaderboard-empty">
                    No Players Yet.
                </p>
                `;

            return;

        }


        leaderboardList.innerHTML =
            "";


        players.forEach(
            (
                player,
                index
            ) => {

                const username =
                    player.username ||
                    "Unknown Player";


                const score =
                    sortBy === "ep"
                        ? player.ep ?? 0
                        : player.rolls ?? 0;


                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "leaderboard-row";


                const vipDisplay =
    player.is_vip === true
        ? `
            <span class="leaderboard-vip">
                👑 VIP
            </span>
        `
        : "";

row.innerHTML =
    `
    <span
        class="leaderboard-rank"
    >
        #${index + 1}
    </span>

    <span
        class="leaderboard-player ${
            player.is_vip === true
                ? "leaderboard-player-vip"
                : ""
        }"
    >
        ${username}
        ${vipDisplay}
    </span>

    <span
        class="leaderboard-score"
    >
        ${Number(
            score
        ).toLocaleString()}
    </span>
    `;


                leaderboardList.appendChild(
                    row
                );

            }
        );


    } catch (error) {

        console.error(
            "Leaderboard Error:",
            error
        );


        leaderboardList.innerHTML =
            `
            <p class="leaderboard-empty">
                Unable To Load Leaderboard.
            </p>
            `;

    }

}


loadLeaderboard(
    "ep"
);


// =========================================
// ACCOUNT MENU
// =========================================

const accountButton =
    document.getElementById(
        "accountButton"
    );

const accountPanel =
    document.getElementById(
        "accountPanel"
    );

const accountOverlay =
    document.getElementById(
        "accountOverlay"
    );

const closeAccountButton =
    document.getElementById(
        "closeAccountButton"
    );


// =========================================
// OPEN ACCOUNT MENU
// =========================================

function openAccountMenu() {

    if (!accountPanel) {
        return;
    }


    accountPanel.hidden =
        false;


    if (accountOverlay) {

        accountOverlay.hidden =
            false;

    }


    if (accountButton) {

        accountButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }

}


// =========================================
// CLOSE ACCOUNT MENU
// =========================================

function closeAccountMenu() {

    if (!accountPanel) {
        return;
    }


    accountPanel.hidden =
        true;


    if (accountOverlay) {

        accountOverlay.hidden =
            true;

    }


    if (accountButton) {

        accountButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


// =========================================
// ACCOUNT BUTTON
// =========================================

if (accountButton) {

    accountButton.addEventListener(
        "click",
        () => {

            if (
                accountPanel &&
                accountPanel.hidden
            ) {

                openAccountMenu();

            } else {

                closeAccountMenu();

            }

        }
    );

}


// =========================================
// CLOSE BUTTON
// =========================================

if (closeAccountButton) {

    closeAccountButton.addEventListener(
        "click",
        closeAccountMenu
    );

}


// =========================================
// CLICK OUTSIDE PANEL
// =========================================

if (accountOverlay) {

    accountOverlay.addEventListener(
        "click",
        closeAccountMenu
    );

}


// =========================================
// ESCAPE KEY
// =========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            accountPanel &&
            !accountPanel.hidden
        ) {

            closeAccountMenu();

        }

    }
);


// =========================================
// ACCOUNT / SIGN OUT
// =========================================

var signedInContainer =
    document.getElementById(
        "signedInContainer"
    );

var signedInUsername =
    document.getElementById(
        "signedInUsername"
    );

var signOutButton =
    document.getElementById(
        "signOutButton"
    );

var signOutMessage =
    document.getElementById(
        "signOutMessage"
    );


// =========================================
// UPDATE ACCOUNT UI
// =========================================

async function updateAccountUI() {

    try {

        const {
            data: {
                user
            }
        } =
            await supabase.auth.getUser();


        if (user) {

            await loadDataFromSupabase();


            if (signedInContainer) {

                signedInContainer.hidden =
                    false;

            }


            const signUpContainer =
                document.getElementById(
                    "signUpContainer"
                );


            const signInContainer =
                document.getElementById(
                    "signInContainer"
                );


            if (signUpContainer) {

                signUpContainer.hidden =
                    true;

            }


            if (signInContainer) {

                signInContainer.hidden =
                    true;

            }


            if (signOutMessage) {

                signOutMessage.textContent =
                    "";

            }


            if (signInMessage) {

                signInMessage.textContent =
                    "";

            }


            const username =
                user.user_metadata?.username ||
                user.email ||
                "Account";


            if (signedInUsername) {

                signedInUsername.textContent =
                    "Signed In As: " +
                    username;

            }


        } else {

            if (signedInContainer) {

                signedInContainer.hidden =
                    true;

            }


            const signUpContainer =
                document.getElementById(
                    "signUpContainer"
                );


            const signInContainer =
                document.getElementById(
                    "signInContainer"
                );


            if (signUpContainer) {

                signUpContainer.hidden =
                    false;

            }


            if (signInContainer) {

                signInContainer.hidden =
                    false;

            }


            if (signOutMessage) {

                signOutMessage.textContent =
                    "";

            }

        }

    } catch (error) {

        console.error(
            "Account UI Error:",
            error
        );

    }

}

// =========================================
// SIGN OUT
// =========================================

if (signOutButton) {

    signOutButton.addEventListener(
        "click",
        async () => {

            signOutButton.disabled =
                true;

            if (signOutMessage) {

                signOutMessage.textContent =
                    "Signing You Out...";

            }

            try {

                const {
                    error
                } =
                    await supabase.auth.signOut();

                if (error) {
                    throw error;
                }

                // =========================================
                // RESET LOCAL GAME DATA
                // =========================================

                data = {
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

                    titles: [],
equippedTitle: null,

questsCompleted: 0,

mythicRolls: 0,
legendaryRolls: 0,
chromaRolls: 0,
secretRolls: 0,
rarePlusRolls: 0,

rolled999999: false,

playTimeSeconds: 0,

                    upgrades: {
                        rollSpeed: 0,
                        epMultiplier: 0,
                        luck: 0,
                        numberFortune: 0,
                        doubleRoll: 0,
                        secretThing: 0
                    },

                    rebirths: 0,
                    rebirthTokens: 0,

                    rebirthShopUpgrade: 0,
                    rebirthNumberEffectUpgrade: 0,

                    backgroundColor: null,

                    shrihanCodeUsed: false,
                    shrihanChromaReady: false
                };

                // Remove the previous account's local save.
                // This does NOT delete anything from Supabase.
                localStorage.removeItem(
                    "rngdleData"
                );

                // =========================================
                // REFRESH GAME UI
                // =========================================

                displayBadges();
                displayBadgeIndex();
                updateStats();
                updateHistory();
                updateCooldown();
                updateShop();
                updateRebirthUI();
                updateRebirthShop();
                applyBackground();
                updateBackgroundButton();

                if (signOutMessage) {

                    signOutMessage.textContent =
                        "Signed Out Successfully!";

                }

                await updateAccountUI();

            } catch (error) {

                console.error(
                    "Sign Out Error:",
                    error
                );

                if (signOutMessage) {

                    signOutMessage.textContent =
                        error.message ||
                        "Unable To Sign Out.";

                }

            }

            signOutButton.disabled =
                false;

        }
    );

}

// =========================================
// AUTH STATE
// =========================================

supabase.auth.onAuthStateChange(
    async (
        event,
        session
    ) => {

        if (session?.user) {

            await loadDataFromSupabase();

        }


        await updateAccountUI();

    }
);


// =========================================
// INITIALIZATION
// =========================================

async function initializeGame() {

    loadData();


    updateStreak();


    await loadDataFromSupabase();


    updateTitles();

    createTitlesUI();


    displayBadges();

    displayBadgeIndex();

    updateStats();

    updateHistory();

    updateCooldown();

    updateShop();

    updateQuestDisplay();

    updateVIPEpDisplay();

    updateVIPLuckDisplay();

    updateVIPPriceDisplay();

    showEpShop();


    initializeBackgroundCustomization();


    setInterval(
        updateCooldown,
        250
    );

    setInterval(
    updateVIPPriceDisplay,
    1000
);

    // =========================================
    // PLAY TIME TRACKER
    // =========================================

    setInterval(
        () => {

            if (
                document.visibilityState !==
                "visible"
            ) {
                return;
            }

            data.playTimeSeconds++;

            const previousTitleCount =
                data.titles.length;

            updateTitles();

            if (
                data.titles.length !==
                previousTitleCount
            ) {
                saveData();
            }

        },
        1000
    );


    await updateAccountUI();

}


initializeGame();


// =========================================
// ADDITIONAL SHOP / REBIRTH SAFETY
// =========================================

window.addEventListener(
    "beforeunload",
    () => {

        try {

            localStorage.setItem(
                "rngdleData",
                JSON.stringify(data)
            );

        } catch (error) {

            console.warn(
                "Could Not Save Before Unload:",
                error
            );

        }

    }
);


// =========================================
// REBIRTH STATE RECOVERY
// =========================================

if (
    typeof data.rebirths !== "number"
) {

    data.rebirths =
        0;

}


if (
    typeof data.rebirthTokens !== "number"
) {

    data.rebirthTokens =
        0;

}


data.rebirths =
    Math.max(
        0,
        Math.min(
            MAX_REBIRTHS,
            Number(data.rebirths) || 0
        )
    );


data.rebirthTokens =
    Math.max(
        0,
        Number(data.rebirthTokens) || 0
    );


// =========================================
// REBIRTH COST PREVIEW
// =========================================

function getNextUpgradeCostMultiplier() {

    if (
        (data.rebirths || 0) >=
        MAX_REBIRTHS
    ) {

        return REBIRTH_COST_MULTIPLIERS[
            MAX_REBIRTHS
        ];

    }


    return REBIRTH_COST_MULTIPLIERS[
        Math.max(
            0,
            Number(data.rebirths) || 0
        )
    ];

}


function getNextRebirthNumber() {

    return Math.min(
        MAX_REBIRTHS,
        (data.rebirths || 0) + 1
    );

}


function getNextRebirthReward() {

    return (
        REBIRTH_TOKEN_REWARDS[
            getNextRebirthNumber()
        ] || 0
    );

}


// =========================================
// REBIRTH SHOP PLACEHOLDER
// =========================================

const REBIRTH_UPGRADES = {

    // Rebirth Upgrades Will Be Added Here Later.

};


// =========================================
// REBIRTH SHOP UPDATE
// =========================================

function updateRebirthShop() {

    if (!rebirthShopContent) {
        return;
    }


    if (
        (data.rebirths || 0) <= 0
    ) {

        rebirthShopContent.hidden =
            true;

        return;

    }


    rebirthShopContent.hidden =
        false;


    if (rebirthShopTokensDisplay) {

        rebirthShopTokensDisplay.textContent =
            (
                data.rebirthTokens || 0
            ).toLocaleString();

    }

}


// =========================================
// REBIRTH COMPLETE STATE
// =========================================

function isMaxRebirth() {

    return (
        (data.rebirths || 0) >=
        MAX_REBIRTHS
    );

}


function getRebirthProgressText() {

    const current =
        Math.max(
            0,
            Math.min(
                MAX_REBIRTHS,
                Number(data.rebirths) || 0
            )
        );


    if (
        current >=
        MAX_REBIRTHS
    ) {

        return "Maximum Rebirth Reached!";

    }


    return `${current} / ${MAX_REBIRTHS}`;

}


// =========================================
// PROTECT EP DURING REBIRTH
// =========================================

function capturePermanentProgress() {

    return {

        totalEP:
            data.totalEP,

        totalRolls:
            data.totalRolls,

        bestRarity:
            data.bestRarity,

        totalBadges:
            data.totalBadges,

        totalRollValue:
            data.totalRollValue,

        highestNumber:
            data.highestNumber,

        dailyStreak:
            data.dailyStreak,

        lastRoll:
            data.lastRoll,

        lastRollDate:
            data.lastRollDate,

        history:
            data.history,

        badges:
            data.badges,

        backgroundColor:
            data.backgroundColor,

        shrihanCodeUsed:
            data.shrihanCodeUsed,

        shrihanChromaReady:
            data.shrihanChromaReady

    };

}


function verifyPermanentProgress(
    snapshot
) {

    data.totalEP =
        snapshot.totalEP;


    data.totalRolls =
        snapshot.totalRolls;


    data.bestRarity =
        snapshot.bestRarity;


    data.totalBadges =
        snapshot.totalBadges;


    data.totalRollValue =
        snapshot.totalRollValue;


    data.highestNumber =
        snapshot.highestNumber;


    data.dailyStreak =
        snapshot.dailyStreak;


    data.lastRoll =
        snapshot.lastRoll;


    data.lastRollDate =
        snapshot.lastRollDate;


    data.history =
        snapshot.history;


    data.badges =
        snapshot.badges;


    data.backgroundColor =
        snapshot.backgroundColor;


    data.shrihanCodeUsed =
        snapshot.shrihanCodeUsed;


    data.shrihanChromaReady =
        snapshot.shrihanChromaReady;

}


// =========================================
// ORIGINAL REBIRTH HANDLER WRAPPER
// =========================================

const originalPerformRebirth =
    performRebirth;


async function performProtectedRebirth() {

    if (!canRebirth()) {
        return;
    }


    const snapshot =
        capturePermanentProgress();


    await originalPerformRebirth();


    verifyPermanentProgress(
        snapshot
    );


    saveData();


    updateStats();

    updateShop();

    updateRebirthUI();

    updateRebirthShop();

    displayTitles();

}


// =========================================
// REBIRTH BUTTON REBIND
// =========================================

if (rebirthYesButton) {

    rebirthYesButton.onclick =
        null;


    rebirthYesButton.addEventListener(
        "click",
        async () => {

            if (!canRebirth()) {
                return;
            }


            rebirthYesButton.disabled =
                true;


            try {

                await performProtectedRebirth();

            } catch (error) {

                console.error(
                    "Protected Rebirth Error:",
                    error
                );

            } finally {

                updateRebirthUI();

                updateRebirthShop();


                rebirthYesButton.disabled =
                    !canRebirth();

            }

        }
    );

}
