'use strict';

module.exports = class PhoneRegister {
    #register

    constructor(data) {
        if (!data) {
            throw new Error('phone data missing');
        }
        this.#register = data;
    }

    getTypes() {
        const foundTypes = [];
        for (const person of this.#register) {
            for (const phone of person.phones) {
                if (!foundTypes.includes(phone.type)) {
                    foundTypes.push(phone.type);
                }
            }
        }

        return foundTypes;

    } //end of getTypes

    getPersonsNumbersByType(firstname, lastname, type) {
        if (arguments.length < 3) {
            throw new Error('missing parameter');
        }

        const numbersFound = [];
        for (const person of this.#register) {
            if (person.firstname === firstname && person.lastname === lastname) {
                for (const phone of person.phones) {
                    if (phone.type === type) {
                        numbersFound.push(phone.number);
                    }
                }
                return numbersFound;
            }
        }

        return numbersFound;
    } //end of  getPersonsNumbersByType

    getAllNumbersByType(type) {
        if (arguments.length < 1) {
            throw new Error('missing parameter');
        }
        const numbersFound = [];
        for (const person of this.#register) {
            for (const phone of person.phones) {
                if (phone.type === type) {
                    numbersFound.push({
                        firstname: person.firstname,
                        lastname: person.lastname,
                        number: {
                            type: phone.type,
                            tel: phone.number
                        }
                    });
                }
            }
        }

        return numbersFound;
    } //end of getAllNumbersByType

    /*  getName(number){
         // SOMETHIN IS MISSING HERE
     } */

    // addition for mocha test
    hasNumber(number) {
        for (const person of this.#register) {
            for (const phone of person.phones) {
                if (phone.number === number) {
                    return true;
                }
            }
        }
        return false;
    }

}//end of class