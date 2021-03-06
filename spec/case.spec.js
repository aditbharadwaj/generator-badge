var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var util = require('./util.js'),
 prepare = util.prepare,
postpare = util.postpare;
var _ = require('lodash');

var cases = {
    'inject': [path.resolve(__dirname, '../lib/cli.js'), 'install', 'travis', 'npm-version', '--repo-username=tanhauhau', '--repo-name=awesome-project'],
    'clear': [path.resolve(__dirname, '../lib/cli.js'), 'clear']
};
_.each(cases, function(kase, key){
    describe("case: " + key, function(){
        beforeEach(prepare(path.resolve(__dirname, 'case', key, 'DEFAULT.md'),
                        path.resolve(__dirname, 'case', key, 'README.md'),
                        kase,
                        path.resolve(__dirname, 'case', key )));
        afterEach(postpare(path.resolve(__dirname, 'case', key, 'DEFAULT.md'),
                           path.resolve(__dirname, 'case', key, 'README.md'),
                           [path.resolve(__dirname, 'case', key, '.badge.json')]
        ));
        describe('compare file', function(){
            it('should be the same', function(){
                expect(fs.readFileSync(path.resolve(__dirname, 'case', key, 'README.md'), 'utf-8'))
                .toEqual(fs.readFileSync(path.resolve(__dirname, 'case', key, 'EXPECT.md'), 'utf-8'));
            });
        });

    });
});
