"use strict"

exports.isInitialized = (db) => {
    if ( db.length < 1 ) {
        return false
    }
    else if ( db.length >= 1) {
        return true
    }
}


exports.sanitizeCommand = (input) => {
    var arrayInstruction = input.split(' ')
    arrayInstruction[0].toLowerCase()
    
    const formatSanitize = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

    if (formatSanitize.test(input)) {
        console.log("[ERROR] instruction can not contain special character.")
        return false
    } else {
        return arrayInstruction
    }
}


exports.initInstructionSanitation = (maxLocker) => {
    if (!isNumberOnly(maxLocker)) { 
        console.log("[ERROR] Second parameter of init MUST be a number.")
        return false 
    } 
    return true
}


exports.inputInstructionSanitation = (IDtype, IDNumb) => {
    if (!isLetterOnly(IDtype)) {
        console.log("[ERROR] ID Type parameter can only contain letter [a-z A-Z].")
        return false
    } else if (!isNumberOnly(IDNumb)){
        console.log("[ERROR] ID Number parameter can only contain a number [0-9].", IDNumb)
        return false
    }
    return true
}


exports.leaveInstructionSanitation = (lockerNo) => {
    if (!isNumberOnly(lockerNo)){
        console.log("[ERROR] Locker number parameter can only contain a number [0-9].")
        return false    
    }
    return true
}


exports.findInstructionSanitation = (noID) => {
    if (!isNumberOnly(noID)){
        console.log("[ERROR] ID number parameter can only contain a number [0-9].")
        return false    
    }
    return true
}


exports.searchInstructionSanitation = (typeID) => {
    if (!isLetterOnly(typeID)){
        console.log("[ERROR] ID type parameter can only contain letter [a-z A-Z].")
        return false    
    }
    return true
}

function isNumberOnly(string) {
    return /^[0-9]*$/.test(string)
}

function isLetterOnly(string) {
    return /^[a-zA-Z]*$/.test(string)
}