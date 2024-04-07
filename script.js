
class Unit {
    constructor(name, maxHealth, attack, defense) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.attack = attack;
        this.defense = defense;
        this.health = 0;
    }
}

const warrior = new Unit("Warrior", 10, 2,2);
const archer = new Unit("Archer", 10, 2, 1);
const defenderUnit = new Unit("Defender", 15, 1, 3);
const rider = new Unit("Rider", 10, 2, 1);
const cloak = new Unit("Cloak", 5, 0, 0.5);
const dagger = new Unit("Dagger", 10, 2, 2);
const mind_bender = new Unit("Mind Bender", 10, 0, 1);
const swordsman = new Unit("Swordsman", 15, 3, 3);
const catapult = new Unit("Catapult", 10, 4, 0);
const knight = new Unit("Knight", 10, 3.5, 1);
const giant = new Unit("Giant", 40, 5, 4);

// Boats depends on the unit
const boat = new Unit("Boat", 0, 1, 1);
const ship = new Unit("Ship", 0, 2, 2);
const battleship = new Unit("Battleship", 0, 4 , 3);

const dinghy = new Unit("Dinghy", 5, 0, 0.5);
const pirate = new Unit("Pirate", 10, 2, 2);

// Special Tribes
// Aquarion
const amphibian = new Unit("Amphibian", 10, 2, 1);
const tridention = new Unit("Tridention", 15, 3, 1);
const crab = new Unit("Crab", 40, 4, 4);

// Elyrion
const polytaur = new Unit("Polytaur", 15, 3, 1);
const navalon = new Unit("Navalon", 30, 4, 4);
const dragon_egg = new Unit("Dragon Egg", 10, 0, 2);
const baby_dragon = new Unit("Baby Dragon", 15, 3, 3);
const fire_dragon = new Unit("Fire Dragon", 20, 4, 4);

// Polaris
const ice_archer = new Unit("Ice Archer", 10, 0.1, 1);
const battle_sled = new Unit("Battle Sled", 15, 3, 2);
const mooni = new Unit("Mooni", 10, 0, 2);
const ice_fortress = new Unit("Ice Fortress", 20, 4, 3);
const gaami = new Unit("Gaami", 30, 4, 4);

// Cymanti
const hexapod = new Unit("Hexapod", 5, 3, 1);
const kiton = new Unit("Kiton", 15, 1, 3);
const phychi = new Unit("Phychi", 5, 1, 1);
const shaman = new Unit("Shaman", 10, 1, 1);
const raychi = new Unit("Raychi", 15, 3, 2);
const exida = new Unit("Exida", 10, 3, 1);
const doomux = new Unit("Doomux", 20, 4, 2);
const centipede = new Unit("Centipede", 20, 4, 3);
const segment = new Unit("Segment", 10, 2, 2);

var unit_list = [warrior, archer, defenderUnit, rider, cloak, dagger, mind_bender, swordsman, catapult, knight, giant,
    boat, ship, battleship, dinghy, pirate, 
    amphibian, tridention, crab, 
    polytaur, navalon, dragon_egg, baby_dragon, fire_dragon, 
    ice_archer, battle_sled, mooni, ice_fortress, gaami,
    hexapod, kiton, phychi, shaman, raychi, exida, doomux, centipede, segment];
    
var no_upgrade = [cloak, dagger, mind_bender, giant];

//var no_damage = [];

var attacker = warrior;
var defender = warrior;

function select_attacker(){
    console.log("Select Attacker");
    select_unit(attacker, "attackUnit", "attackerUpgraded", "attackerHP", "img_attacker");
}

function select_defender(){
    console.log("Select Defender");
    select_unit(defender, "defenderUnit", "defenderUpgraded", "defenderHP", "img_defender");
}

