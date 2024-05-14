import PropTypes from 'prop-types';

const Button = ({ text, icon, onClick }) => {
    return (
        <button className="milk-button" onClick={onClick}>
            {icon && <span className="milk-button_icon">{icon}</span>}
            <span className="milk-button_text">{text}</span>
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.element,
    onClick: PropTypes.func.isRequired,
};

export default Button;