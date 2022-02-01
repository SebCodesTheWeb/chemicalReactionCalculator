const pTable = document.querySelector(".pTable");
let xPos = 3;
let currentElement = "";
let chemicalFormula = {
    0: {
        0: {}
    },
    1: {
        0: {}
    }
};
let chemicalFormulaString = "";
let currentSide = 0;
let currentMolecule = 0;
let currentAtom = 0;
let completeFormulaHTML = [];
let formulaHTMLIndex = 0;
let savedMoleculeHTMLData = [];
let offsetHTMLIndex = 0;

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

document.querySelector("#plus-button").addEventListener("click", function() {
    document.querySelector(".menu").innerHTML = "";
    currentAtom = 0;
    currentMolecule++;
    chemicalFormula[`${currentSide}`][currentMolecule] = {};
    document.querySelector("#input-chemicals").innerHTML += `<p>&nbsp; <sup>+</sup> &nbsp;<sub></sub></p>`;
    completeFormulaHTML.push(`<p>&nbsp; <sup>+</sup> &nbsp;<sub></sub></p>`);
    formulaHTMLIndex++;
    chemicalFormulaString += "+";
    let moleculeWeight = 0;
    let molarMass = 0;
    let moleculeMoles = 1;
    let moleculeSymbol = "";
    let atomAmount = 0;

    Object.values(chemicalFormula[0][currentMolecule-1]).forEach(newAtom => {
        // console.log(newAtom)
        moleculeWeight += parseFloat(newAtom.weight);
        moleculeSymbol += newAtom.symbol;
        if(newAtom.amount != 1) {
            moleculeSymbol += `<sub>${newAtom.amount}</sub>`;
        }
        atomAmount++;
    })
    molarMass = (moleculeWeight / moleculeMoles) * 1000;
    if(molarMass == 0 ) {molarMass = 1}
    moleculeWeight.toFixed(3);
    molarMass.toFixed(3);

    // console.log(moleculeSymbol);

    document.querySelector(".menu").innerHTML +=       
    `
    <p>${moleculeSymbol}</p>
    <input type="float" placeholder="mass(kg): "class="addAtom" id="changeMoleculeMass"></input>
    <label for="changeMoleculeMass">Kg</label>
    <input type="float" placeholder="moles: " class="addAtom" id="changeMoleculeMoles"></input>
    <label for="changeMoleculeMoles">Moles</label>
    <input type="float" placeholder="Amount " class="addAtom" id="changeMoleculeAmount"></input>
    <label for="changeMoleculeAmount" >Amount</label>
    <input type="button" value="Update " class="addAtom" id="changeMoleculeData"></input>
    `;

    document.querySelector("#changeMoleculeAmount").value = 1;
    document.querySelector("#changeMoleculeMass").value = moleculeWeight;
    document.querySelector("#changeMoleculeMoles").value = moleculeMoles;
    let savedMoles = document.querySelector("#changeMoleculeMoles").value;

    updateMoleculeData(moleculeWeight, moleculeMoles, 1);

    document.querySelector("#changeMoleculeMass").addEventListener("keyup", function(event) {
        document.querySelector("#changeMoleculeMoles").value = (document.querySelector("#changeMoleculeMass").value / molarMass * 1000 / document.querySelector("#changeMoleculeAmount").value).toFixed(3);
        savedMoles = document.querySelector("#changeMoleculeMoles").value;

        updateMoleculeData(document.querySelector("#changeMoleculeMass").value, document.querySelector("#changeMoleculeMoles").value, document.querySelector("#changeMoleculeAmount").value);
    })
    document.querySelector("#changeMoleculeMoles").addEventListener("keyup", function(event) {
        savedMoles = document.querySelector("#changeMoleculeMoles").value;
        document.querySelector("#changeMoleculeMass").value = (document.querySelector("#changeMoleculeMoles").value  * molarMass / 1000).toFixed(3);

        updateMoleculeData(document.querySelector("#changeMoleculeMass").value, document.querySelector("#changeMoleculeMoles").value, document.querySelector("#changeMoleculeAmount").value);
    })
    document.querySelector("#changeMoleculeAmount").addEventListener("keyup", function(event) {
        document.querySelector("#changeMoleculeMoles").value = savedMoles / document.querySelector("#changeMoleculeAmount").value;

        updateMoleculeData(document.querySelector("#changeMoleculeMass").value, document.querySelector("#changeMoleculeMoles").value, document.querySelector("#changeMoleculeAmount").value);
    })  

    document.querySelector("#changeMoleculeData").addEventListener("click", function() {
        // document.querySelector("#input-chemicals").innerHTML = "";
        // let insertIndex = 0;
        // // console.log(completeFormulaHTML);
        // for(let i = 0; i < completeFormulaHTML.length; i++) {
        //     if(i == formulaHTMLIndex-1-atomAmount + offsetHTMLIndex) {
        //         document.querySelector("#input-chemicals").innerHTML += `<p><sup>${document.querySelector("#changeMoleculeAmount").value}</sup></p>`
        //         // savedMoleculeHTMLData[i] =  `<p><sup>${document.querySelector("#changeMoleculeAmount").value}</sup></p>`;
        //         insertIndex = i;
        //     }
        //     document.querySelector("#input-chemicals").innerHTML += completeFormulaHTML[i];
        //     // savedMoleculeHTMLData[i] = completeFormulaHTML[i];
            
        // }
        // // savedMoleculeHTMLData = document.querySelector("#input-chemicals").innerHTML;
        // // completeFormulaHTML[0] =s savedMoleculeHTMLData;
        // // console.log(savedMoleculeHTMLData);
        // completeFormulaHTML.insert(insertIndex, `<p><sup>${document.querySelector("#changeMoleculeAmount").value}</sup></p>`)
        // console.log(completeFormulaHTML);
        // offsetHTMLIndex++;
    })

})

