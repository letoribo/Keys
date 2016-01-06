if (Meteor.isClient) {
  Meteor.startup(function() {
    steps = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) ? _keys : keys;
    Meteor.subscribe('scales');    
    Meteor.subscribe('keys');    
  }); 

  function message(x, y, z){
    JZZ().openMidiOut().send([x, y, z])
  };
  function exe(some, x, y, z){
    some(x, y, z);
  };

  Session.setDefault('current_scale', 0);
  Session.setDefault('playing', []);
  Session.setDefault('Keys', []);

  keyAllowed = {};
  document.onkeydown = function(e){ 
    if (keyAllowed [e.which] === false) return;
    keyAllowed [e.which] = false;
    var e = window.event || e;
    if (e.keyCode == 38){
      Object.keys(steps[Session.get('current_scale')]).map(function(value, index){
        steps[Session.get('current_scale')][value] ++;
        _Keys = []; 
      });
      highlight();
      exe(message, 0xb0, 120, 0);
    } 
    else if (e.keyCode == 40) {
      Object.keys(steps[Session.get('current_scale')]).map(function(value, index){
        steps[Session.get('current_scale')][value] --;
        _Keys = []; 
      })
      highlight();
      exe(message, 0xb0, 120, 0);
    }
    else Session.set('Keys', []);

    var key = steps[Session.get('current_scale')][e.keyCode];  
    if(key){
  	   notes = Session.get('playing');
   	notes.push(key);
  	   Session.set('playing', notes);
      exe(message, 0x90, key, 111);
    }
  };
  document.onkeyup = function(e){ 
    keyAllowed [e.which] = true;
    var e = window.event || e;
    var key = steps[Session.get('current_scale')][e.keyCode];
    if(key){
  	   notes.splice(notes.indexOf(key),1);
  	   Session.set('playing', notes);
      exe(message, 0x80, key, 0);
    }
  };

  var highlight = function() {
    $.each(steps[Session.get('current_scale')], function(k, v) {
      _Keys.push(v);      
    });
    Session.set('Keys', _Keys);
  };

  Template.hello.helpers({
    scales: function () {
      return Scales.find({});
    },
    playing: function () {
      return Session.get('playing');
    },
    color: function () {
    	 var color = 'border-left: 3px solid #'+(Math.random() * 0xFFFFFF << 0).toString(16);
      return color;
    }
  });

  Template.hello.events({
    'change select': function (e) {
    	var current_scale = parseInt($("select").val()) - 1;
      Session.set("current_scale", current_scale);
      _Keys = [];
      highlight();
      $('select').blur();
    }
  });
  
  Template.piano.helpers({
    ivory: function () {
      return Keys.find({notes: 'white'});
    },
    ebony: function () {
      return Keys.find({notes: {$ne: 'white'}});
    },
    break: function () {
      return this.id === '|';
    },
    isSelected: function () {
      var notes = Session.get('playing');
      if( notes.indexOf(this.id) > -1){
        return true;
      }
      return false;
    },
    isCol: function () {
      var notes = Session.get('Keys');
      if( notes.indexOf(this.id) > -1){
        return true;
      }
      return false;
    }
  });

}
