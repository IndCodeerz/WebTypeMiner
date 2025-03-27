/* 
J_...   = JavaScript
H_...   = HTML
...ID   = HTML id
...CO   = Const
...V    = Variable
*/

//=======|||VARIABLES|||=======//

let J_moneyV = 0;
let J_minerV = 1;
let J_pickaxePowerV = 1;
let J_narratorOccupied = false;
let J_ores = Math.random();

//=======|||CONST VARIABLES|||=======//

const J_wordListCO = /*["a"]*/["gold", "mine", "pickaxe", "rich", "cave", "diamond", "treasure", "miner", "valuable"];

const J_oreIndexCO = {
    stone: { name: "stone", value: 0, price: 10, element: document.getElementById("H_stoneID") },
    copper: { name: "copper", value: 0, price: 20, element: document.getElementById("H_copperID") },
    iron: { name: "iron", value: 0, price: 25, element: document.getElementById("H_ironID") },
    lithium: { name: "lithium", value: 0, price: 35, element: document.getElementById("H_lithiumID") },
    silver: { name: "silver", value: 0, price: 50, element: document.getElementById("H_silverID") },
    gold: { name: "gold", value: 0, price: 70, element: document.getElementById("H_goldID") },
    diamond: { name: "diamond", value: 0, price: 100, element: document.getElementById("H_diamondID") }
};

//=======|||DOM ELEMENT CACHE|||=======//

const narratorCO = document.getElementById("H_narratorID");
const defaultNarratorCO = " ";

const oresCO = document.getElementById("H_oresID");
const homeAreaCO = document.getElementById("H_homeAreaID");
const marketAreaCO = document.getElementById("H_marketAreaID");
const caveAreaCO = document.getElementById("H_caveAreaID");

const wordTargetCO = document.getElementById("H_wordTargetID");
const wordInputCO = document.getElementById("H_wordInputID");

const moneyCountCO = document.getElementById("H_moneyID");

const gotoMarketButtonCO = document.getElementById("H_gotoMarketButtonID")
const leaveMarketButtonCO = document.getElementById("H_leaveMarketButtonID")
const enterCaveButtonCO = document.getElementById("H_enterCaveButtonID");
const leaveCaveButtonCO = document.getElementById("H_leaveCaveButtonID");
const sellButtonCO = document.getElementById("H_sellButtonID");

const inventoryButtonCO = document.getElementById("inv");
const equipmentButtonCO = document.getElementById("equ");
const journalButtonCO = document.getElementById("jou");
const closeButtonCO = document.getElementById("close");

const clickAU = document.getElementById("H_clickID");
const swipeAU = document.getElementById("H_swipeID");
const pickaxeAU = document.getElementById("H_pickaxeID");
const rareClingAU = document.getElementById("H_rareClingID");
const timeoutAU = document.getElementById("H_timeoutID");
const sellAU = document.getElementById("H_sellID");
const sellFailAU = document.getElementById("H_sellFailID");

//=======|||DISPLAY UPDATE|||=======//

function updateOreDisplay() {
    for (let ore in J_oreIndexCO) {
        J_oreIndexCO[ore].element.innerText = J_oreIndexCO[ore].value;
    }
}

function updateMoneyDisplay() {
    moneyCountCO.innerText = J_moneyV.toLocaleString();
}

function setNarrator(text, duration) {
    if (J_narratorOccupied) {
        clearTimeout(J_narratorOccupied);
    }

    narratorCO.innerText = text;

    if (duration === 10000) {
        narratorCO.style.color = "red";
    } else {
        narratorCO.style.color = "";
    }

    J_narratorOccupied = setTimeout(() => {
        narratorCO.innerText = defaultNarratorCO;
        J_narratorOccupied = null;
    }, duration);
}

//=======|||MINING MECHANIC|||=======//

function generateNewWord() {
    const randomIndexCO = Math.floor(Math.random() * J_wordListCO.length);
    const randomWordCO = J_wordListCO[randomIndexCO];
    wordTargetCO.innerText = randomWordCO;
}

function getOre() {
    J_ores = Math.floor(Math.random() * 100) + 1;
    let J_oreMinedV = null;

    switch (true) {
        case J_ores <= 40:
            J_oreMinedV = J_oreIndexCO.stone;
            break;
        case J_ores <= 60:
            J_oreMinedV = J_oreIndexCO.copper;
            break;
        case J_ores <= 75:
            J_oreMinedV = J_oreIndexCO.iron;
            break;
        case J_ores <= 85:
            J_oreMinedV = J_oreIndexCO.lithium;
            break;
        case J_ores <= 92:
            J_oreMinedV = J_oreIndexCO.silver;
            break;
        case J_ores <= 97:
            J_oreMinedV = J_oreIndexCO.gold;
            break;
        case J_ores <= 100:
            J_oreMinedV = J_oreIndexCO.diamond;
            break;
    }

    if (J_oreMinedV) {
        J_oreMinedV.value += J_pickaxePowerV;

        // Dapetin nama ore, kapital di awal huruf
        const oreNameCO = J_oreMinedV.name.charAt(0).toUpperCase() + J_oreMinedV.name.slice(1);

        // Tampilkan narrator
        if (["Stone", "Copper", "Iron"].includes(oreNameCO)) {
        setNarrator(`You Got ${J_pickaxePowerV} ${oreNameCO}!`, 1500);
        }
        else if (["Lithium", "Silver"].includes(oreNameCO)) {
            setNarrator(`You Got ${J_pickaxePowerV} ${oreNameCO}!!`, 1500);
        }
        else if (["Gold", "Diamond"].includes(oreNameCO)) {
            rareClingAU.currentTime = 0;
            rareClingAU.play();
            setNarrator(`You Got ${J_pickaxePowerV} ${oreNameCO}!!!`, 1500);
        }
    }

    updateOreDisplay();
}

