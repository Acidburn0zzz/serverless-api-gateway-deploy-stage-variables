'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _awsManager = require('./aws-manager');

var _awsManager2 = _interopRequireDefault(_awsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = new _awsManager2.default();

var StageVariables = function () {
  function StageVariables(serverless, options) {
    (0, _classCallCheck3.default)(this, StageVariables);

    this.options = options;
    this.serverless = serverless;

    this.commands = (0, _defineProperty3.default)({}, 'stage-variables', {
      usage: 'Deploy StageVariables to AWS API Gateway',
      lifecycleEvents: ['set']
    });
    this.hooks = {
      'stage-variables:set': this.setStageVariables.bind(this)
    };
  }

  (0, _createClass3.default)(StageVariables, [{
    key: 'setStageVariables',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var stage, apiId, stageVariables;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                stage = this.options.stage || this.serverless.variables.service.defaults.stage;

                if (!(!this.serverless.service.custom.apiGateway || !this.serverless.service.custom.apiGateway.apiId)) {
                  _context.next = 5;
                  break;
                }

                throw new Error('Please provide an api_id (serverless.yml)');

              case 5:
                if (this.serverless.service.custom.apiGateway.stageVariables) {
                  _context.next = 7;
                  break;
                }

                throw new Error('Please set the stage variables env variable');

              case 7:
                apiId = this.serverless.service.custom.apiGateway.apiId;
                stageVariables = JSON.parse(this.serverless.service.custom.apiGateway.stageVariables);
                _context.prev = 9;
                _context.next = 12;
                return manager.replaceStageVariables(apiId, stage, stageVariables);

              case 12:
                console.log('Successfuly deployed stage variables.');
                return _context.abrupt('return', true);

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](9);

                console.log('Error deploying stage variables :\n' + _context.t0);
                return _context.abrupt('return', false);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 16]]);
      }));

      function setStageVariables() {
        return _ref.apply(this, arguments);
      }

      return setStageVariables;
    }()
  }]);
  return StageVariables;
}();

exports.default = StageVariables;