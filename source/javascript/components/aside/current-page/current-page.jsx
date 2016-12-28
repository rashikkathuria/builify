import React from 'react';
import _ from 'lodash';
import classNames from '../../../common/classnames';
import Input from '../../shared/input';
import Title from '../title';
import CurrentPageSections from './current-page-sections';
import Button from '../../shared/button';
import * as Actions from '../../../actions';
import { connect } from 'react-redux';

class CurrentPage extends React.Component {
  state = {
    title: '',
    fileName: ''
  };

  static propTypes = {
    page: React.PropTypes.object.isRequired,
    removeContentBlock: React.PropTypes.func.isRequired,
    sortContentBlocks: React.PropTypes.func.isRequired,
    exportPage: React.PropTypes.func.isRequired
  };

  componentWillMount () {
    const { page } = this.props;
    const { pageID, pageTitle, pageFileName } = page;

    if (!_.isNull(pageID)) {
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

    return this.props[`setPage${_.capitalize(name)}`](value);
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
      title = `Website Title`;
      description = `This is displayed in search results and in your browser's title bar.`;
      value = this.state.title;
      clickFunction = this.handleInputChange.bind(this, type);
    } else if (type === 'fileName') {
      title = `Page's Filename`;
      description = `This will be page's filename`;
      value = this.state.fileName;
      clickFunction = this.handleInputChange.bind(this, type);
    }

    if (!_.isNull(title) && !_.isNull(value) && !_.isNull(clickFunction)) {
      return (
        <div>
          <Title title={title} description={description} />
          <Input className={className} value={value} onChange={clickFunction} />
        </div>
      );
    }
  }

  render () {
    const { page, removeContentBlock, sortContentBlocks } = this.props;

    return (
      <div>
        <Title title='Sections' />
        <CurrentPageSections page={page} onRemove={removeContentBlock} onSortBlocks={sortContentBlocks} />
        { this.renderInput('title') }
        { this.renderInput('fileName') }
        <div className={classNames('currentPage__divider')} />
        <div className='wrap'>
          <Button label='Export Page' onClick={::this.exportPage} />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
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