import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepoTrafficViewsHistogramChart from './charts/RepoTrafficViewsHistogramChart'
import RepoTrafficViewsLineChart from './charts/RepoTrafficViewsLineChart'
import { TrapApiError, Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'
import GithubIcon from 'react-icons/lib/fa/github-alt'

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

var SingleGraphComponent = (function (_Component) {
  _inherits(SingleGraphComponent, _Component)

  function SingleGraphComponent () {
    _classCallCheck(this, SingleGraphComponent)

    return _possibleConstructorReturn(this, _Component.apply(this, arguments))
  }

  SingleGraphComponent.getApiRequest = function getApiRequest (params) {
    // var metric = _ref.metric

    return {
      id: 'jsongraph.singleGraph.' + params.metric,
      params: { metric: params.metric, filePath: params.filePath }
    }
  }

  SingleGraphComponent.prototype.render = function render () {
    var _props = this.props
    var repository = _props.repository
    var type = _props.type
    var apiData = _props.apiData
    console.log('apiData', apiData)
    var apiError = _props.apiError
    var theme = _props.theme

    var countNode = null
    var body = null

    if (apiData !== undefined) {
      var count = apiData.count
      var uniques = apiData.uniques
      var views = apiData.views

      countNode = React.createElement(
        'span',
        null,
        count,
        ' views - ',
        uniques,
        ' unique visitors'
      )

      if (type === 'histogram') {
        var chartData = views.map(function (_ref2) {
          var timestamp = _ref2.timestamp
          var uniques = _ref2.uniques
          var count = _ref2.count
          return {
            timestamp: timestamp,
            uniques: uniques,
            others: count - uniques
          }
        })

        body = React.createElement(RepoTrafficViewsHistogramChart, { theme: theme, views: chartData })
      } else if (type === 'line') {
        console.log('3')
        var _chartData = [{
          id: 'total',
          data: views.map(function (view) {
            return {
              y: view.value,
              x: view.timestamp
            }
          })
        }]
        console.log('4')
        body = React.createElement(RepoTrafficViewsLineChart, { theme: theme, views: _chartData })
      }
    }

    return React.createElement(
      Widget,
      null,
      React.createElement(WidgetHeader, {
        title: 'Visitors',
        subject: repository,
        count: countNode,
        icon: GithubIcon
      }),
      React.createElement(
        WidgetBody,
        { style: { overflowY: 'hidden' } },
        React.createElement(
          TrapApiError,
          { error: apiError },
          body
        )
      )
    )
  }

  return SingleGraphComponent
}(Component))

SingleGraphComponent.propTypes = {
  repository: PropTypes.string.isRequired,
  title: PropTypes.string,
  apiData: PropTypes.any,
  apiError: PropTypes.object,
  type: PropTypes.oneOf(['histogram', 'line']).isRequired,
  theme: PropTypes.object.isRequired
}
export default SingleGraphComponent
