import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import styles from './editPost.module.css';

let prevFolderId;
function EditPost({ api, user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [tagArray, setTagArray] = useState([]);

    const [selectedFolder, setSelectedFolder] = useState("");
    const history = useHistory();
    const { id: postId } = useParams();

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.updatePost({ postId, title, description, selectedFolder, tagArray, prevFolderId });
        history.push(`/posts/${postId}`);
    }
    const fetchData = async () => {
        const { title: prevTitle, description: prevDescription, tags: prevTags, folder } = await api.fetchPostDetail(postId);
        prevFolderId = folder;
        setTitle(prevTitle);
        setDescription(prevDescription);
        setTagArray(prevTags);
        setSelectedFolder(prevFolderId);
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className={styles.editPost}>
            <h2 className={styles.title}><input value={title} type="text" onChange={handleTitle} /></h2>
            <div className={styles.tagContainer}>
                {tagArray && tagArray.map(tag =>
                    <div key={tag.id} id={tag.id} className={styles.tag} onClick={handleClickTag} >{tag.name}</div>
                )}
                <input type="text" value={tag} onKeyDown={handleKeydown} onChange={handleTag} placeholder="태그를 입력하세요." autoFocus />
            </div>
            <form onSubmit={handleSubmit} className={styles.editForm}>
                <select className={styles.folder} value={selectedFolder} onChange={handleFolder} required >
                    {
                        user && user.folders.map(folder => {
                            return <option key={Math.random().toString(36).substr(2, 8)} value={folder._id}>{folder.name}</option>
                        })
                    }
                </select>
                <textarea value={description} className={styles.description} onChange={handleDescription} required placeholder="내용을 입력하세요." />
                <input className={styles.submit} type="submit" value="Edit Complete" />
            </form>
        </div>
    )
}

export default EditPost
