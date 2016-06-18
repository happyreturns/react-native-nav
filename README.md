# react-native-nav
A "Batteries Included" wrapper for react-native's navigator


## Props

* expandRoute `function(route)` This optional function allows for the expansion of a simple route (like {id: "routeName"}) into something renderable (like {component: MyComponent, title: "Foo"}).  Mostly used to keep the various `push` calls from having to specify everything. Due to the internals of react-native, this function should (weirdly) modify the route object in place rather than return a new one.

Any additional prop passed to react-native-nav will be passed to the navigator, so those remain as normal.

## Route attributes

All attributes are optional except for `component`.

| Name | Type | Description |
| --- | --- | --- |
| component | React Native class | The class to render, not an element.  Should be something like `MyComponent`, NOT `<MyComponent />`. |
| passProps | Object | Any extra props that should be added to the component. |
| title | string | The title of the scene.  Will appear in the center of the nav bar, and then used as the previous button unless overridden. |
| appearFrom | string | Options are `bottom` or `left`.  If empty, the new scene will appear from the right. |
| leftElement | React Native element | The element to use for the left nav button. In most cases, this should be an instance of LeftButton. |
| leftButtonText | string | The text to display for the left nav button. Mutually exclusive with `leftButtonIcon`. |
| leftButtonIcon | string | The icon name from the ionicons of `react-native-vector-icons` to be used as the left nav button. Mutually exclusive with `leftButtonText`. |
| onPressLeftButton | function | Called when the left nav button is pressed. |
| rightElement | React Native element | The element to use for the right nav button. In most cases, this should be an instance of RightButton. |
| rightButtonText | string | The text to display for the right nav button. Mutually exclusive with `rightButtonIcon`. |
| rightButtonIcon | string | The icon name from the ionicons of `react-native-vector-icons` to be used as the right nav button. Mutually exclusive with `rightButtonText`. |
| onPressRightButton | function | Called when the right nav button is pressed. |

## Usage

```javascript

import React, { Component } from 'react'
import Navigation from 'react-native-nav'

class Welcome extends Component {
  render() { ... }
}

class Example extends Component {
  expandRoute(route) {
    if (route.id === 'welcome') {
      route.component = Welcome
    }
  }

  render() {
    return (
      <Navigation ref="nav"
        initialRoute={{
          id: 'Welcome',
        }}
        // Used to keep having to repeat common route information
        expandRoute={this.expandRoute}
        onWillFocus={function(route) {
          // Extra props will be passed to the navigator
          console.log(route)
        }}
       ></Navigation>
    )
  }
}

```


