/*! @arknights/antd-tree v0.2.0 (c) 2020 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var Spin = _interopDefault(require('antd/lib/spin'));
var RcMenu = require('rc-menu');
var RcMenu__default = _interopDefault(RcMenu);

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var MenuItem2 = function (_React$Component) {
  inherits(MenuItem2, _React$Component);

  function MenuItem2() {
    classCallCheck(this, MenuItem2);
    return possibleConstructorReturn(this, (MenuItem2.__proto__ || Object.getPrototypeOf(MenuItem2)).apply(this, arguments));
  }

  createClass(MenuItem2, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      return React__default.createElement(RcMenu.MenuItem, props);
    }
  }]);
  return MenuItem2;
}(React__default.Component);

MenuItem2.isMenuItem = 1;

var Menu = function (_React$Component) {
  inherits(Menu, _React$Component);

  // eslint-disable-line react/sort-comp

  function Menu(props) {
    classCallCheck(this, Menu);

    var _this = possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _initialiseProps.call(_this);

    var openKeys = void 0;
    if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    } else if ('openKeys' in props) {
      openKeys = props.openKeys;
    }

    _this.state = {
      openKeys: openKeys || []
    };
    return _this;
  }

  createClass(Menu, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('openKeys' in nextProps) {
        this.setState({ openKeys: nextProps.openKeys });
        // return;
      }
    }
  }, {
    key: 'setOpenKeys',
    value: function setOpenKeys(openKeys) {
      if (!('openKeys' in this.props)) {
        this.setState({ openKeys: openKeys });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          className = _props.className,
          theme = _props.theme;

      var menuMode = 'vertical';
      var menuOpenAnimation = '';

      var menuClassName = prefixCls + '-' + theme + ' ' + className;

      var menuProps = {
        openKeys: this.state.openKeys,
        onOpenChange: this.handleOpenChange,
        className: menuClassName,
        mode: menuMode
      };

      // closing vertical popup submenu after click it
      menuProps.onClick = this.handleClick;
      menuProps.openTransitionName = menuOpenAnimation;

      return React__default.createElement(RcMenu__default, _extends({}, this.props, menuProps));
    }
  }]);
  return Menu;
}(React__default.Component);

Menu.Item = MenuItem2;
Menu.SubMenu = RcMenu.SubMenu;
Menu.defaultProps = {
  prefixCls: 'ant-menu',
  className: '',
  theme: 'light' // or dark
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.inlineOpenKeys = [];

  this.handleClick = function (e) {
    _this2.handleOpenChange([]);

    var onClick = _this2.props.onClick;

    if (onClick) {
      onClick(e);
    }
  };

  this.handleOpenChange = function (openKeys) {
    _this2.setOpenKeys(openKeys);

    var onOpenChange = _this2.props.onOpenChange;

    if (onOpenChange) {
      onOpenChange(openKeys);
    }
  };
};

function calMarginBottom(tree, selectedKeys) {
  var MENU_HEIGHT = 42;

  var INITIAL_MARGIN = tree.length;

  var offsets = 0;
  var heights = [];

  var children = tree.map(function (t) {
    return t;
  });
  var ids = selectedKeys.map(function (k) {
    return k;
  }).reverse();
  var id = ids.shift();

  while (id) {
    var idx = children.findIndex(function (c) {
      return c.id === id;
    }); // eslint-disable-line no-loop-func
    if (idx < 0) {
      break;
    }

    offsets += idx;

    children = children[idx].children.map(function (t) {
      return t;
    });
    heights.push(offsets + children.length);

    id = ids.shift();
  }

  var margin = Math.max.apply(null, heights) - INITIAL_MARGIN;
  margin = margin >= 0 ? margin : 0;
  // console.log(offsets, heights, margin);

  return margin * MENU_HEIGHT;
}

function splitNs(org) {
  var ids = [];
  var ns = '';
  org.split('.').forEach(function (n) {
    if (ns === '') {
      ns += n;
    } else {
      ns += '.' + n; // eslint-disable-line prefer-template
    }
    ids.push(ns);
  });
  return ids;
}

var SubMenu$1 = Menu.SubMenu;
var MenuItem$1 = Menu.Item;

function recursive(node, parentKeyPath, _onTitleClick) {
  if (node.children.length > 0) {
    var keyPath = [node.id].concat(parentKeyPath);
    // console.log(parentKeyPath, keyPath);
    return React__default.createElement(
      SubMenu$1,
      { key: node.id, title: node.label, onTitleClick: function onTitleClick() {
          return _onTitleClick(keyPath);
        } },
      node.children.map(function (c) {
        return recursive(c, keyPath, _onTitleClick);
      })
    );
  } else {
    return React__default.createElement(
      MenuItem$1,
      { key: node.id, className: node.className },
      node.label
    );
  }
}

var Tree = function (_Component) {
  inherits(Tree, _Component);

  // static propTypes = {
  //   dataSource: PropTypes.arrayOf(@head/TreeNode),
  //   loading: PropTypes.bool,
  //   mode: PropTypes.string,
  //   prefix: PropTypes.string.required,
  //   postfix: PropTypes.string,
  //   selectedKeys: PropTypes.string,
  // };

  function Tree(props) {
    classCallCheck(this, Tree);

    var _this = possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

    _this.click = _this.click.bind(_this);
    return _this;
  }

  createClass(Tree, [{
    key: 'click',
    value: function click(keyPath) {
      var _props = this.props,
          mode = _props.mode,
          prefix = _props.prefix,
          _props$postfix = _props.postfix,
          postfix = _props$postfix === undefined ? '' : _props$postfix,
          push = _props.push;

      var pathname = mode === 'ns' ? prefix + '/' + keyPath[0] + postfix : prefix + '/' + keyPath.reverse() + postfix;
      var location = { pathname: pathname };
      push(location);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          dataSource = _props2.dataSource,
          loading = _props2.loading,
          mode = _props2.mode,
          width = _props2.width,
          className = _props2.className;


      var selectedKeys = mode === 'ns' ? // eslint-disable-line no-nested-ternary
      splitNs(this.props.selectedKeys) : this.props.selectedKeys ? this.props.selectedKeys.split(',').reverse() : [];

      var marginBottom = calMarginBottom(dataSource, selectedKeys);

      var style = {
        width: width,
        marginBottom: marginBottom
      };

      return React__default.createElement(
        Spin,
        { spinning: loading },
        React__default.createElement(
          Menu,
          { mode: 'vertical', selectedKeys: selectedKeys, openKeys: selectedKeys, onClick: function onClick(_ref) {
              var keyPath = _ref.keyPath;
              return _this2.click(keyPath);
            }, className: className || 'arknights-antd-tree', style: style },
          dataSource.map(function (node) {
            return recursive(node, [], _this2.click);
          })
        )
      );
    }
  }]);
  return Tree;
}(React.Component);

Tree.defaultProps = {
  mode: 'default',
  width: 160
};

var Tree$1 = reactRedux.connect()(Tree);

module.exports = Tree$1;
