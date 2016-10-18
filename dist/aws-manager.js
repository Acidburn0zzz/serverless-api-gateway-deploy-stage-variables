'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({
  region: 'eu-central-1'
});

var APIGatewayManager = function () {
  function APIGatewayManager() {
    (0, _classCallCheck3.default)(this, APIGatewayManager);

    this.APIGateway = new _awsSdk2.default.APIGateway();
  }

  (0, _createClass3.default)(APIGatewayManager, [{
    key: 'getStage',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(restApiId, stageName) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  return _this.APIGateway.getStage({
                    restApiId: restApiId,
                    stageName: stageName
                  }, function (err, data) {
                    return err ? reject(err) : resolve(data);
                  });
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getStage(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getStage;
    }()
  }, {
    key: 'updateStage',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(restApiId, stageName, params) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new _promise2.default(function (resolve, reject) {
                  return _this2.APIGateway.updateStage({
                    restApiId: restApiId,
                    stageName: stageName,
                    patchOperations: params
                  }, function (err, data) {
                    return err ? reject(err) : resolve(data);
                  });
                });

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateStage(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return updateStage;
    }()
  }, {
    key: 'replaceStageVariables',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(restApiId, stageName, obj) {
        var stage, old, params;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getStage(restApiId, stageName);

              case 2:
                stage = _context3.sent;

                if (!stage.variables) {
                  _context3.next = 8;
                  break;
                }

                old = (0, _keys2.default)(stage.variables).map(function (key) {
                  return {
                    op: 'remove',
                    path: '/variables/' + key,
                    value: stage.variables[key]
                  };
                }).filter(function (elem) {
                  return elem.path !== '/variables/stage_alias';
                });

                if (!old.length) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 8;
                return this.updateStage(restApiId, stageName, old);

              case 8:
                params = (0, _keys2.default)(obj).map(function (key) {
                  return {
                    op: 'replace',
                    path: '/variables/' + key,
                    value: obj[key]
                  };
                });
                return _context3.abrupt('return', this.updateStage(restApiId, stageName, params));

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function replaceStageVariables(_x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
      }

      return replaceStageVariables;
    }()
  }]);
  return APIGatewayManager;
}();

exports.default = APIGatewayManager;