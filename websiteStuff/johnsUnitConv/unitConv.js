// make some sort of 2 dimensional array (table) with all the values of possible unit 
// types and the number you must multiply one of those units by to get meters
 
let UNIT_TABLE  = [
   ["inch",       (1 / 39.3701), ["inch", "inches", "in"]],
   ["foot",       (1 / 3.28084), ["foot", "feet", "ft"]],
   ["kilometer",  1000,          ["kilometer", "kilometers", "km"]],
   ["meter",      1,             ["meter", "meters", "m"]]
];


function convertToUnit(value, inputUnitType, outputUnitType) {
   inputUnitType = relaxUnitSyntax(inputUnitType, UNIT_TABLE)
   outputUnitType = relaxUnitSyntax(outputUnitType, UNIT_TABLE)
   if (inputUnitType === "meter") {
      return meterToUnit(value, outputUnitType)
   } else {
      let changedValue = value * getToMeterFac(inputUnitType, UNIT_TABLE)
      return meterToUnit(changedValue, outputUnitType)
   }
}

function meterToUnit(value, outputUnitType) {
   return value / getToMeterFac(outputUnitType, UNIT_TABLE)
}


function getToMeterFac(nonMeterUnitType, UNIT_TABLE) {
   for (let i = 0; i < UNIT_TABLE.length; i++) {
      if (UNIT_TABLE[i][0] === nonMeterUnitType) {
         return UNIT_TABLE[i][1]
      }
   }
   return -1;
}


// optional functions that are nice

// function addUnit(2dArray UNIT_TABLE,string unitType, number toMeterFac)
//    add a new row to the 2dArray (table) of the form
//    [unitType, toMeterFac]
//    return the updated array
function addUnit(UNIT_TABLE, unitType, toMeterFac, allowedAlternatives) {
   let changedUNIT_TABLE = UNIT_TABLE.concat([[unitType, toMeterFac, allowedAlternatives]])
   return changedUNIT_TABLE
}
//takes in a string corresponding to a unchecked unit
//also takes in a table of the units
//returns the corresponding strict unit string
//if there is no equivalent it returns "invalid unit"
function relaxUnitSyntax(possibleUnit, UNIT_TABLE) {
   possibleUnit = possibleUnit.toLowerCase();
   //for every row in the table
   for (let i = 0; i < UNIT_TABLE.length; i++) {
      //if the allowed list contains the possible unit
      if (UNIT_TABLE[i][2].includes(possibleUnit)) {
         //then return the strict version contained in the first column of that row
         return UNIT_TABLE[i][0]
      }
   }
   //if nothing has been returned by this point then the 
   //unit was not anywhere in the table so it isnt supported
   return "invalid unit"
}



/////////////////////////////////////////////
//driver

console.log("testing original units in table")
console.log(convertToUnit(200, "in", "km") + " = 0.00507" )
console.log(convertToUnit(12, "incHes", "feet") + " = 1")
console.log(convertToUnit(5, "m", "feet") + " = 16.4042")

console.log("\ntesting addition of new units")
console.log("adding ")
UNIT_TABLE = addUnit(UNIT_TABLE, "mile", 1609.34, ["mile", "miles", "mi"])
console.log(convertToUnit(200, "m", "mi") + " = 0.124274")
console.log(convertToUnit(200, "", "") + " = ")
console.log(convertToUnit(200, "", "") + " = ")
console.log(convertToUnit(200, "", "") + " = ")
console.log(convertToUnit(200, "", "") + " = ")
console.log(convertToUnit(200, "", "") + " = ")
console.log(convertToUnit(200, "", "") + " = ")
