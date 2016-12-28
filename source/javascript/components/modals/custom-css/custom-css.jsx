import React from 'react';
import _assign from 'lodash/assign';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Input from '../../shared/input';
import { connect } from 'react-redux';
import { closeModal, setCustomCSS } from '../../../actions';

class Feedback extends React.Component {
  static propTypes = {
    customStylesheetText: React.PropTypes.string.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    setCustomCSS: React.PropTypes.func.isRequired
  };

  state = {
    text: ''
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.text !== this.state.text) {
      return true;
    }

    return false;
  }

  componentWillMount () {
    const { customStylesheetText } = this.props;

    this.setState({
      text: customStylesheetText
    });
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  handleInputChange (value) {
    this.setState({
      ...this.state,
      text: value
    });
  }

  saveCustomCSS () {
    this.closeDialog();
    return this.props.setCustomCSS(this.state.text);
  }

  render () {
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Save', onClick: ::this.saveCustomCSS }
    ];
    const containerStyle = {
      background: '#f5f5f5'
    };
    const style = {
      height: '200px',
      fontSize: '12px',
      maxHeight: '300px'
    };
    const className = classNames(['modal', 'modal__dialog']);

    return (
      <ModalWrapper ref='modalWrapper' className={className} onClose={this.props.closeModal}>
        <ModalTab title='Custom CSS' onClose={::this.closeDialog}>
          <div>
            <div className={classNames('modal__tab')}>
              <Input
                className={classNames('modal__input')}
                type='text'
                label='Custom CSS'
                multiline
                showLength
                style={style}
                value={this.state.text}
                onChange={::this.handleInputChange} />
            </div>
          </div>
          <BottomNavigation style={containerStyle} actions={actions} />
        </ModalTab>
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  const { template } = state;
  const { customStylesheetText } = template;
  
  return {
    customStylesheetText: customStylesheetText
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: function () {
      dispatch(closeModal());
    },

    setCustomCSS: function (value) {
      dispatch(setCustomCSS(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