document.querySelector("#reaction-button").addEventListener("click", function() {
    currentSide = 1;
    currentMolecule = 0;
    chemicalFormula[`${currentSide}`][currentMolecule] = {};
    document.querySelector("#input-chemicals").innerHTML += `<p>&nbsp; <sup>---></sup> &nbsp;<sub></sub></p>`;
    completeFormulaHTML.push(`<p>&nbsp; <sup>---></sup> &nbsp;<sub></sub></p>`);
    formulaHTMLIndex++;
    chemicalFormulaString += "->"
})

document.querySelector("#calculate-button").addEventListener("click", function() {
    Object.keys(chemicalFormula[0]).forEach(value => {
        let moleculeWeight = 0;
        let molarMass = 0;
        let moleculeMoles = 1;
        let moleculeSymbol = "";
        let atomAmount = 0;

        Object.values(chemicalFormula[0][value]).forEach(newAtom => {
            outputAtomData(newAtom);
            moleculeWeight += parseFloat(newAtom.weight);
            moleculeSymbol += newAtom.symbol;
            if(newAtom.amount != 1) {
                moleculeSymbol += `<sub>${newAtom.amount}</sub>`;
            }
            atomAmount++;
        })
        molarMass = (moleculeWeight / moleculeMoles) * 1000;
        moleculeWeight.toFixed(3);
        molarMass.toFixed(3);

        if(atomAmount > 1) {
            document.querySelector(".outputData").innerHTML += 
            `
            <p class="atomDetails">=> ${moleculeSymbol} | ${moleculeWeight} kg  | ${moleculeMoles} moles | ${molarMass} g/mol </p>
            <p>--------------</p>
            `;
        }
    })
    Object.keys(chemicalFormula[1]).forEach(value => {
        let moleculeWeight = 0;
        let molarMass = 0;
        let moleculeMoles = 1;
        let moleculeSymbol = "";
        let atomAmount = 0;
        Object.values(chemicalFormula[1][value]).forEach(newAtom => {
            outputAtomData(newAtom);
            moleculeWeight += parseFloat(newAtom.weight);
            moleculeSymbol += newAtom.symbol;
            if(newAtom.amount != 1) {
                moleculeSymbol += newAtom.amount;
            }
            atomAmount++;
        })
        molarMass = (moleculeWeight / moleculeMoles) * 1000;
        moleculeWeight.toFixed(3);
        molarMass.toFixed(3);

        if(atomAmount > 1) {
            document.querySelector(".outputData").innerHTML += 
            `
            <p class="atomDetails">=> ${moleculeSymbol} | ${moleculeWeight} kg  | ${moleculeMoles} moles | ${molarMass} g/mol </p>
            <p>--------------</p>
            `;
        }
    })
    solve(chemicalFormulaString);

    // console.log(chemicalFormula);
})

