Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { /*return Meteor.subscribe('Zones');*/ }
});

Router.route('/', {name: 'layout'});
//Router.route('/home', {name: 'main'});
