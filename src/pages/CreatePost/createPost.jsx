import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './createPost.module.css';

function CreatePost({ api, user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [selectedFolder, setSelectedFolder] = useState(user.folders.length !== 0 && user.folders[0]._id);
    const history = useHistory();
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleFolder = (e) => {
        setSelectedFolder(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleTags = (e) => {
        setTags(e.target.value);
    };
    const handleCreate = async (e) => {
        e.preventDefault();
        await api.postNewPost({ title, description, selectedFolder, tags });
        history.push("/");
    }
    return (
        <div className={styles.writePost}>
            <h1>📑 Create new post !</h1>
            <form className={styles.writeForm}>
                <input value={title} type="text" placeholder="제목 없음" onChange={handleTitle} />
                <select value={selectedFolder} onChange={handleFolder} required >
                    {
                        user && user.folders.map(folder => {
                            return <option key={Math.random().toString(36).substr(2, 8)} value={folder._id}>{folder.name}</option>
                        })
                    }
                </select>
                <textarea value={description} className={styles.description} placeholder="내용" onChange={handleDescription} required />
                <input value={tags} text="text" placeholder="(선택) 태그를 띄어쓰기로 구분해 입력하세요." onChange={handleTags} />
                <input onClick={handleCreate} type="submit" value="Create" />
            </form>
        </div>
    )
}

export default CreatePost
