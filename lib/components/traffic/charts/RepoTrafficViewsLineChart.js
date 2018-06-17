import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ResponsiveLine } from 'nivo';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var margin = { top: 10, right: 20, bottom: 54, left: 60 };
var format = function format(d) {
  return moment(d).format('Ymd H:00');
};
var axisLeft = {
  legend: 'visitors',
  legendPosition: 'center',
  legendOffset: -40
};
var axisBottom = {
  format: format,
  tickRotation: -60
};

var RepoTrafficViewsLineChart = function (_Component) {
  _inherits(RepoTrafficViewsLineChart, _Component);

  function RepoTrafficViewsLineChart() {
    _classCallCheck(this, RepoTrafficViewsLineChart);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  RepoTrafficViewsLineChart.prototype.render = function render() {
    var _props = this.props;
    var views = _props.views;
    var theme = _props.theme;
    const options = {
      margin: margin,
      data: views,
      theme: theme.charts,
      stacked: _props.stacked || false,
      enableArea: _props.enableArea || false,
      areaOpacity: _props.areaOpacity || 0.2,
      animate: false,
      axisLeft: axisLeft,
      axisBottom: axisBottom,
      colors: theme.charts.colors,
      enableDots: _props.enableDots || false
    };
    console.log('ResponsiveLine options', options);
    return React.createElement(ResponsiveLine, options);
  };

  return RepoTrafficViewsLineChart;
}(Component);

RepoTrafficViewsLineChart.propTypes = {
  views: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};
export default RepoTrafficViewsLineChart;