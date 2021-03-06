import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  isNull as _isNull,
  capitalize as _capitalize
} from 'lodash';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import Input from '../../shared/input';
import Title from '../title';
import CurrentPageSections from './sections';
import Button from '../../shared/button';
import * as Actions from '../../../actions';

class CurrentPage extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    removeContentBlock: PropTypes.func.isRequired,
    sortContentBlocks: PropTypes.func.isRequired,
    exportPage: PropTypes.func.isRequired
  };

  state = {
    title: '',
    fileName: ''
  };

  componentWillMount () {
    const { page } = this.props;
    const { pageID, pageTitle, pageFileName } = page;

    if (!_isNull(pageID)) {
      this.setState({
        title: pageTitle,
        fileName: pageFileName
      });
    }
  }

  handleInputChange (name, value) {
    this.setState({
      ...this.state,
      [name]: value
    });

    return this.props[`setPage${_capitalize(name)}`](value);
  }

  exportPage () {
    return this.props.exportPage();
  }

  renderInput (type) {
    const className = classNames('itemwrap', 'm-b-3');
    let title = null;
    let description = null;
    let value = null;
    let clickFunction = null;

    if (type === 'title') {
      title = localization('website title');
      description = localization('info.title description');
      value = this.state.title;
      clickFunction = this.handleInputChange.bind(this, type);
    } else if (type === 'fileName') {
      title = localization('page filename');
      description = localization('info.filename description');
      value = this.state.fileName;
      clickFunction = this.handleInputChange.bind(this, type);
    }

    if (_isNull(title) && _isNull(value) && _isNull(clickFunction)) {
      return null;
    }

    return (
      <div>
        <Title title={title} description={description} />
        <Input className={className} value={value} onChange={clickFunction} />
      </div>
    );
  }

  render () {
    const { page, removeContentBlock, sortContentBlocks } = this.props;

    return (
      <div>
        <Title title={localization('sections')} />
        <CurrentPageSections
          page={page}
          onRemove={removeContentBlock}
          onSortBlocks={sortContentBlocks} />
        { this.renderInput('title') }
        { this.renderInput('fileName') }
        <div className={classNames('currentPage__divider')} />
        <div className={'wrap'}>
          <Button label={localization('export page')} onClick={::this.exportPage} />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { page } = state;

  return {
    page
  };
}

function mapDispatchToProps (dispatch) {
  return {
    removeContentBlock: (element) => {
      dispatch(Actions.removeContentBlock(element));
    },

    sortContentBlocks: (element) => {
      dispatch(Actions.sortContentBlocks(element));
    },

    setPageTitle: (title) => {
      dispatch(Actions.setPageTitle(title));
    },

    setPageFilename: (filename) => {
      dispatch(Actions.setPageFilename(filename));
    },

    exportPage: () => {
      dispatch(Actions.exportPage());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPage);