wordInputCO.addEventListener("keydown", function(e) {
    const targetedWordCO = wordTargetCO.innerText.toLowerCase();
    const inputValueCO = wordInputCO.value.toLowerCase();
    const nextCharIndexCO = inputValueCO.length;
    const ExpectedCharCO = targetedWordCO[nextCharIndexCO];

    if (e.key.length === 1) {
        if (e.key.toLowerCase() === ExpectedCharCO) {
            return;
        } 
        else {
            e.preventDefault();
        }
    }
});

wordInputCO.addEventListener("input", function() {
    const typedWordCO = wordInputCO.value.trim().toLowerCase();
    const targetedWordCO = wordTargetCO.innerText.toLowerCase();

    if (typedWordCO === targetedWordCO) {
        pickaxeAU.currentTime = 0;
        pickaxeAU.play();
        getOre();
        wordInputCO.value = "";
        generateNewWord();
    }
});

//=======|||EXPLOIT PREVENTION|||=======//

// NOT YET LEARNED
let keyPresses = 0;
const maxKeyPressesPerSecond = 20; // Sesuai dengan kecepatan mengetik manusia tercepat
const interval = 1000; // 1 detik
let isLocked = false;

// Reset keyPresses setiap detik
setInterval(() => {
    keyPresses = 0;
}, interval);

function lockInputs(duration) {
    isLocked = true;
    timeoutAU.currentTime = 0;
    timeoutAU.play();
    setNarrator("Too Many Inputs! Timeout for 10 Seconds.", duration);

    // Nonaktifkan semua tombol
    document.querySelectorAll("button, input, textarea").forEach(el => {
        el.disabled = true;
    });

    setTimeout(() => {
        isLocked = false;
        document.querySelectorAll("button, input, textarea").forEach(el => {
            el.disabled = false;
        });
    }, duration);
}

document.addEventListener("keydown", (event) => {
    if (isLocked) {
        event.preventDefault();
        return;
    }

    if (keyPresses >= maxKeyPressesPerSecond) {
        lockInputs(10000);
        return;
    }

    keyPresses++;
});

// Juga cegah klik mouse saat terkunci
document.addEventListener("click", (event) => {
    if (isLocked) {
        event.preventDefault();
        event.stopPropagation();
    }
});

// Juga cegah klik mouse saat terkunci
document.addEventListener("click", (event) => {
    if (isLocked) {
        event.preventDefault();
        event.stopPropagation();
    }
});


//=======|||SELLING MECHANIC|||=======//

function sellOres(oreNameCO, ) {
    const soldOresCO = J_oreIndexCO[oreNameCO];
    

    if (soldOresCO.value === 0) {
        sellFailAU.currentTime = 0;
        sellFailAU.volume = 0.5;
        sellFailAU.play();
        setNarrator(`You Don't Have Any ${oreNameCO.charAt(0).toUpperCase() + oreNameCO.slice(1)}!`, 1500);
    }

    else {
        sellAU.currentTime = 0;
        sellAU.play();
        setNarrator(`You Sold: ${soldOresCO.value} ${oreNameCO.charAt(0).toUpperCase() + oreNameCO.slice(1)}!`, 2000);
        J_moneyV += soldOresCO.value * soldOresCO.price;
        soldOresCO.value = 0;
        updateMoneyDisplay();
        updateOreDisplay();
    }
} 
/*function sellGold() {
    const gold = J_oreIndexCO.gold;
    J_moneyV += gold.value * gold.price;
    gold.value = 0;
    updateMoneyDisplay();
    updateOreDisplay();
}   */

//=======|||BUTTON EVENT LISTENER|||=======//

inventoryButtonCO.addEventListener("click", () => {
    swipeAU.currentTime = 0;
    swipeAU.play();
});

equipmentButtonCO.addEventListener("click", () => {
    swipeAU.currentTime = 0;
    swipeAU.play();
});

journalButtonCO.addEventListener("click", () => {
    swipeAU.currentTime = 0;
    swipeAU.play();
});

closeButtonCO.addEventListener("click", () => {
    swipeAU.currentTime = 0;
    swipeAU.play();
});

gotoMarketButtonCO.addEventListener("click", () => {
    clickAU.currentTime = 0;
    clickAU.play();
    homeAreaCO.style.display = "none";
    marketAreaCO.style.display = "block";
    setNarrator("You Entered The Market...", 1500);
});

leaveMarketButtonCO.addEventListener("click", () => {
    clickAU.currentTime = 0;
    clickAU.play();
    homeAreaCO.style.display = "block";
    marketAreaCO.style.display = "none";
    wordInputCO.value = "";
    setNarrator("You Leave The Market...", 1500);
});

enterCaveButtonCO.addEventListener("click", () => {
    clickAU.currentTime = 0;
    clickAU.play();
    homeAreaCO.style.display = "none";
    caveAreaCO.style.display = "block";
    wordInputCO.focus();
    generateNewWord();
    setNarrator("You Entered The Cave...", 1500);
});

leaveCaveButtonCO.addEventListener("click", () => {
    clickAU.currentTime = 0;
    clickAU.play();
    caveAreaCO.style.display = "none";
    homeAreaCO.style.display = "block";
    wordInputCO.value = "";
    setNarrator("You Leave The Cave...", 1500);
});

//=======|||AUTOMINE MECHANIC|||=======//

/*
setInterval(function() {
    J_oreIndexCO.gold.value += J_minerV * J_pickaxePowerV;
    updateOreDisplay();
}, 500);
*/
