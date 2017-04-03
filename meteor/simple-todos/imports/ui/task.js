
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

//import { Tasks } from '../api/tasks.js'; no longer necessary

import './task.html';

//added in pub/sub step
Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
     Meteor.call('tasks.setChecked', this._id, !this.checked);

    // Tasks.update(this._id, {         old way
    //   $set: { checked: ! this.checked },
    // });
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
    //Tasks.remove(this._id);       old way
  },
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});
