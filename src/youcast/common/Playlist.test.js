const {Playlist} = require('./Playlist');

describe('Playlist', () => {

    let playlist;

    beforeEach(() => {
        playlist = new Playlist();
    });

    it('doesn\'t die instantly.', () => {
        expect(playlist).toBeTruthy();
    });
    it('has defaults for the required values', () => {
        expect(playlist).toEqual(expect.objectContaining({
            title: expect.any(String),
            author: expect.any(String),
            list: expect.any(Array),
        }));
    });
    it('assignes values correctly', () => {
        playlist = new Playlist({
            title: "test_title",
            author: "test_author",
        });
        expect(playlist).toEqual(expect.objectContaining({
            title: expect.any(String),
            author: expect.any(String),
        }));
    });

});