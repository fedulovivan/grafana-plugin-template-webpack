import { PanelCtrl } from 'grafana/app/plugins/sdk'; // will be resolved to app/plugins/sdk

import './css/panel.base.scss';
// Remove next imports if you don't need separate styles for light and dark themes
import './css/panel.dark.scss';
import './css/panel.light.scss';

import grafanaCoreModule from 'grafana/app/core/core_module';

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

// Remove up to here
// import Vue from 'vue/dist/vue.js'
// import wrap from '@vue/web-component-wrapper'
// coreModule.directive(name, [
//     'reactDirective',
//     reactDirective => {
//       return reactDirective(component, options);
//     },
//   ]);

class Hello extends PureComponent {
    constructor(...args) {
        super(...args);
        console.log('Hello constructor');
    }
    handleTitleChange = (e) => {
        const { value } = e.target;
        this.props.onChangeTitle({ value });
    }
    render() {
        console.log('Hello render');
        const {
            color,
            title,
            onChangeTitle,
        } = this.props;
        return (
            <div>
                Hallo {this.props.toWhat} from React
                <br/>
                <br/>
                <div style={{ color }}>react: {color}</div>
                <input style={{ width: 300 }} type="text" value={title} onChange={this.handleTitleChange} />
            </div>
        );
        // with passed json {JSON.stringify(this.props.anydata)}
    }
}

const panelDefaults = {
    ivanfSettings: {
        color: "green"
    }
}

grafanaCoreModule.directive("reactDirective", function() {
  return {
    scope: {
        color: '=',
        title: '=',
        onChangeTitle: '&',
    },
    link: function($scope, el, attrs) {

        //   scope.newItem = value => {
        //     alert(value);
        //   };
        // console.log("$scope.paneltitle", $scope.paneltitle);
        // console.log({ attrs });
        // console.log({ $scope, attrs });

        // ReactDOM.render(
        //     <Hello toWhat="React inside angular 1.6" anydata={$scope.anydata} color={$scope.color} />,
        //     el[0],
        // );

      $scope.$watchGroup(
        ['color', 'title', 'onChangeTitle'],
        function(/* newValue, oldValue */) {
            ReactDOM.render(
                <Hello
                    toWhat="React inside angular 1.6"
                    color={$scope.color}
                    title={$scope.title}
                    onChangeTitle={$scope.onChangeTitle}
                />,
                el[0],
            );
            // anydata={$scope.anydata}
    // console.log({ newValue, oldValue });
    //       if (angular.isDefined(newValue)) {
    //         ReactDOM.render(
    //           <Hello toWhat="React inside angular 1.6" />,
    //           mountpoint
    //         );
    //       }
        },
        // true
      );

    }
  };
});

class Ctrl extends PanelCtrl {

    constructor($scope, $injector) {

        super($scope, $injector);

        _.defaultsDeep(this.panel, panelDefaults);

        $scope.onChangeTitle = (changedTitle) => {
            $scope.ctrl.panel.title = changedTitle;
            $scope.$apply();
        }

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

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

    }

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

Ctrl.templateUrl = 'partials/template.html';

export { Ctrl as PanelCtrl }
