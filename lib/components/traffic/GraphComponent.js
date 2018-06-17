import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepoTrafficViewsHistogramChart from './charts/RepoTrafficViewsHistogramChart';
import RepoTrafficViewsLineChart from './charts/RepoTrafficViewsLineChart';
import { TrapApiError, Widget, WidgetHeader, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt';

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

var GraphComponent = function (_Component) {
  _inherits(GraphComponent, _Component);

  function GraphComponent() {
    _classCallCheck(this, GraphComponent);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  GraphComponent.getApiRequest = function getApiRequest(params) {
    return {
      id: 'jsongraph.graph.' + params.title + '-' + params.fileName,
      params: params
      // params: { widgetTitle: params.title, fileName: params.fileName, filePath: params.filePath }
    };
  };

  GraphComponent.prototype.render = function render() {
    var _props = this.props;
    // var repository = _props.repository
    var widgetTitle = _props.widgetTitle;
    var type = _props.type;
    var apiData = _props.apiData;
    var apiError = _props.apiError;
    var theme = _props.theme;

    var countNode = null;
    var body = null;

    if (apiData !== undefined) {
      // var totalCount = apiData.totalCount
      // var graphData = apiData.graphData

      countNode = React.createElement('span', null, apiData.widgetTitle);

      if (type === 'histogram') {
        const keys = apiData.data.map(function (d) {
          return d.labelTitle;
        });
        const flattenDataTemp = apiData.data.reduce(function (a, c) {
          c.graphData.forEach(function (curr) {
            if (a[curr.timestamp] === undefined) {
              a[curr.timestamp] = {};
            }
            a[curr.timestamp][c.labelTitle] = curr.value;
          });
          return a;
        }, {});
        const flattenData = Object.keys(flattenDataTemp).reduce(function (acc, timestamp) {
          var b = { timestamp: timestamp };
          Object.keys(flattenDataTemp[timestamp]).forEach(function (d) {
            b[d] = flattenDataTemp[timestamp][d];
          });
          return acc.concat([b]);
        }, []);
        body = React.createElement(RepoTrafficViewsHistogramChart, { keys: keys, theme: theme, data: flattenData });
      } else if (type === 'line') {
        const _chartData = apiData.data.map(function (d) {
          return {
            id: d.labelTitle,
            data: d.graphData.map(function (data) {
              return { x: data.timestamp, y: data.value };
            })
          };
        });
        body = React.createElement(RepoTrafficViewsLineChart, {
          areaOpacity: 0.5,
          enableArea: true,
          stacked: true,
          theme: theme,
          views: _chartData,
          enableDots: false
        });
      }
    }

    return React.createElement(Widget, null, React.createElement(WidgetHeader, {
      title: widgetTitle,
      subject: widgetTitle,
      count: countNode,
      icon: GithubIcon
    }), React.createElement(WidgetBody, { style: { overflowY: 'hidden' } }, React.createElement(TrapApiError, { error: apiError }, body)));
  };

  return GraphComponent;
}(Component);

GraphComponent.propTypes = {
  repository: PropTypes.string.isRequired,
  title: PropTypes.string,
  apiData: PropTypes.any,
  apiError: PropTypes.object,
  type: PropTypes.oneOf(['histogram', 'line']).isRequired,
  theme: PropTypes.object.isRequired
};
export default GraphComponent;