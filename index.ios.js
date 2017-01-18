// -*- mode: jsx -*-
'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Navigator,
  InteractionManager,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class LeftButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.navBarLeftButton}
      >
        <Icon name="ios-arrow-back" style={[styles.navBarButtonText, styles.navBarBackIcon]} />
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    )
  }
}

class RightButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={styles.navBarRightButton}
      >
        <Text style={[styles.navBarText, styles.navBarButtonText, (this.props.disabled ? styles.disabled : null)]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    )
  }
}

const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (typeof route.leftElement !== 'undefined') {
      return route.leftElement
    }

    // Manually set
    if (route.leftButtonText || route.leftButtonIcon) {
      return (
        <LeftButton onPress={route.onPressLeftButton}>
          { route.lefttButtonIcon
            ? <Icon name={route.leftButtonIcon} size={24} />
            : ' ' + route.leftButtonText
          }
        </LeftButton>
      )
    }

    // First route or manually disabled
    if (index === 0) {
      return null
    }

    // Default: use previous
    let previousRoute = navState.routeStack[index - 1]
    return (
      <LeftButton onPress={() => {navigator.popToRoute(previousRoute)}}>
       { ' ' + previousRoute.title}
      </LeftButton>
    )
  },

  RightButton: function(route, navigator, index, navState) {
    if (typeof route.rightElement !== 'undefined') {
      return route.rightElement
    }

    if (route.rightButtonIcon || route.rightButtonText) {
      return (
        <RightButton onPress={route.onPressRightButton}>
          { route.rightButtonIcon
            ? <Icon name={route.rightButtonIcon} size={24} />
            : route.rightButtonText
          }
        </RightButton>
      )
    }
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    )
  },

}

/* Route options:
 * component
 * passProps
 * title
 * appearFrom ['bottom', 'left']
 *** Left button options
 * leftElement
 * leftButtonText
 * leftButtonIcon
 * onPressLeftButton
 *** Right button options
 * rightElement
 * rightButtonText
 * rightButtonIcon
 * onPressRightButton
*/

class Navigation extends Component {
  renderScene(route, navigator) {
    this.props.expandRoute && this.props.expandRoute(route, navigator)
    return <route.component ref={(elem) => {route.ref = elem}} route={route} navigator={navigator} style={{flex: 1}} {...route.passProps} />
  }

  configureScene(route) {
    switch (route.appearFrom) {
    case 'left':
      return Navigator.SceneConfigs.FloatFromLeft
    case 'bottom':
      return Navigator.SceneConfigs.FloatFromBottom
    default:
      return Navigator.SceneConfigs.PushFromRight
    }
  }

  onDidFocus(route) {
    // Allow the route to listen to check if it's active
    route.ref.onActiveRoute && route.ref.onActiveRoute()
  }

  render() {
    return (
       <Navigator ref="nav"
         {...this.props}
         onDidFocus={this.onDidFocus.bind(this)}
         renderScene={this.renderScene.bind(this)}
         configureScene={this.configureScene.bind(this)}
         sceneStyle={styles.scene}
         navigationBar={this.props.hideNavBar ? null : <Navigator.NavigationBar style={styles.navBar}
           routeMapper={NavigationBarRouteMapper}
           />}
       />
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#F7F7F7',
    borderBottomColor: '#CECED2',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: 'bold',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarBackIcon: {
    fontSize: 30,
    marginTop: 2,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
  disabled: {
    color: "black",
    opacity: 0.6,
  },
  scene: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 64,
    backgroundColor: '#EFEFF4',
  },
})

export default Navigation
export {LeftButton, RightButton, styles}
