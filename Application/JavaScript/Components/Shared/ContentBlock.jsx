import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadContentBlockSource } from '../../Actions/ActionCreators';
import cx from 'classnames';
import ImageItem from './ImageItem';

class ContentBlock extends Component {
  shouldComponentUpdate () {
    return true;
  }

  selectContentBlock (e) {
    const { onContentBlockSelection, data } = this.props;
    const { source, blockType, name } = data;

    return onContentBlockSelection(source, blockType, name);
  }

  dragContentBlock (e) {
    e.preventDefault();
  }

  render () {
    const { builder, data } = this.props;
    const { name, thumbnail, blockType} = data;
    const { filterContentBlocksTarget } = builder;
    let blockClassName = cx('ab-contentblocks__block');

    if (filterContentBlocksTarget != 'all') {
      if (blockType != filterContentBlocksTarget) {
        blockClassName = cx('ab-contentblocks__block', 'hide');
      }
    }

    return (
      <figure
        className={blockClassName}
        data-blocktype={blockType}
        onClick={::this.selectContentBlock}>
        <ImageItem
          src={thumbnail}
          alt={name}/>
        <figcaption>
          <span>{name}</span>
        </figcaption>
      </figure>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onContentBlockSelection: (source, blockType, blockName) => {
      dispatch(loadContentBlockSource(source, blockType, blockName));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentBlock);
