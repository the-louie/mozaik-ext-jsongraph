'use strict';

// var request = require('request-promise-native')
// var chalk = require('chalk')

var config = require('./config');
var fs = require('fs-extra');
/*
// https://developer.github.com/v3/#user-agent-required
var userAgent = '@mozaik/ext-github';
var previewAcceptHeader = 'application/vnd.github.spiderman-preview';
*/
/**
 * @param {Mozaik} mozaik
 */
var client = function client (mozaik) {
  mozaik.loadApiConfig(config)

  // var buildApiRequest = function buildApiRequest(path, params) {
  //   var url = config.get('github.baseUrl');

  //   var options = {
  //       uri: '' + url + path,
  //       qs: {},
  //       json: true,
  //       resolveWithFullResponse: true,
  //       headers: {
  //           'User-Agent': userAgent,
  //           Accept: previewAcceptHeader
  //       }
  //   };

  //   var paramsDebug = params ? ' ' + JSON.stringify(params) : '';
  //   mozaik.logger.info(chalk.yellow('[jsongraph] calling ' + url + path + paramsDebug));

  //   if (params) {
  //       options.qs = params;
  //   }

  //   if (config.get('github.token') !== '') {
  //       options.headers.Authorization = 'token ' + config.get('github.token');
  //   }

  //   return request(options);
  //   return undefined
  // }

  // var _repositoryCommits = function _repositoryCommits(params, buffer) {
  //   return buildApiRequest('/repos/' + params.repository + '/commits', params).then(function (res) {
  //     buffer.commits = buffer.commits.concat(res.body);

  //     // checks if there's an available next page in response link http header
  //     if (res.headers.link && /&page=(\d+)> rel="next"/.test(res.headers.link) === true && buffer.commits.length < buffer.max) {
  //       buffer.page = Number(/&page=(\d+)> rel="next"/.exec(res.headers.link)[1]);

  //       return _repositoryCommits(params, buffer);
  //     } else {
  //       return buffer.commits;
  //     }
  //   });
  // };

  var apiCalls = {

    //   organization: function organization(_ref) {
    //     var _organization = _ref.organization;

    //     return buildApiRequest('/orgs/' + _organization).then(function (res) {
    //       return res.body;
    //     });
    //   },
    //   user: function user(_ref2) {
    //     var _user = _ref2.user;

    //     return buildApiRequest('/users/' + _user).then(function (_ref3) {
    //       var body = _ref3.body;
    //       return body;
    //     });
    //   },
    //   repository: function repository(_ref4) {
    //     var _repository = _ref4.repository;

    //     return buildApiRequest('/repos/' + _repository).then(function (_ref5) {
    //       var body = _ref5.body;
    //       return body;
    //     });
    //   },
    //   pullRequests: function pullRequests(_ref6) {
    //     var repository = _ref6.repository;

    //     return buildApiRequest('/repos/' + repository + '/pulls').then(function (_ref7) {
    //       var pullRequests = _ref7.body;
    //       return {
    //         pullRequests: pullRequests
    //       };
    //     });
    //   },
    //   repositoryParticipationStats: function repositoryParticipationStats(_ref8) {
    //     var repository = _ref8.repository;

    //     return buildApiRequest('/repos/' + repository + '/stats/participation').then(function (_ref9) {
    //       var body = _ref9.body;
    //       return body;
    //     });
    //   },
    //   repositoryLanguages: function repositoryLanguages(_ref10) {
    //     var repository = _ref10.repository;

    //     return buildApiRequest('/repos/' + repository + '/languages').then(function (_ref11) {
    //       var body = _ref11.body;
    //       return body;
    //     });
    //   },

    //   // Be warned that this API call can be heavy enough
    //   // because it loads each branch details with an extra call
    //   branches: function branches(params) {
    //     return buildApiRequest('/repos/' + params.repository + '/branches').then(function (res) {
    //       return Promise.all(res.body.map(function (branch) {
    //         return apiCalls.branch(Object.assign({ branch: branch.name }, params));
    //       }));
    //     }).then(function (branches) {
    //       return { branches: branches };
    //     });
    //   },
    //   branch: function branch(_ref12) {
    //     var repository = _ref12.repository,
    //       _branch = _ref12.branch;

    //     return buildApiRequest('/repos/' + repository + '/branches/' + _branch).then(function (_ref13) {
    //       var body = _ref13.body;
    //       return body;
    //     });
    //   },
    //   repositoryContributorsStats: function repositoryContributorsStats(_ref14) {
    //     var repository = _ref14.repository;

    //     return buildApiRequest('/repos/' + repository + '/stats/contributors').then(function (res) {
    //       return {
    //         contributors: res.body
    //       };
    //     });
    //   },
    //   repoCommitActivity: function repoCommitActivity(_ref15) {
    //     var repository = _ref15.repository;

    //     return buildApiRequest('/repos/' + repository + '/stats/commit_activity').then(function (res) {
    //       return {
    //         buckets: res.body
    //       };
    //     });
    //   },
    //   repositoryCommits: function repositoryCommits(params) {
    //     return _repositoryCommits(params, {
    //       commits: [],
    //       page: 1,
    //       max: 1000
    //     });
    //   },
    //   issues: function issues(_ref16) {
    //     var repository = _ref16.repository;

    //     return buildApiRequest('/repos/' + repository + '/issues').then(function (_ref17) {
    //       var body = _ref17.body;
    //       return body;
    //     });
    //   },

    //   // Be warned that this API call can be heavy enough
    //   // because it fetch all the issues for each labels
    //   issueLabelsAggregations: function issueLabelsAggregations(params) {
    //     params.labels.forEach(function (label) {
    //       label.count = 0;
    //     });

    //     return Promise.all(params.labels.map(function (label) {
    //       return buildApiRequest('/repos/' + params.repository + '/issues', {
    //         labels: label.name,
    //         state: 'open',
    //         filter: 'all'
    //       }).then(function (res) {
    //         label.count = res.body.length;

    //         return label;
    //       });
    //     }));
    //   },
    //   status: function status() {
    //     var url = 'https://status.github.com/api/last-message.json';
    //     var req = request.get(url);

    //     mozaik.logger.info(chalk.yellow('[github] calling ' + url));

    //     return req.promise().then(function (res) {
    //       return res.body;
    //     });
    //   },
    graph: ({ title, fileName, filePath }) => {
      console.log('fileName', fileName)
      console.log('filePath', filePath)
      console.log('widgetTitle', title)
      return fs.readJson(`${filePath}${fileName}`).then(data => {
        return data
        // return {
        //   widgetTitle: title,
        //   totalCount: data.totalCount,
        //   graphData: data.graphData
        // }
      }).catch(err => {
        console.error(err)
      })
    }
    // singleGraph: ({ metric, filePath }) => {
    //   console.log('metric', metric)
    //   console.log('filePath', filePath)
    //   return fs.readJson(`${filePath}${metric}-20180616-1831.json`).then(data => {
    //     return {
    //       totalCount: data.totalCount,
    //       graphData: data.graphData
    //     }
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // }
    //   trafficClones: function trafficClones(_ref20) {
    //     var repository = _ref20.repository;

    //     return buildApiRequest('/repos/' + repository + '/traffic/clones').then(function (_ref21) {
    //       var body = _ref21.body;
    //       return body;
    //     });
    //   }
  };

  return apiCalls;
};

module.exports = client;