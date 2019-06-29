import PropTypes    from 'prop-types';
import React        from 'react';
import { connect }  from '../store/Connect';
import MarkerStore  from '../store/MarkerStore';
import '../../sass/components/_markers.scss';

const Marker = ({
    display,
    left,
    bottom,
    children,
    className,
}) => (
    <div className={`stx-marker ${className || ''}`} style={{ display, left, bottom }}>
        {children}
    </div>
);

Marker.propTypes = {
    display: PropTypes.oneOf(['none', null]),
    left: PropTypes.number,
    bottom: PropTypes.number,
    children: PropTypes.any,
    className: PropTypes.string,
};

Marker.defaultProps = {
    display: null,
    left: 0,
    bottom: 0,
};

export default connect(
    store => ({
        left: store.left,
        bottom: store.bottom,
        children: store.children,
        className: store.className,
        display: store.display,
    }),
    MarkerStore,
)(Marker);
