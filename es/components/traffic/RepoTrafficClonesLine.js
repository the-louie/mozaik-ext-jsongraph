var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

import React, { Component } from 'react';
import RepoTrafficClones from './RepoTrafficClones';

var RepoTrafficLineHistogram = function (_Component) {
    _inherits(RepoTrafficLineHistogram, _Component);

    function RepoTrafficLineHistogram() {
        _classCallCheck(this, RepoTrafficLineHistogram);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoTrafficLineHistogram.getApiRequest = function getApiRequest(params) {
        return RepoTrafficClones.getApiRequest(params);
    };

    RepoTrafficLineHistogram.prototype.render = function render() {
        return React.createElement(RepoTrafficClones, _extends({}, this.props, { type: 'line' }));
    };

    return RepoTrafficLineHistogram;
}(Component);

export default RepoTrafficLineHistogram;