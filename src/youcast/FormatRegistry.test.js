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

describe('Register and report formats', () => {

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
        registry.registerFormat('api');
        expect(registry.listFormats()).toEqual(['api']);    
    });
    it('does not register duplicate formats', () => {
        expect(registry.listFormats()).toEqual([]);
        registry.registerFormat('api');
        registry.registerFormat('api');
        expect(registry.listFormats()).toEqual(['api']);    
    });
    it('can tell you if a given api is registered', ()=>{
        expect(registry.includesByShortcode('nothing')).toBe(false);
        registry.registerFormat('api');
        expect(registry.includesByShortcode('api')).toBe(true);
    });
});

describe('Responds to Events', () => {

    let registry, channel;

    beforeEach(() => {
        channel = new EventEmitter();
        registry = new FormatsRegistry(channel);
    });

    it('responds to "listFormats" event with "formatsList" even containing array of Formats', (done) => {
        channel.on('formatsList',(list)=>{
            expect(list).toEqual([]);
            done();
        });
        channel.emit('listFormats');
    });
    it('responds to "registerFormat" event by registering a format specified by shortcode', () => {
        expect(registry.listFormats()).toEqual([]);
        channel.emit('registerFormat','api');
        expect(registry.listFormats()).toEqual(['api']);
    });

});