function outputAtomData(atom) {
    if(atom.amount != 1) {
        document.querySelector(".outputData").innerHTML += 
        `
        <p class="atomDetails">${atom.symbol}<sub>${atom.amount}</sub> | ${atom.weight}kg  | ${atom.moles} moles | ${atom.atomicMass} g/mol</p>
        `;
    } else {
        document.querySelector(".outputData").innerHTML += 
        `
        <p class="atomDetails">${atom.symbol}<sub></sub> | ${atom.weight}kg  | ${atom.moles} moles | ${atom.atomicMass} g/mol</p>
        `;

    }
}

async function generatePTable() {
    const response = await fetch("https://periodic-table-elements-info.herokuapp.com/elements");
    const data = await response.json();

    displayAtom(data[0]);

    data.forEach(element => {
        const elementHTML = getElementHTML(element);
        pTable.innerHTML += `${elementHTML}`;
        colorElement(element);
        placeElementCorrectlyOnTable(element);
    })

    document.querySelectorAll(".element").forEach(atomElement => {
        atomElement.addEventListener("click", function(thisElement) {
            displayAtom(data[thisElement.path[1].firstElementChild.innerHTML-1]);
        })
    })
}

function getElementHTML(element) {
    const html = `
    <div class="element" id=atom-${element.atomicNumber}>
        <p class="atomicNumber">${element.atomicNumber}</p>
        <p class="atomicSymbol">${element.symbol}</p>
        <p class="atomicName">${element.name}</p>
        </div>
    `
    return html;
}

function placeElementCorrectlyOnTable(element) {
    const atom = document.querySelector(`#atom-${element.atomicNumber}`); 
    atom.style.gridColumnStart = `${element.group}` 
    atom.style.gridRowStart = `${element.period}` 
    if(element.atomicNumber > 56 && element.atomicNumber < 72) {
        atom.style.gridRowStart = "9" 
        atom.style.gridColumnStart = `${xPos}` 
        xPos++;
        atom.style.backgroundColor = `hsl(42deg, 62%, 76%)`;
        if(element.atomicNumber === 71) {xPos = 3}
    }
    if(element.atomicNumber > 88 && element.atomicNumber < 104) {
        atom.style.gridRowStart = "10" 
        atom.style.gridColumnStart = `${xPos}` 
        atom.style.backgroundColor = `hsl(340deg, 67%, 88%)`;
        xPos++;
    }
    if(element.atomicNumber === 5) {
        atom.style.gridRowStart = "2";
        atom.style.gridColumnStart = `13`; 
        atom.style.backgroundColor = "hsl(165deg, 58%, 76%)";
    }
}

