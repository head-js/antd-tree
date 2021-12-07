import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spin from 'antd/lib/spin';
import Menu from './antd-lib-menu/Index.jsx';
import calMarginBottom from './calMarginBottom';
import splitNs from './splitNs';


const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


function recursive(node, parentKeyPath, onTitleClick) {
  if (node.children.length > 0) {
    const keyPath = [node.id].concat(parentKeyPath);
    // console.log(parentKeyPath, keyPath);
    return <SubMenu key={node.id} title={node.label} onTitleClick={() => onTitleClick(keyPath)}>{node.children.map(c => recursive(c, keyPath, onTitleClick))}</SubMenu>;
  } else {
    return <MenuItem key={node.id} className={node.className}>{node.label}</MenuItem>;
  }
}


class Tree extends Component {
  // static propTypes = {
  //   dataSource: PropTypes.arrayOf(@head/TreeNode),
  //   loading: PropTypes.bool,
  //   mode: PropTypes.string,
  //   prefix: PropTypes.string.required,
  //   postfix: PropTypes.string,
  //   selectedKeys: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click(keyPath) {
    const { mode, prefix, postfix = '', push } = this.props;
    const pathname = (mode === 'ns') ? `${prefix}/${keyPath[0]}${postfix}` : `${prefix}/${keyPath.reverse()}${postfix}`;
    const location = { pathname };
    push(location);
  }

  render() {
    const { dataSource, loading, mode, width, className } = this.props;

    const selectedKeys = (mode === 'ns') // eslint-disable-line no-nested-ternary
      ? splitNs(this.props.selectedKeys)
      : (this.props.selectedKeys ? this.props.selectedKeys.split(',').reverse() : []);

    const marginBottom = calMarginBottom(dataSource, selectedKeys);

    const style = {
      width,
      marginBottom,
    };

    return (
      <Spin spinning={loading}>
        <Menu mode="vertical" selectedKeys={selectedKeys} openKeys={selectedKeys} onClick={({ keyPath }) => this.click(keyPath)} className={className || 'arknights-antd-tree'} style={style}>
          {dataSource.map(node => recursive(node, [], this.click))}
        </Menu>
      </Spin>
    );
  }
}


Tree.defaultProps = {
  mode: 'default',
  width: 160,
};


export default connect()(Tree);
