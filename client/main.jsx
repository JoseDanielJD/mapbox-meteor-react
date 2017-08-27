import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import AppSinApi from '../imports/ui/AppSinApi.jsx';

  var i = 1;

Meteor.startup(() => {
  render(<AppSinApi />, document.getElementById('map'));
});

Template.info.helpers({

});

Template.info.events({
  'click #newSchedule'(event, instance) {
    var selected = '';
    $('input[name="itemZonesCalendar"]:checked').each(function(){
      selected += $(this).val()+',';
    });
    newEvent = {tittle:$("#inTittle").val(), Desc:$("#inTextArea").val(),since:$("#inDateSince").val(),until:$("#inDateUntil").val(), zones: selected};
    console.log("Stored: ",newEvent);
    Calendars.insert({tittle:$("#inTittle").val(), Desc:$("#inTextArea").val(),since:$("#inDateSince").val(),until:$("#inDateUntil").val(), zones: selected});
    $('#mjs').append("<h5 style='background-color:beige;'>The new Schedule was stored</h5>")
    $("#mjs").show().delay(2000).fadeOut();
  },
  'click #calendar3'(event, instance) {
    var t = ZonesNames.find().forEach(function(item){
  		$('#zonesCalendar').append("<input type='checkbox' value='"+item.name.toString()+"' name='itemZonesCalendar'/>"+item.name+"<br />");
  	});
  },
  'click #mySchedule'(event, instance) {
    console.log("Calendars.find():",Calendars.find().count());
    var username = Meteor.user().emails[0].address;
    var t = Calendars.find().forEach(function(item){
      $('#calendarTable').append("<tr><td>"+i+"</td><td>"+item.tittle+"</td><td>"+item.Desc+"</td><td>"+item.since+"</td><td>"+item.until+"</td><td>"+item.zones+"</td></tr>");
      i++;
    });
  }
});
