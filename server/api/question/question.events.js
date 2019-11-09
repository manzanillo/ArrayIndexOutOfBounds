/**
 * Question model events
 */

import {EventEmitter} from 'events';
var QuestionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QuestionEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Question) {
  for(var e in events) {
    let event = events[e];
    Question.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    QuestionEvents.emit(event + ':' + doc._id, doc);
    QuestionEvents.emit(event, doc);
  };
}

export {registerEvents};
export default QuestionEvents;
