import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './createPost.module.css';

function CreatePost({ api, user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [tagArray, setTagArray] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(user.folders.length !== 0 && user.folders[0]._id);
    const history = useHistory();
    const textRef = useRef();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleFolder = (e) => {
        setSelectedFolder(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleTag = (e) => {
        setTag(e.target.value);
    };
    const handleKeydown = (e) => {
        if (e.key === "," || e.key === "Enter") {
            e.preventDefault();
            if (tagArray.length === 8) {
                alert("더이상 추가할 수 없습니다.");
                return;
            }
            if (tag === "") {
                return;
            }
            setTagArray(tagArray => [...tagArray, { id: Math.random().toString(36).substr(2, 8), name: tag }]);
            setTag("");
        }
        if (e.key === "Backspace" && tag === "") {
            e.preventDefault();
            if (tagArray.length === 0) {
                return;
            }
            const updated = [...tagArray];
            const newTag = updated.pop();
            setTagArray(updated);
            setTag(newTag.name);
        }
    }
    const handleClickTag = (e) => {
        setTagArray(tagArray => tagArray.filter(x => x.id !== e.target.id));
    }
    const handleCreate = async (e) => {
        e.preventDefault();
        await api.postNewPost({ title, description, selectedFolder, tagArray });
        history.push(`/posts?folder=${selectedFolder}`);
    }
    useEffect(() => {
        if (textRef === undefined || textRef.current === undefined) {
            return;
        }
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    });

    return (
        <div className={styles.writePost}>
            <h1 className={styles.title}>Create new post</h1>
            <input value={title} type="text" placeholder="제목 없음" onChange={handleTitle} />
            <div className={styles.tagContainer}>
                {tagArray && tagArray.map(tag =>
                    <div key={tag.id} id={tag.id} className={styles.tag} onClick={handleClickTag} >{tag.name}</div>
                )}
                <input type="text" value={tag} onKeyDown={handleKeydown} onChange={handleTag} placeholder="태그를 입력하세요." autoFocus />
            </div>
            <form className={styles.writeForm} onSubmit={handleCreate}>
                <select className={styles.folder} value={selectedFolder} onChange={handleFolder} required >
                    {
                        user && user.folders.map(folder => {
                            return <option key={Math.random().toString(36).substr(2, 8)} value={folder._id}>{folder.name}</option>
                        })
                    }
                </select>
                <textarea ref={textRef} value={description} className={styles.description} placeholder="내용" onChange={handleDescription} required />
                <input type="submit" value="Create" />
            </form>
        </div>
    )
}

export default CreatePost
