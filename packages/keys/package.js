Package.describe({
  name: 'letoribo:keys',
  summary: 'Creates collection of mappings between computer keyboard keys and different musical scales',
  version: '0.0.2',
  git: 'https://github.com/letoribo/Keys'
});

Package.onUse(function(api) {
  api.use('mongo', ['client', 'server']);
  api.addFiles('scales.js');
  api.addFiles('keys.js', 'client');
  api.export(['Scales','Keys','keys','_keys'], ['web.browser', 'server']);
});
