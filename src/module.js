import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import grafanaCoreModule from 'grafana/app/core/core_module';
import './css/panel.base.scss';
import './css/panel.dark.scss';
import './css/panel.light.scss';

import helloReactDirective from './helloReactDirective';

const panelDefaults = {
    ivanfSettings: {
        color: "green"
    }
}

grafanaCoreModule.directive("reactDirective", helloReactDirective);

class HelloCtrl extends MetricsPanelCtrl {

    static templateUrl = 'partials/template.html';

    constructor($scope, $injector) {

        super($scope, $injector);

        _.defaultsDeep(this.panel, panelDefaults);

        $scope.onChangeTitle = (changedTitle) => {
            $scope.ctrl.panel.title = changedTitle;
            $scope.$apply();
        }

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

        this.events.on('data-received', this.onDataReceived.bind(this));

    }

    onDataReceived(queriesData) {
        this.queriesData = queriesData;
    }

    onInitEditMode() {
        this.addEditorTab('Ivanf', 'public/plugins/grafana-plugin-template-webpack/partials/editor.html', 2);
    }

    get panelPath() {
        if (this._panelPath === undefined) {
            this._panelPath = `/public/plugins/${this.pluginId}/`;
        }
        return this._panelPath;
    }

}

export { HelloCtrl as PanelCtrl }

// HelloCtrl.templateUrl = 'partials/template.html';
// import { PanelCtrl } from 'grafana/app/plugins/sdk'; // will be resolved to app/plugins/sdk
// import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
// import Hello from './Hello';
// Remove up to here
// Remove next imports if you don't need separate styles for light and dark themes
// import Vue from 'vue/dist/vue.js'
// import wrap from '@vue/web-component-wrapper'
// coreModule.directive(name, [
//     'reactDirective',
//     reactDirective => {
//       return reactDirective(component, options);
//     },
//   ]);
// grafanaCoreModule.directive("reactDirective", function() {
//   return {
//     scope: {
//         color: '=',
//         title: '=',
//         queriesData: '=',
//         onChangeTitle: '&',
//     },
//     link: function($scope, el, attrs) {

//         //   scope.newItem = value => {
//         //     alert(value);
//         //   };
//         // console.log("$scope.paneltitle", $scope.paneltitle);
//         // console.log({ attrs });
//         // console.log({ $scope, attrs });

//         // ReactDOM.render(
//         //     <Hello toWhat="React inside angular 1.6" anydata={$scope.anydata} color={$scope.color} />,
//         //     el[0],
//         // );

//       $scope.$watchGroup(
//         ['color', 'title', 'onChangeTitle', 'queriesData'],
//         function(/* newValue, oldValue */) {
//             ReactDOM.render(
//                 <Hello
//                     toWhat="React inside angular 1.6"
//                     color={$scope.color}
//                     title={$scope.title}
//                     onChangeTitle={$scope.onChangeTitle}
//                     queriesData={$scope.queriesData}
//                 />,
//                 el[0],
//             );
//             // anydata={$scope.anydata}
//     // console.log({ newValue, oldValue });
//     //       if (angular.isDefined(newValue)) {
//     //         ReactDOM.render(
//     //           <Hello toWhat="React inside angular 1.6" />,
//     //           mountpoint
//     //         );
//     //       }
//         },
//         // true
//       );

//     }
//   };
// });
// class Ctrl extends PanelCtrl {
// //can be used to add tabs when editing a panel
// this.events.on('init-edit-mode', (...all) => console.log('init-edit-mode', ...all));

// //can be used for clean up
// this.events.on('panel-teardown', (...all) => console.log('panel-teardown', ...all));

// //is an event in that is triggered on data refresh and can be hooked into
// this.events.on('data-received', (...all) => console.log('data-received', ...all));

// //is an event triggered to load data when in snapshot mode.
// this.events.on('data-snapshot-load', (...all) => console.log('data-snapshot-load', ...all));

// //is used to handle errors on dashboard refresh.
// this.events.on('data-error', (...all) => console.log('data-error', ...all));

//   // 1 vue
//   const VueEl = {
//       data: function() {
//         return {
//             counter: 0
//         };
//       },
//       methods: {
//           increment: function () {
//               this.counter++;
//           },
//       },
//       template: `<div><span style="color:red">hey from vue!</span><button @click="increment()">click me</button>{{ counter }}</div>`
//   }
//   const CustomElement = wrap(Vue, VueEl);
//   window.customElements.define('my-element', CustomElement);

// 2 react
// class CustomHelloEl extends HTMLElement {
//     attributeChangedCallback(name, oldValue, newValue) {
//         console.log({ name, oldValue, newValue });
//     }
//     connectedCallback() {
//         const mountPoint = document.createElement('div');
//         this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
//         ReactDOM.render(
//             React.createElement(Hello, { toWhat: 'World' }, null),
//             mountPoint
//         );
//     }
// }
// customElements.define('my-element', CustomHelloEl);

// 3 vanilla
// class MyEl extends HTMLElement {
//   constructor() {
//     super();
//     this.innerHTML = 'hey!';
//   }
// };
// window.customElements.define('my-element', MyEl);

// link(scope, element) {
//     this.initStyles();
// }

// initStyles() {
//     window.System.import(this.panelPath + 'css/panel.base.css!');
//     // Remove next lines if you don't need separate styles for light and dark themes
//     if (grafanaBootData.user.lightTheme) {
//         window.System.import(this.panelPath + 'css/panel.light.css!');
//     } else {
//         window.System.import(this.panelPath + 'css/panel.dark.css!');
//     }
//     // Remove up to here
// }
// console.log(this.data);
// console.log(data);
// console.log(data2);
