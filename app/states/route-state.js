import Ember from 'ember';

const MyStateObject = Ember.Object.extend();

MyStateObject.reopenClass({
  queryParams: ['category'],

  initialState(instance) {
    return {
      query: null
    };
  }
});

export default MyStateObject;