function select_unit(unit, unit_id, upgraded_id, hp_id, image_id){
    console.log("Select Unit");
    var health_value = document.getElementById(hp_id).value;
    
    for (let i = 0; i < unit_list.length; i++){
        if (unit_list[i].name == document.getElementById(unit_id).value){
            unit = Object.assign({}, unit_list[i]); // Copy Object without reference

        }
    }

    
    document.getElementById(hp_id).max = unit.maxHealth;
    if (health_value > unit.maxHealth){
        update_hp(hp_id, unit.maxHealth);    
    }

    document.getElementById(image_id).src = "img/" + unit.name + ".webp";
    upgrade_unit(unit, upgraded_id, hp_id);
}

function upgrade_unit(unit, upgraded_id, hp_id){
    var upgraded = document.getElementById(upgraded_id).checked;

    var maxHP = unit.maxHealth;
    
    var disable = false;
    for (let i = 0; i < no_upgrade.length; i++){
        if (no_upgrade[i].name == unit.name){
            disable = true;
            document.getElementById(upgraded_id).checked = false;
            upgraded = false;
        }
    }
    document.getElementById(upgraded_id).disabled = disable;

    if (upgraded){
        maxHP += 5;
    }
    document.getElementById(hp_id).max = maxHP;
    update_hp(hp_id, maxHP);
}

function update_hp(hp_id, maxHP){
    document.getElementById(hp_id).value = maxHP;
}



function defense_bonus(){
    var defense_bonus = document.getElementById("defenseBonus").checked;

    if (defense_bonus){
        document.getElementById("City Wall").checked = false;
    }
}

function city_wall(){
    var city_wall = document.getElementById("City Wall").checked;

    if (city_wall){
        document.getElementById("defenseBonus").checked = false;
    }
}


function calculate(){
    console.log("Calculate");

    console.log(attacker);
    console.log(defender);

    for (let i = 0; i < unit_list.length; i++){
        if (unit_list[i].name == document.getElementById("attackUnit").value){
            attacker = Object.assign({}, unit_list[i]);
        }
        if (unit_list[i].name == document.getElementById("defenderUnit").value){
            defender = Object.assign({}, unit_list[i]);
        }
    }

    if (document.getElementById("attackerUpgraded").checked){
        attacker.maxHealth += 5;
    }

    if (document.getElementById("defenderUpgraded").checked){
        defender.maxHealth += 5;
    }
    console.log(attacker);
    console.log(defender);


    attacker.health = parseInt(document.getElementById("attackerHP").value);
    defender.health = parseInt(document.getElementById("defenderHP").value);
    
    
    if (attacker.maxHealth < attacker.health || defender.maxHealth < defender.health){
        //alert("Health Points doesnt match!");
        console.log("HP error");
        return;
    }

    /*
    defenceBonus is equal to 1 when there is no defence bonus, 
    1.5 for the standard defence bonus, 
    and 4 for the city wall defence bonus. 
    */
    var defenseBonus = 1;
    if (document.getElementById("defenseBonus").checked){
        defenseBonus = 1.5;
    }
    if (document.getElementById("City Wall").checked){
        defenseBonus = 4;
    }


    /* Formular */
    var attackForce = attacker.attack * (attacker.health / attacker.maxHealth)
    var defenseForce = defender.defense * (defender.health / defender.maxHealth) * defenseBonus 
    var totalDamage = attackForce + defenseForce 
    var attackResult = Math.round((attackForce / totalDamage) * attacker.attack * 4.5) 
    var defenseResult = Math.round((defenseForce / totalDamage) * defender.defense * 4.5)
    
    console.log(attackResult);
    console.log(defenseResult);

    if (attackResult >= defender.health){ // Defender Died!
        defenseResult = 0;
    }

    // Exceptions
    if (defender.name == mind_bender.name){
        defenseResult = 0;
    }
    //document.getElementById("solution").innerHTML = "Solution: Attack Damage: " + attackResult + " Defense Damage: " + defenseResult;

    document.getElementById("attack-damage").innerHTML = attackResult;
    document.getElementById("defense-damage").innerHTML = defenseResult;
}

