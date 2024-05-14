import { useState } from "react";

const Dialog = ({
    onSaveHandler = () => {}
}) => {
    const [milkQty, setMilkQty] = useState(0);

    const onClickSave = () => onSaveHandler(milkQty);
    const onChangeHandler = (event) => setMilkQty(event.target.value);

    return (
        <>
        <div className="alert-dialog-bg"/>
        <div className="alert-dialog">
            <div className="alert-dialog_content">
                <h1>Quantity</h1>
                <input type="number" value={milkQty} onChange={onChangeHandler}/>
                <button onClick={onClickSave}>Save</button>
            </div>
        </div>
        </>
    );
};

export default Dialog;