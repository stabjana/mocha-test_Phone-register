const expect = require('chai').expect;

const PhoneRegister = require('../phoneRegister');
const phones = require('../phones.json');

describe('test get types', function () {
    it('using default data', function () {
        const register = new PhoneRegister(phones); // we need to deep equal here
        expect(register.getTypes()).to.deep.equal(['home', 'work', 'mobile']);
    });
    it('empty register', function () {
        const register = new PhoneRegister([]);
        expect(register.getTypes()).to.be.empty;
    });
    it('empty register v2', function () {
        const register = new PhoneRegister([]);
        expect(register.getTypes()).to.be.an('array').that.is.empty; // dont cara about the content, only array and that its empty (also possible with not empty: .that.is.not.empty)
    });
    it('empty register v3', function () {
        const register = new PhoneRegister([]);
        expect(register.getTypes()).to.deep.equal([]);
    });
    it('demo equal', function () { // true because refers to same array
        const data = [];
        expect(data).to.equal(data);
    });
    it('demo deep equal', function () { // fails with equal, because it refers to different arrays
        const data = [];
        expect(data).to.deep.equal([]);
    });
    it('demo deep equal version 2', function () { // fails with equal, because it refers to different arrays
        expect([1, 2, 3]).to.deep.equal([1, 2, 3]); // it works with deep.equal because i am checking the values inside the array
    });
    it('demo equal version 2', function () {
        const data = [1, 2, 3];
        expect(data).to.equal(data);
    });
    it('demo  equal 2 not', function () { //toBe in jest is equal here, equal in jest is deep.equal here
        const data = [1, 2, 3];
        expect(data).not.to.equal([1, 2, 3]);
    });
});

describe('Testing hasNumber', function () {
    const register = new PhoneRegister(phones);

    it('test number "12345678" exists', function () {
        expect(register.hasNumber('12345678')).to.be.true;
    });
    it('test number "000" does not exist', function () {
        expect(register.hasNumber('000')).to.be.false;
    });
    it('test number "000" does not exist', function () {
        expect(register.hasNumber('000')).not.to.be.true;
    });
});

// function tests
describe('test getName()', function () {
    const register = new PhoneRegister(phones);

    it('test number "12345678"', function () {
        const expectedValue = { firstname: "Leila", lastname: "Hökki" };
        expect(register.getName('12345678')).to.deep.equal(expectedValue);
    });

    it('test number "12345678" v2', function () {
        expect(register.getName('12345678'))
            .to.deep.equal({ lastname: "Hökki", firstname: "Leila" }); // SOMETHING ADDED AS SOMEWHERE HERE
    });

    it('test number "0000" to return null', function () {
        expect(register.getName('0000')).to.be.null;
    });
});

describe('Test getAllNumbersByType with default data', function () {
    const register = new PhoneRegister(phones);

    it('test type work', function () {
        const expectedValue = [
            {
                firstname: 'Leila',
                lastname: 'Hökki',
                number: { type: 'work', tel: '987654321' }
            },
            {
                firstname: 'Leila',
                lastname: 'Hökki',
                number: { type: 'work', tel: '05040302' }
            },
            {
                firstname: 'Matt',
                lastname: 'River',
                number: { type: 'work', tel: '2468159' }
            }
        ];
        expect(register.getAllNumbersByType('work')).to.deep.equal(expectedValue);
    });
});

describe('Test getPersonsNumbersType', function () {
    const testValues = [
        { firstname: 'Leila', lastname: 'Hökki', type: 'work', result: ['987654321', '05040302'] },
        { firstname: 'Matt', lastname: 'River', type: 'mobile', result: ['0409812345'] },
        { firstname: 'Matt', lastname: 'x', type: 'mobile', result: [] },
        { firstname: 'x', lastname: 'River', type: 'mobile', result: [] },
        { firstname: 'Matt', lastname: 'River', type: 'x', result: [] }
    ];
    const register = new PhoneRegister(phones);

    testValues.forEach(function (value) { // value = is test case
        it(`${value.firstname} ${value.lastname} ${value.type}`, function () {
            expect(register.getPersonsNumbersByType(value.firstname, value.lastname, value.type)).to.deep.equal(value.result);
        });
    })
});