import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello';
// import Hello from './Hello';

export default function reactDirective() {
    return {
        scope: {
            color: '=',
            title: '=',
            queriesData: '=',
            onChangeTitle: '&',
        },
        link: function ($scope, el, attrs) {
            $scope.$watchGroup(
                ['color', 'title', 'onChangeTitle', 'queriesData'],
                function (/* newValue, oldValue */) {
                    const {
                        color,
                        title,
                        onChangeTitle,
                        queriesData,
                    } = $scope;
                    ReactDOM.render(
                        <Hello
                            toWhat="React inside angular 1.6"
                            color={color}
                            title={title}
                            onChangeTitle={onChangeTitle}
                            queriesData={queriesData}
                        />,
                        el[0],
                    );
                },
            );

        }
    };
}

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
              // anydata={$scope.anydata}
      // console.log({ newValue, oldValue });
      //       if (angular.isDefined(newValue)) {
      //         ReactDOM.render(
      //           <Hello toWhat="React inside angular 1.6" />,
      //           mountpoint
      //         );
      //       }