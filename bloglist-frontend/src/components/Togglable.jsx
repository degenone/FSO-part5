import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => setVisible(!visible);
    const { buttonLabel, children } = props;
    const buttonStyle = {
        marginBlock: '0.5rem',
        marginInlineStart: '0.2rem',
    };
    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });
    return (
        <>
            <div className={visible ? 'hidden' : ''} style={buttonStyle}>
                <button type='button' onClick={toggleVisibility}>
                    {buttonLabel}
                </button>
            </div>
            <div className={visible ? '' : 'hidden'}>
                {children}
                <button
                    type='button'
                    style={buttonStyle}
                    onClick={toggleVisibility}>
                    Cancel
                </button>
            </div>
        </>
    );
});
Togglable.displayName = 'Togglable';

export default Togglable;
