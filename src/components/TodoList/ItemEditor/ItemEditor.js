import './ItemEditor.css'
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseIcon from '../../CloseIcon/CloseIcon';
import Stack from 'react-bootstrap/Stack';

const ItemEditor = ({data, isAddNew, onSave, onDelete}) => {

    const [isEditing, setEditing] = useState(false);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        setInputs(data);
      }, [data] );

    useEffect(() => {
        setEditing(isAddNew);
      }, [isAddNew] );

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

  const onButtonClick = (e) => {
    e.stopPropagation();
    if (isEditing) {
        onSave(inputs);
    }
    setEditing(!isEditing);
}

    const deleteItem = (e, ele) => {
        e.stopPropagation();
        onDelete(inputs);
    };

    return (
        <div className="editorContainer">
            {console.log('in ItemEditor')}
            <div className="contentContainer">
            <CloseIcon click={deleteItem}></CloseIcon>
                <div className="content">
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" 
                                    placeholder="Enter title"
                                    name="title"
                                    value={inputs.title || ""}
                                    disabled={!isEditing}
                                    onChange={handleChange}
                                    />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea"
                                name="content" 
                                value={inputs.content || ""} 
                                disabled={!isEditing}
                                onChange={handleChange}
                                placeholder="Enter content"
                            />
                        </Form.Group>
                    </Form>                        
                <Stack direction="horizontal">
                    <Button onClick={onButtonClick}>{isEditing ? "Save" : "Edit"}</Button>
                    { isEditing ? <Button className='ms-auto' onClick={() => setEditing(false)}>Cancel</Button> : "" }
                </Stack>
                </div>
            </div>
        </div>
    )
};

export default React.memo(ItemEditor);