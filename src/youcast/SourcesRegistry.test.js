const SourcesRegistry = require('./SourcesRegistry');
const EventEmitter = require('node:events');

describe('Instatiation', () => {
    it('Instantates without error when passed an event emitter', () => {
        expect(() => {
            emitter = new EventEmitter();
            const registry = new SourcesRegistry(emitter);
        }).not.toThrow();
    });
    it('Throws an error when not passed an event emitter', () => {
        expect(() => {
            const registry = new SourcesRegistry();
        }).toThrow();
    });
});

describe('Register and report sources', () => {

    let registry, channel;

    beforeEach(() => {
        channel = new EventEmitter();
        registry = new SourcesRegistry(channel);
    });

    it('can register a source', () => {
        expect(() => {
            registry.registerSource('youtube');
        }).not.toThrow();
    });
    it('throws an error if the requested source does not exist', () => {
        expect(() => {
            registry.registerSource('error')
        }).toThrow();
    });
    it('can list the currently registered source', () => {
        expect(registry.listSources()).toEqual([]);
        registry.registerSource('youtube');
        expect(registry.listSources()).toEqual(['youtube']);    
    });
    it('does not register duplicate source', () => {
        expect(registry.listSources()).toEqual([]);
        registry.registerSource('youtube');
        registry.registerSource('youtube');
        expect(registry.listSources()).toEqual(['youtube']);    
    });
    it('can tell you if a given source is registered', ()=>{
        expect(registry.includesByShortcode('nothing')).toBe(false);
        registry.registerSource('youtube');
        expect(registry.includesByShortcode('youtube')).toBe(true);
    });
    it('can register all the sources in the sources folder', () => {
        registry.registerAll();
        expect(registry.listSources()).toEqual(['youtube']);
    });
});

describe('Responds to Events', () => {

    let registry, channel;

    beforeEach(() => {
        channel = new EventEmitter();
        registry = new SourcesRegistry(channel);
    });

    it('responds to "listSources" event with "sourcesList" even containing array of Sources', (done) => {
        channel.on('sourcesList',(list)=>{
            expect(list).toEqual([]);
            done();
        });
        channel.emit('listSources');
    });
    it('responds to "registerSource" event by registering a source specified by shortcode', () => {
        expect(registry.listSources()).toEqual([]);
        channel.emit('registerSource','youtube');
        expect(registry.listSources()).toEqual(['youtube']);
    });

});