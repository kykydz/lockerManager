"use strict"

const security    = require('./security')

var db = []
module.exports.db = db

exports.initInstruction = (maxLocker) => {
    if (security.initInstructionSanitation(maxLocker)){
        for (let i = 0; i < maxLocker; i++) {
            db.push({
                'lockerNumb'  : i + 1,
                'idType'    : '',
                'idNumb'    : ''
            })
        }
        console.log(`Successfully to create ${maxLocker} locker.`)
        return 200
    } else {
        console.log("[ERROR] init failed.", `[${maxLocker}]`)
        return 400
    }
}


exports.inputInstruction = (IDtype, IDNumb) => {
    if (security.inputInstructionSanitation(IDtype, IDNumb)){
        var lockerNumbMin = Number.MAX_SAFE_INTEGER
        let availableSpace = false

        for (let i = 0; i < db.length; i++) {
            const dataRow = db[i]
            let tmpMin = dataRow.lockerNumb
            
            if (tmpMin < lockerNumbMin) { 
                if (!dataRow.idType && !dataRow.idNumb){
                    availableSpace = true
                    lockerNumbMin = tmpMin
                    break
                }
            }
        }

        if (availableSpace){
            db[lockerNumbMin-1].idType = IDtype
            db[lockerNumbMin-1].idNumb = IDNumb
            console.log(`Card ID [${IDtype}] [${IDNumb}] saved in locker number [${lockerNumbMin}]`)
            return 200
        } else {
            console.log(`[ERROR] Sorry, locker is full.`)
            return 500
        }
    } else {
        console.log("[ERROR] input failed.", `"${IDtype}", "${IDNumb}"`)
        return 400
    }
}


exports.statusInstruction = (instruction) => {
    if (instruction.length > 1){
        console.log('[WARNING] "status" take no parameter. Another parameter after "status" will be ignored.')
    }
    console.log('Showing all locker status \n')
    this.prettyPrintDB(db)
    return 200
}


exports.leaveInstruction = (lockerNo) => {
    if (security.leaveInstructionSanitation(lockerNo)){
        
        for (let i = 0; i < db.length; i++) {
            const dataRow = db[i];
            if (dataRow.lockerNumb === (parseInt(lockerNo)) ) {
                dataRow.idType = ''
                dataRow.idNumb = ''
            }
        }
        console.log(`Locker number [${lockerNo}] was successfully emptied. `)
        return 200
    } else {
        console.log("[ERROR] Leave failed.", `"${lockerNo}"`)
        return 400
    }
}

exports.findInstruction = (noID) => {

    if (security.findInstructionSanitation(noID)){
        
        console.log(`Finding ID number [${noID}] in all locker.`)
        let found = false
        let foundInLocker = 0

        for (let i = 0; i < db.length; i++) {
            const dataRow = db[i]
            if (dataRow.idNumb === noID){
                found = true
                foundInLocker = dataRow.lockerNumb
                break
            } else {
                found = false
            }
        }

        if (found) {
            console.log(`ID card found in locker number "${foundInLocker}"`)
            return 200
        } else {
            console.log(`ID card not found in every locker number ${noID}`)
            return 404
        }
    } else {
        console.log("[ERROR] Find failed.", `"${noID}"`)
        return 400
    }
    
}

exports.searchInstruction = (typeID) => {
    if (security.searchInstructionSanitation(typeID)) {
        console.log(`Searching ID type [${typeID}]`)
        var foundRow = []
        for (let i = 0; i < db.length; i++) {
            const dataRow = db[i];
            if (dataRow.idType === typeID){
                foundRow.push(dataRow.idNumb)
            }
        }
        if (foundRow.length < 1 ){
            console.log(`Searching ${typeID} is not found.`)
            return 404
        } else {
            console.log(`Show founded ID card with type of ${typeID}\n`, foundRow)
            return 200
        }
    } else {
        console.log("[ERROR] Search failed.", `"${typeID}"`)
        return 400
    }
}


exports.prettyPrintDB = (db) => {
    console.log("Locker Number\t", "ID Type\t", "ID Number")
    for (let i = 0; i < db.length; i++) {
        const row = db[i];
        const strLockerNumb = row.lockerNumb.toString()
        const stridType     = row.idType.toString()
        const stridNumb     = row.idNumb.toString()

        console.log(strLockerNumb + '\t\t', stridType + '\t\t', stridNumb)
    }
}