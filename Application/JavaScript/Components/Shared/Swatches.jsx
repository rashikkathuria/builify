import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSwatch } from '../../Actions/ActionCreators';
import { randomKey } from '../../Common/Common';
import _ from 'lodash';
import cx from 'classnames';

class Swatches extends Component {
  render () {
    const { theme, onSetSwatch } = this.props;
    let swatchesToRender = [];
    let activeSwatch = null;

    if (_.has(theme, 'design.swatches')) {
      let swatches = theme.design.swatches;

      _.map(swatches, (swatch) => {
        const { name, colors } = swatch;

        swatchesToRender.push({
          text: name,
          colors: colors
        });
      })
    }

    if (_.has(theme, 'design.currentSwatch')) {
      activeSwatch = theme.design.currentSwatch;
    }

    if (swatchesToRender.length > 0) {
      return (
        <div>
          {_.map(swatchesToRender, (item) => {
            const { text, colors } = item;
            let color1, color2, colorsTitle = '';
            const key = randomKey('swatch');
            const className = cx('ab-swatch', activeSwatch === text ? 'active' : '');

            if (typeof colors === 'object') {
              if (colors.length == 1) {
                color1 = color2 = colors[0];

                colorsTitle = color1;
              } else if (colors.length == 2) {
                color1 = colors[0];
                color2 = colors[1];

                colorsTitle = color1 + '/' + color2;
              }
            } else if (typeof colors === 'string') {
              color1 = color2 = colors;
              colorsTitle = color1;
            }

            return (
              <div
                className={className}
                key={key}
                onClick={(e) => {
                  return onSetSwatch(text);
                }}>
                <div
                  className='ab-swatch__name'
                  title={text}>
                  {text}
                </div>
                <div
                  className='ab-swatch__color'
                  title={colorsTitle}>
                  <span style={{backgroundColor: color1}}/>
                  <span style={{backgroundColor: color2}}/>
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return null;
  }
}

function mapStateToProps (state) {
  return {
    theme: state.theme
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetSwatch: (name) => {
      dispatch(setSwatch(name));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swatches);