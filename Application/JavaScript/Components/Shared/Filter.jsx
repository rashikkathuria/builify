import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterContentBlocks } from '../../Actions/ActionCreators';
import _ from 'lodash';
import cx from 'classnames';

class Filter extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isFilterOpened: false,
      activeTargetId: 0,
      target: null
    };
  }

  filterEvent (e) {
    e.preventDefault();

    this.setState({
      isFilterOpened: !this.state.isFilterOpened
    });
  }

  renderFilterItems () {
    const { theme, builder, onFilterItemSelection } = this.props;
    const { filterContentBlocksTarget } = builder;
    let items = [{
      name: 'Show All',
      target: 'all'
    }];

    if (_.has(theme, 'blocks')) {
      const { blocks } = theme;

      _.map(blocks, (block) => {
        const { type } = block;
        items.push({
          name: String(type),
          target: type
        });
      });

      items = _.sortByOrder(items, ['name'], 'asc');

      return (
        <ul>
          {_.map(items, (item, i) => {
            const { name, target } = item;
            let isActive = false;

            if (_.has(item, 'active')) {
              if (item.active) {
                isActive = true;
              }
            }

            const itemClassName = cx(target == filterContentBlocksTarget ? 'active' : '');

            return (
              <li
                key={'filterItem-' + i}
                onClick={(e) => {
                  e.preventDefault();
                  return onFilterItemSelection(target);
                }}
                className={itemClassName}>
                {name}
              </li>
            )
          })}
        </ul>
      )
    }

    return null;
  }

  render () {
    const filterClassName = cx('ab-filter', this.state.isFilterOpened ? 'active' : '');

    return (
      <div className={filterClassName}>
        <div
          className='ab-filter__text'
          onClick={::this.filterEvent}>
          <div>{'Filter'}</div>
        </div>
        <div className='ab-filter__items'>
          {this.renderFilterItems()}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    theme: state.theme,
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onFilterItemSelection: (target) => {
      dispatch(filterContentBlocks(target));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);