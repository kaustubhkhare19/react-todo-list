import React from 'react';
import CloseIcon from '../../CloseIcon/CloseIcon';
import './TodoItem.css'

const TodoItem = (props) => {

    const selectItem = (e) => {
        e.stopPropagation();
        props.onSelect(props.data);
    };

    const deleteItem = (e) => {
        e.stopPropagation();
        props.onDelete(props.data);
    };

    return (
        <div className="listItem d-flex justify-content-between align-items-start" onClick={selectItem}>
            {console.log('in TodoItem')}
            <div className="me-auto item">
                <h3 className="fw-bold">{props.data.title}</h3>
                <div className='subtitle'>
                    {props.data.content}
                </div>
            </div>
            <CloseIcon click={deleteItem}></CloseIcon>
        </div>
    );
}

export default React.memo(TodoItem);