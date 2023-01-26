
describe('entrpoint startup procedure', ()=>{
    //I have spent hours trying to get this figured out.
    it.todo('emits event "plugins-register" on startup');
});

describe('plugins are registered',()=>{
    let entrypoint, youcastEventChannel, YoucastEventEmitter;
    beforeEach(()=>{
        const thinger = require('./entrypoint');
        entrypoint = thinger.entrypoint;
        youcastEventChannel = thinger.youcastEventChannel;
        YoucastEventEmitter = thinger.YoucastEventEmitter;
    });
    it('responds to "register-plugin" event', () => {
        const spy = jest.fn();
        youcastEventChannel.register_plugin = spy;
        youcastEventChannel.emit('register-plugin');
        expect(spy).toHaveBeenCalledTimes(1);
    });
})