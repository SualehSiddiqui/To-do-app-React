import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { UnorderedListOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd';
import DelButton from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import {
    collection, serverTimestamp, db, query, doc, deleteDoc,
    onSnapshot, orderBy, updateDoc, addDoc, signOut, auth
} from './firebase';
import moment from 'moment/moment';
import Swal from 'sweetalert2';
import Loader from '../components/loader.js'

const ToDoPage = ({setUserLogin}) => {
    const [loaderState, setLoaderState] = useState(true)
    const [divState, setDivState] = useState(false)
    const [value, setValue] = useState("")
    const [updateValue, setupdateValue] = useState("")
    const [todo, setTodo] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));
    const addTodo = async () => {
        const todoValue = value;
        setValue("")
        const docRef = await addDoc(collection(db, user.uid), {
            value: todoValue,
            edit: false,
            date: serverTimestamp()
        });
        console.log("docRef", docRef.id)
    }

    const getAllTodos = async () => {
        const q = query(collection(db, user.uid), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todoArr = [];
            querySnapshot.forEach((doc) => {
                todoArr.push(doc);
            });
            setLoaderState(false)
            setDivState(true)
            setTodo([...todoArr]);
        });
    }

    useEffect(() => {
        user && getAllTodos()
    }, [])

    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, user.uid, id));
        Swal.fire(
            'Deleted!',
            'You todo has been deleted!',
            'success'
        )
    }
    const editTodo = async (id, index) => {
        let arr = [...todo];
        let obj = arr.slice(index, index + 1);
        if (obj[0].data().edit) {
            const washingtonRef = doc(db, user.uid, id);
            await updateDoc(washingtonRef, {
                value: updateValue,
                edit: false
            });
            setupdateValue("");
            setupdateValue("");
            Swal.fire(
                'Updated',
                'You todo has been updated!',
                'success'
            )
        } else {
            const washingtonRef = doc(db, user.uid, id);
            await updateDoc(washingtonRef, {
                edit: true
            });
        }
    }

    const logout = () => {
        signOut(auth).then(() => {
            console.log("user sign out successfully")
            localStorage.clear()
            setUserLogin(false)
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className='main-div'>
            <div className='todo-div'>
                <div className='main-todo-hd-div'>
                    <div className='d-flex'>
                        <span className='list-icon'>
                            <UnorderedListOutlined />
                        </span>
                        <div className='mt-1 txt todo-hd'>
                            To Do List
                        </div>
                    </div>
                    <div>
                        <Button type="primary" danger className='logout-btn' onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>
                <div className='input-div'>
                    <Input
                        placeholder="Enter Todo"
                        className='todo-input'
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }} />
                    <Button
                        className='add-todo-btn'
                        onClick={
                            () => {
                                if (value) {
                                    addTodo()
                                }
                            }
                        }
                    >
                        Add Todo
                    </Button>
                </div>
                <div className='all-todos-div'>
                    {loaderState && <div className='loader-div'>
                        <Loader />
                    </div>}
                    {divState && <table className='todo-table'>
                        <thead>
                            <tr>
                                <th className='todo-name'>
                                    Todo Name
                                </th>
                                <th className='todo-date'>
                                    Date
                                </th>
                                <th>
                                    Delete
                                </th>
                                <th>
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody className='mt-2 all-todos'>
                            {
                                todo.map((v, i) => {
                                    let date;
                                    if (v.data().date) {
                                        date = v.data().date.toDate();
                                    } else {
                                        date = new Date();
                                    }
                                    return (
                                        <tr key={i}>
                                            <td className='todo-name txt'>
                                                {
                                                    v.data().edit ? <Input
                                                        autoFocus
                                                        type='text'
                                                        defaultValue={v.data().value}
                                                        className='update-todo-input'
                                                        onChange={(e) => {
                                                            setupdateValue(e.target.value)
                                                        }}
                                                    /> : v.data().value
                                                }
                                            </td>
                                            <td className='date-txt'>
                                                {moment(date).format("MMM Do YY")}
                                            </td>
                                            <td>
                                                <DelButton
                                                    variant="outline-danger"
                                                    className='tdo-btn'
                                                    onClick={() => {
                                                        deleteTodo(v._key.path.segments[6])
                                                    }}
                                                >
                                                    <DeleteOutlined />
                                                    <span className='ms-1'>
                                                        Delete
                                                    </span>
                                                </DelButton>
                                            </td>
                                            <td>
                                                <DelButton
                                                    variant="outline-success"
                                                    className='tdo-btn ms-2'
                                                    onClick={() => {
                                                        editTodo(v._key.path.segments[6], i)
                                                    }}
                                                >
                                                    <EditOutlined />
                                                    <span className='ms-1'>
                                                        {v.data().edit ? 'Update' : 'Edit'}
                                                    </span>
                                                </DelButton>
                                            </td>
                                        </tr>

                                    )

                                })
                            }
                            {/* <tr>
                                <td className='todo-name txt'>
                                    Siddiqui
                                </td>
                                <td className='date-txt'>
                                    24-09-2023
                                </td>
                                <td>
                                    <DelButton variant="outline-danger" className='tdo-btn'>
                                        <DeleteOutlined />
                                        <span className='ms-1'>
                                            Delete
                                        </span>
                                    </DelButton>
                                </td>
                                <td>
                                    <DelButton variant="outline-success" className='tdo-btn ms-2'>
                                        <EditOutlined />
                                        <span className='ms-1'>
                                            Edit
                                        </span>
                                    </DelButton>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    );

}

export default ToDoPage;
