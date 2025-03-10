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
        expect(register.getTypes()).to.be.an('array').that.is.empty;
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
});