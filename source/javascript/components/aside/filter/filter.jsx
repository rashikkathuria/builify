import React from 'react';
import Icon from '../../shared/icon';
import _orderBy from 'lodash/orderby';
import _has from 'lodash/has';
import _map from 'lodash/map';
import _isNull from 'lodash/isnull';
import _filter from 'lodash/filter';
import classNames from '../../../common/classnames';
import { connect } from 'react-redux';
import { filterContentBlocks } from '../../../actions';

class Filter extends React.Component {
  static propTypes = {
    filterContentBlocksTarget: React.PropTypes.string.isRequired,
    blocks: React.PropTypes.array.isRequired,
    filterContentBlocks: React.PropTypes.func.isRequired
  };

  state = {
    isFilterOpened: false,
    activeTargetId: 0,
    target: null
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.isFilterOpened !== nextState.isFilterOpened) {
      return true;
    }

    return false;
  }

  toggleFilter () {
    this.setState({
      isFilterOpened: !this.state.isFilterOpened
    });
  }

  renderFilterItems () {
    const { filterContentBlocksTarget, blocks } = this.props;
    let items = [];

    _map(blocks, (block) => {
      const { type } = block;
      items.push({
        name: String(type).toLowerCase(),
        target: type
      });
    });

    items = _orderBy(items, ['name'], 'asc');

    let footerCopy = null;
    let navigationCopy = null;

    // Remove footer and header, 
    items = _filter(items, function (item) {
      if (item.name === 'footer') {
        footerCopy = item;
        return false;
      }

      if (item.name === 'navigation') {
        navigationCopy = item;
        return false;
      }

      return true;
    });

    // Add footer to the end of list.
    if (!_isNull(footerCopy)) {
      items.push(footerCopy);
    }

    // Add navigation to the start of the list.
    if (!_isNull(navigationCopy)) {
      items.push(navigationCopy);
    }
      
    // Add "Show All" to the start of the list.
    items.unshift({
      name: 'Show All'.toLowerCase(),
      target: 'all'
    });

    return (
      <ul>
        { _map(items, (item, i) => {
          const { name, target } = item;

          const itemClassName = classNames(null, {
             'active': target === filterContentBlocksTarget
          });

          return (
            <li
              key={'filterItem-' + i}
              onClick={(e) => {
                this.toggleFilter(e);
                return this.props.filterContentBlocks(target);
              }}
              className={itemClassName}>
              <span>{ name }</span>
            </li>
          );
        }) }
      </ul>
    );
  }

  render () {
    const { isFilterOpened } = this.state;
    const filterClassName = classNames('filter', {
      'active': isFilterOpened
    });

    return (
      <div className={filterClassName}>
        <div className={classNames('filter__text')} onClick={::this.toggleFilter}>
          <span>Filter</span>
          <Icon icon={isFilterOpened ? 'expand-less' : 'expand-more'} size='24' />
        </div>
        <div className={classNames('filter__items')}>
          { this.renderFilterItems() }
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { template, builder } = state;
  const { filterContentBlocksTarget } = builder;
  const { blocks } = template;

  return {
    filterContentBlocksTarget: filterContentBlocksTarget,
    blocks: blocks
  };
}

function mapDispatchToProps (dispatch) {
  return {
    filterContentBlocks: (target) => {
      dispatch(filterContentBlocks(target));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter);