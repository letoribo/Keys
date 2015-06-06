Package.describe({
    name: 'letoribo:keys',
    summary: 'Creates collection of mappings between computer keyboard keys and different musical scales',
    version: '0.0.1',
    git: 'https://github.com/letoribo/Keys'
});

Package.onUse(function(api) {
    api.use('mongo', ['client', 'server']);
    api.addFiles('scales.js');
    api.addFiles('keys.js', 'client');
    api.export(['_Scales','_Keys','Scales','keys','_keys'], ['web.browser', 'server']);
});
