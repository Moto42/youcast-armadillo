const FormatsRegistry = require('./FormatsRegistry');
const EventEmitter = require('node:events');

describe('Instatiation', () => {
    it('Instantates without error when passed an event emitter', () => {
        expect(() => {
            emitter = new EventEmitter();
            const registry = new FormatsRegistry(emitter);
        }).not.toThrow();
    });
    it('Throws an error when not passed an event emitter', () => {
        expect(() => {
            const registry = new FormatsRegistry();
        }).toThrow();
    });
});

describe.only('Register and report formats', () => {

    let registry, channel;

    beforeEach(() => {
        channel = new EventEmitter();
        registry = new FormatsRegistry(channel);
    });

    it('can register a format', () => {
        expect(() => {
            registry.registerFormat('api');
        }).not.toThrow();
    });
    it('throws an error if the requested format does not exist', () => {
        expect(() => {
            registry.registerFormat('error')
        }).toThrow();
    });
    it('can list the currently registered formats', () => {
        expect(registry.listFormats()).toEqual([]);
    });
    

    
});

describe('Responds to Events', () => {

    let registry, channel;

    beforeEach(() => {
        channel = new EventEmitter();
        registry = new FormatsRegistry(channel);
    });

    test('Responds to Events', () => {
        
    });

});