import React, { memo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = memo(({ api, onFetchUser, isLoggedIn, user, toggle, onToggle }) => {
    const [edit, setEdit] = useState(null);
    const [newName, setNewName] = useState("");
    const [hover, setHover] = useState(null);
    const history = useHistory();

    const handleAdd = async () => {
        await api.makeFolder();
        onFetchUser();
    }
    const handleEdit = (e) => {
        setEdit(e.target.dataset.id);
    }
    const handleInputChange = (e) => {
        setNewName(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const folderId = e.target.dataset.id;
        if (newName) {
            await api.editFolder(folderId, newName);
            onFetchUser();
            setNewName("");
        }
        setEdit(null);
    }
    const handleDelete = async (e) => {
        if (user.folders.length === 1) {
            alert("최소 한 개 이상의 폴더를 가져야합니다.");
            return;
        }
        if (!window.confirm("정말로 삭제하시겠습니까?")) {
            return;
        }
        const folderId = e.target.dataset.id;
        await api.deleteFolder(folderId);
        onFetchUser();
    }
    const handleMouseOver = (e) => {
        setHover(e.target.dataset.id);
    }
    const handleMouseOut = () => {
        setHover(null);
    }
    const handleClickFolder = (e) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        const folderId = e.target.dataset.id;
        onToggle();
        history.push(`/@${user.name}/posts?folder=${folderId}`);
    }
    return (
        <div className={`${styles.sidebar} ${toggle && styles.open}`}>
            <button className={styles.posts}>
                <Link to={`/@${user.name}/posts?folder=all`}>ALL POSTS</Link>
            </button>
            <nav>
                <ul>
                    {user.folders && user.folders.map(folder => {
                        if (edit !== folder._id) {
                            //해당 폴더가 비편집모드일 때
                            return <li
                                key={folder._id}
                                className={styles.folder}
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                onClick={handleClickFolder}
                                data-id={folder._id}
                            >
                                {folder.name}
                                <div className={hover === folder._id ? styles.mouseOver : styles.mouseOut} data-id={folder._id}>
                                    {user._id === isLoggedIn?._id && <>
                                        <i className="fas fa-pen" onClick={handleEdit} data-id={folder._id}></i>
                                        <i className={`fas fa-times ${styles.delete}`} onClick={handleDelete} data-id={folder._id}></i>
                                    </>}
                                </div>
                            </li>
                        } else {
                            //해당 폴더가 편집모드일 때
                            return <form
                                key={folder._id}
                                data-id={folder._id}
                                className={styles.editForm}
                                onSubmit={handleSubmit}>
                                <input
                                    data-id={folder._id}
                                    type="text"
                                    value={newName}
                                    onChange={handleInputChange}
                                    onBlur={handleSubmit}
                                    maxLength="20"
                                    placeholder={folder.name}
                                    autoFocus />
                                <button><i className={newName ? `fas fa-check ${styles.green}` : "fas fa-check"} onClick={handleSubmit} data-id={folder._id}></i></button>
                            </form>
                        }
                    })
                    }
                </ul>
            </nav>
            {user._id === isLoggedIn?._id && <button className={styles.addBtn} onClick={handleAdd}>
                <i className="fas fa-plus"></i> NEW FOLDER
            </button>}
        </div>
    )
})

export default Sidebar
