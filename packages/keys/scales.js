Scales = new Mongo.Collection('scales');
Keys = new Mongo.Collection('keys');
scales = ['natural major,ionian','natural minor,aeolian,algerian','harmonic minor','harmonic major,ethiopian','double harmonic major','double harmonic minor','neapolitan major',
'neapolitan minor','six tone symmetrical','tritone','2 semitone tritone','slendro,salendro','pentatonic major','pentatonic minor','spanish,jewish,phrygian major',
'spanish 8 tone','flamenco','chromatic','nine tone','enigmatic','diminished','inverted diminished,diminished blues,symmetrical','half diminished','whole tone','leading whole tone',
'augmented','altered','overtone,acoustic','prometheus','prometheus neapolitan','dorian','ukrainian dorian','phrygian','lydian minor','lydian dominant',
'lydian','lydian augmented','mixolydian,dominant 7th','mixolydian augmented','locrian','locrian natural','locrian major','locrian ultra','locrian super,whole tone diminished',
'hungarian major','hungarian minor,egyptian','romanian','gypsy','persian','oriental','hindu,adonai malakh','indian','byzantine,chahargah,arabian','marva',
'mohammedan','pD','pE,balinese','pC,pG,pF,chinese,mongolian','pA,hirajoshi','pB','chinese 2','javanese','todi','pelog','iwato','japanese,kumoi','blues',
'bluesy','harmonics','bebop major','bebop minor','bebop tonic minor','bebop dominant','bebop dominant flatnine','3 semitone','4 semitone'];
if (Meteor.isServer) {
  Meteor.publish('scales', function() {
    return Scales.find();
  });
  Meteor.publish('keys', function() {
    return Keys.find();
  });
    
  Meteor.startup(function() {
    if (Scales.find().count() > 0 || Keys.find().count() > 0) {
      return;
    }

    console.log('Initializing Scales');
    var ID = 0;

    for (var key in scales) {
      var scale = scales[key]; console.log(scale);
      ID ++;
      Scales.insert({
        _id: ID.toString(),
        scale: scale
      });
    }
    console.log('Initialized ' + Scales.find().count() + 'Scales');
    
    keys = {
      b: [22,'|',25,27,'|',30,32,34,'|',37,39,'|',42,44,46,'|',49,51,'|',54,56,58,'|',61,63,'|',66,68,70,'|',73,75,'|',78,80,82,'|',85,87,'|',90,92,94,'|',97],
      w: [21,23,24,26,28,29,31,33,35,36,38,40,41,43,45,47,48,50,52,53,55,57,59,60,62,64,65,67,69,71,72,74,76,77,79,81,83,84,86,88,89,91,93,95,96,98]
    };  
    
    for (var key in keys.b) {
      var b = keys.b[key]; console.log(b);

      Keys.insert({
        notes: 'black',
        id: b
      });
    }
    for (var key in keys.w) {
      var w = keys.w[key]; console.log(w);

      Keys.insert({
        notes: 'white',
        id: w
      });
    }    
    console.log('Initialized Keys');
    
  });
}
