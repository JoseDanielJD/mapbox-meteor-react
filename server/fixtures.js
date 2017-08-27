if (Zones.find().count() === 0) {
  ZonesNames.insert({name: 'zona 1'});
  Zones.insert({
    name: 'zona 1',
    lng: '42.77014494448193',
    lat: '-91.86996595764742'
  });

  ZonesNames.insert({name: 'zona 2'});
  Zones.insert({
    name: 'zona 2',
    lng: '40.39401123932825',
    lat: '-124.19127644615332'
  });

  ZonesNames.insert({name: 'zona 3'});
  Zones.insert({
    name: 'zona 3',
    lng: '154.77781593679703',
    lat: '59.13908292002358'
  });

  Calendars.insert({
    tittle:'Granja',
    Desc:'Esta es una descripcion',
    since:'05022013',
    until:'05022013',
    zones: 'Zona 1, granja de pedro, patio trigal'
  });

  //Calendars.insert({tittle:'Granja', Desc:'Esta es una descripcion',since:'05022013',until:'05022013',zones: 'Zona 1'});
}
