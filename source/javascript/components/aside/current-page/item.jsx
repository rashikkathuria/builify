import React from 'react';
import Icon from '../../shared/icon';
import localization from '../../../common/localization';
import classNames from '../../../common/classnames';
import { emptyFunction } from '../../../common/misc';

function RenderHandle () {
  return (
    <div className='handle' title={localization('change block position')}>
      <Icon size={18} icon='reorder' />
    </div>
  );
}

export default function CurrentPageItem ({
  onRemove,
  data
}) {
  const { id, type, blockName } = data;
  const removeIconStyle = {
    fill: '#ce4031'
  };
  const sortable = type === 'navigation' || type === 'footer' ? false : true;
  const className = classNames('currentPage__item', {
    'notsortable': !sortable
  });

  return (
    <li
      title={blockName}
      data-blockid={id}
      className={className}>
      { sortable && RenderHandle() }
      <div className={classNames('currentPage__item-title')}>
        <span>{ blockName }</span>
      </div>
      <Icon
        onClick={onRemove}
        style={removeIconStyle}
        className='remove'
        size={24}
        icon='clear'
        title={localization('remove element')} />
    </li>
  );
}

CurrentPageItem.propTypes = {
  onRemove: React.PropTypes.func,
  data: React.PropTypes.object.isRequired
};

CurrentPageItem.defaultProps = {
  onRemoveClick: emptyFunction
};