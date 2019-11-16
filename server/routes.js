/**
 * Main application routes
 */

import errors from './components/errors';

export default function(app) {
    // Insert routes below
    app.use('/api/questions', require('./api/question'));
    app.use('/api/things', require('./api/thing'));

    // All undefined asset or api routes should return a 404
    app.route('/*').get(errors[404]);
}