function colorElement(element) {
    const atom = document.querySelector(`#atom-${element.atomicNumber}`); 
    switch (element.group) {
        case 1:
            atom.style.backgroundColor = `hsl(48deg, 77%, 64%)`;
            break;
        case 2: 
            atom.style.backgroundColor = `hsl(60deg, 83%, 67%)`;
            break;          
        case 3:
        case 4:
        case 5:
        case 6:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            atom.style.backgroundColor = `hsl(12deg, 87%, 85%)`;
            break;
        case 13:
            atom.style.backgroundColor = `hsl(192deg, 62%, 80%)`;
            break;
            
        case 18:
            atom.style.backgroundColor = `hsl(300deg, 44%, 82%)`;
            break;
        }
        if(element.group - element.period == 11 || element.atomicNumber === 32 || element.atomicNumber === 51) {
            atom.style.backgroundColor = "hsl(165deg, 58%, 76%)";
        }

        if(element.atomicNumber > 108) {
            atom.style.backgroundColor = "#eee"
        }

        if(element.atomicNumber === 1) {
            atom.style.backgroundColor = "hsl(120deg, 73%, 74%)";
        }
        
        if(element.group === 17 && element.period < 6) {
            atom.style.backgroundColor = "hsl(120deg, 73%, 74%)";
        }
        if(element.group === 16 && element.period < 5) {
            atom.style.backgroundColor = "hsl(120deg, 73%, 74%)";
        }
        if(element.group === 15 && element.period < 4) {
            atom.style.backgroundColor = "hsl(120deg, 73%, 74%)";
        }
        if(element.group === 14 && element.period < 3) {
            atom.style.backgroundColor = "hsl(120deg, 73%, 74%)";
        }
        if(element.atomicNumber === 50 || element.atomicNumber === 82 || element.atomicNumber === 83 || element.atomicNumber === 84) {
            atom.style.backgroundColor = "hsl(192deg, 62%, 80%)";
    
        }
    return null;
}

function displayAtom(element) {
    document.querySelector(".atom-info").innerHTML = 
        `
        <h1 style="margin-bottom: 0.3em;">${element.symbol}</h1>
        
        <p class="atomDetails">Atomic Number: ${element.atomicNumber}</p>
        <p class="atomDetails">Name: ${element.name}</p>
        <p class="atomDetails">Symbol: ${element.symbol}</p>
        <p class="atomDetails">Group: ${element.group}</p>
        <p class="atomDetails">Period: ${element.period}</p>
        <p class="atomDetails">Block: ${element.groupBlock}</p>
        <p class="atomDetails">Atomic Mass: ${element.atomicMass} u</p>
        <p class="atomDetails">Density: ${element.density} kg/m³</p>
        <p class="atomDetails">Standard State: ${element.standardState}</p>
        <p class="atomDetails">Boiling Point: ${element.boilingPoint} K</p>
        <p class="atomDetails">Melting Point: ${element.meltingPoint} K</p>
        <p class="atomDetails">Energy Levels: ${element.electronicConfiguration}</p>
        <p class="atomDetails">Atomic Radius: ${element.atomicRadius} pm</p>
        <p class="atomDetails">Bonding Type: ${element.bondingType}</p>
        <p class="atomDetails">Electron Negativity: ${element.electronegativity}</p>
        <p class="atomDetails">Ionization Energy: ${element.ionizationEnergy} kj/mol</p>
        <p class="atomDetails">Oxidation States: ${element.oxidationStates}</p>
        <p class="atomDetails">Year Discovered: ${element.yearDiscovered}</p>
        <form id="addAtom"> 
        <input type="float" placeholder="mass(kg): "class="addAtom" id="addAtomMass"></input>
        <label for="addAtomMass">Kg</label>
        <input type="float" placeholder="moles: " class="addAtom" id="addAtomMoles"></input>
        <label for="addAtomMoles">Moles</label>
        <input type="number" placeholder="Specific Amount: " class="addAtom" id="addAtomAmount"></input>
        <label for="addAtomAmount" >Amount</label>
        <input type="submit" value="Add atom" class="addAtom" style="display: block; id="addAtomButton"></input>
        </form>
        `

    currentElement = element; 
    document.querySelector("#addAtomAmount").value = 1;
    document.querySelector("#addAtomMass").value = 0;
    document.querySelector("#addAtomMoles").value = 0;
    let savedMoles = 0;

    document.querySelector("#addAtomMass").addEventListener("keyup", function(event) {
        document.querySelector("#addAtomMoles").value = (document.querySelector("#addAtomMass").value  / parseFloat(currentElement.atomicMass.slice(0, -3)) *1000 / document.querySelector("#addAtomAmount").value).toFixed(3);
        savedMoles = document.querySelector("#addAtomMoles").value;
    })
    document.querySelector("#addAtomMoles").addEventListener("keyup", function(event) {
        savedMoles = document.querySelector("#addAtomMoles").value;
        document.querySelector("#addAtomMass").value = (document.querySelector("#addAtomMoles").value  * parseFloat(currentElement.atomicMass.slice(0, -3)) /1000).toFixed(3);
    })
    document.querySelector("#addAtomAmount").addEventListener("keyup", function(event) {
        document.querySelector("#addAtomMoles").value = savedMoles / document.querySelector("#addAtomAmount").value;
    })  

    document.querySelector("#addAtom").addEventListener("submit", function(event) {
        event.preventDefault();
        let atomHTML = ``;
        if(document.querySelector("#addAtomAmount").value != 1) {
            atomHTML = 
            `
            <p id="atomic_symbol">${element.symbol}<sub>${document.querySelector("#addAtomAmount").value} </sub> </p>
            `
        } else {
            atomHTML = 
            `
            <p id="atomic_symbol">${element.symbol}</p>
            `
        }
        document.querySelector(".menu").innerHTML = "";
        // completeFormulaHTML.insert(formulaHTMLIndex-1, `<p><sup>${savedMoleculeHTMLData}</sup></p>`)
        completeFormulaHTML.push(atomHTML);
        // console.log(completeFormulaHTML);
        document.querySelector("#input-chemicals").innerHTML += atomHTML;
        formulaHTMLIndex++;
        updateChemicalFormula(currentElement);
    })
}

