import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from "./TodoItem/TodoItem";
import ItemEditor from './ItemEditor/ItemEditor'

const TodoList = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        setList([{
            id:  1,
            title: 'This is title 1.',
            content: 'This is content 1.'
        },
        {
            id:  2,
            title: 'This is title 2.',
            content: 'This is content 2.'
        },
        {
            id:  3,
            title: 'This is title 3.',
            content: 'This is content 3.'
        }]);
        console.log('data fetched!!');
    }, []);

    const [isNew, setNew] = useState(false);

    const [item, setItem] = useState({});

    const [isItemSelected, setItemSelected] = useState(false);

    const onSelect = (ele) => {
        setItem(prevEle => prevEle.id !== ele.id ? ele : prevEle);
        setItemSelected(true);
    };

    const onDelete = (ele) => {
        
        setList(preList => {
            const index = preList.indexOf(ele);
            const newList = preList.filter(e => e.id !== ele.id);

            if (newList.length === 0) {
                setItem({});
                setItemSelected(false);
            } else if(index <= newList.length) {
                setItem(newList[0]);
            }
            return newList;
        });
    };

    const saveContent = (todo) => {
        if (isNew) {
            setList([...list, todo]); 
            setNew(false);
            onSelect(todo);
        } else {
            const newList = list.map(ele => ele.id === todo.id ? {...ele, title: todo.title, content: todo.content} : ele);
            setList(newList);
            onSelect(todo);
        }
    };

    const addNew = () => {
        const id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
        const newItem = {
            id:  id,
            title: '',
            content: ''
        }
        onSelect(newItem);
        setNew(true);
    }

    return (
            <Container>
                <Row>
                    <Col>
                        <div className="todoList">
                            <Stack direction="horizontal">
                                <h1 className="header">Todo List</h1>
                                <Button variant="primary" className='addNew ms-auto' onClick={addNew}>Add New</Button>{' '}
                            </Stack>
                            <ListGroup>
                                {    list.length > 0 ? list.map((item) => 
                                    <ListGroup.Item key={item.id}>
                                        <TodoItem data={item} onSelect={onSelect} onDelete={onDelete}> </TodoItem>
                                    </ListGroup.Item>
                                    ) : <div className='text-center'> List is empty. Please add a new note! </div>
                                }
                                </ListGroup>
                        </div>
                    </Col>
                    {isItemSelected ?
                    <Col>
                        <div className="detailContainer">
                            <ItemEditor data={item} onDelete={onDelete} onSave={saveContent} isAddNew={isNew}></ItemEditor>
                        </div>
                    </Col>
                    : ''}
                </Row>
                {console.log('in TodoList')}
            </Container>
    );
}

export default TodoList;