function updateChemicalFormula(atom) {
    atom["weight"] = document.querySelector("#addAtomMass").value;
    atom["amount"] = document.querySelector("#addAtomAmount").value;
    atom["moles"] = document.querySelector("#addAtomMoles").value / parseFloat(atom["amount"]);
    // if(atom["amount"] === 0 || atom["amount"] != typeof(1)) {atom["amount"] = 1};
    chemicalFormula[`${currentSide}`][currentMolecule][currentAtom] = atom;
    currentAtom++;
    chemicalFormulaString += atom.symbol;
    if(atom["amount"] != 1) {
        chemicalFormulaString += atom["amount"].toString();
    }
}

function updateMoleculeData(weight, moles, amount) {
    chemicalFormula[currentSide][currentMolecule-1][-1] = {
        "weight": weight,
        "moles": moles,
        "amount": amount
    };

    console.log(chemicalFormula[currentSide][currentMolecule-1][-1]);
}

generatePTable();

function solve(x) {
    //firstly we find bigNumber, which will be all numbers multiplied together, in order to assume the last element is a constant amount of that
    bigNumber = 1;
    arrayOfNumbers = new Set(x.split(/\D+/g));
    arrayOfNumbers.delete("");
    for (let i of arrayOfNumbers) bigNumber *= parseInt(i);
    
    //first actual step, we split into left hand side and right hand side, and then into separate molecules
    //number of molecules is number of variables, number of elements is number of equations, variables refer to the coefficients of the chemical equation
    //note, the structure of this is changed a lot in the golfed version since right is the same as negative left
    left = x.split("->")[0].split("+");
    righ = x.split("->")[1].split("+");
    molecules = left.length + righ.length;
    
    //then let's find what elements there are - this will also become how many equations we have, or the columns of our matrix minus one
    //we replace all the non-element characters, and then split based on the uppercase characters
    //this also sometimes adds a "" to the array, we don't need that so we just delete it
    //turn into a set in order to remove repeats
    elems = new Set(x.replace(/\d+|\+|->/g,"").match(/([A-Z][a-z]*)/g));
    elems.delete("");
    
    rrefArray = [];//first index is rows, second index columns - each row is an equation x*(A11)+y*(A21)+z*(A31)=A41 etc etc, to solve for xyz as coefficients
    //loop thru the elements, since for each element we'll have an equation, or a row in the array
    for (let elem of elems) {
        buildArr = [];
        //loop thru the sides
        for (let molecule of left) {
            //let's see how many of element elem are in molecule molecule
            //ASSUMPTION: each element happens only once per molecule (no shenanigans like CH3COOH)
            index = molecule.indexOf(elem);
            if (index == -1) buildArr.push(0);
            else {
                index += elem.length;
                numberAfterElement = molecule.substring(index).match(/^\d+/g);
                if (numberAfterElement == null) buildArr.push(1);
                else buildArr.push(parseInt(numberAfterElement));
            }
        }
        //same for right, except each item is negative
        for (let molecule of righ) {
            index = molecule.indexOf(elem);
            if (index == -1) buildArr.push(0);
            else {
                index += elem.length;
                numberAfterElement = molecule.substring(index).match(/^\d+/g);
                if (numberAfterElement == null) buildArr.push(-1);
                else buildArr.push(parseInt(numberAfterElement)*(-1));
            }
        }
        rrefArray.push(buildArr);
    }
    
    //Gauss-Jordan algorithm starts here, on rrefArray
    for (pivot=0;pivot<Math.min(molecules, elems.size);pivot++) {
        //for each pivot element, first we search for a row in which the pivot is nonzero
        //this is guaranteed to exist because there are no empty molecules
        for (i=pivot;i<rrefArray.length;i++) {
            row = rrefArray[i];
            if (row[pivot] != 0) {
                workingOnThisRow = rrefArray.splice(rrefArray.indexOf(row), 1)[0];
            }
        }
        //then multiply elements so the pivot element of workingOnThisRow is equal to bigNumber we determined above, this is all to keep everything in integer-space
        multiplyWhat = bigNumber / workingOnThisRow[pivot]
        for (i=0;i<workingOnThisRow.length;i++) workingOnThisRow[i] *= multiplyWhat
        //then we make sure the other rows don't have this column as a number, the other rows have to be zero, if not we can normalize to bigNumber and subtract
        for (let i in rrefArray) {
            row = rrefArray[i];
            if (row[pivot] != 0) {
                multiplyWhat = bigNumber / row[pivot]
                for (j=0;j<row.length;j++) {
                    row[j] *= multiplyWhat;
                    row[j] -= workingOnThisRow[j];
                    row[j] /= multiplyWhat;
                }
                rrefArray[i]=row;
            }
        }
        //finally we put the row back
        rrefArray.splice(pivot, 0, workingOnThisRow);
    }
    
    //and finally we're done!
    //sanity check to make sure it succeeded, if not then the matrix is insolvable
    if (rrefArray[0][elems.size] == 0 || rrefArray[0][elems.size] == undefined) return "Nope!";
    
    //last step - get the results of the rref, which will be the coefficients of em except for the last one, which would be bigNumber (1 with typical implementation of the algorithm)
    bigNumber *= -1;
    gcd_calc = function(a, b) {
        if (!b) return a;
        return gcd_calc(b, a%b);
    };
    coEffs = [];
    gcd = bigNumber;
    for (i=0;i<rrefArray.length;i++) {
        num = rrefArray[i][molecules-1];
        coEffs.push(num);
        gcd = gcd_calc(gcd, num)
    }
    coEffs.push(bigNumber);
    for (i=0;i<coEffs.length;i++) coEffs[i] /= gcd;
    
    //now we make it human readable
    //we have left and right from before, let's not forget those!
    out = "";
    for (i=0;i<coEffs.length;i++) {
        coEff = coEffs[i];
        if (coEff != 1) out += coEff;
        out += left.shift();
        if (left.length == 0 && righ.length != 0) {
            out += "->";
            left = righ;
        } else if (i != coEffs.length-1) out += "+";
    }
    // console.log(out)
    return convertAnswer(out);
}

function convertAnswer(answer) {
    let newString = answer.replace(/([)a-zA-Z])(\d+)/g, "$1<sub>$2</sub>");

    let newerString = newString.replace(/->/g, " ---> ")

    let newestString = newerString.replace(/\+/g, " + ")

    let proccessedAnswerHtml = 
    `
    <p>Balanced Equation:</p>
    <p>${newestString}</p>
    `
    document.querySelector("#balancedEquation").innerHTML += proccessedAnswerHtml;
}


// console.log(solve("Al+Fe2O4->Fe+Al2O3"));
// console.log(solve("Al+Fe2O3->Fe+Al2O3"));
// console.log(solve("C7H16+O2->CO2+H2O"));
// console.log(solve("Pb->Au"));

// Author of function solve(x) from codegolf.stackexchange https://codegolf.stackexchange.com/questions/8728/balance-chemical-equations