import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import styles from './editPost.module.css';

let prevFolderId;
function EditPost({ api, user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

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
    const handleTags = (e) => {
        setTags(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.updatePost({ postId, title, description, selectedFolder, tags, prevFolderId });
        history.push(`/posts/${postId}`);
    }
    const fetchData = async () => {
        const { title: prevTitle, description: prevDescription, tags: prevTags, folder } = await api.fetchPostDetail(postId);
        prevFolderId = folder;
        setTitle(prevTitle);
        setDescription(prevDescription);
        setTags(prevTags.join(" "));
        setSelectedFolder(prevFolderId);
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className={styles.editPost}>
            <form onSubmit={handleSubmit} className={styles.editForm}>
                <h2 className={styles.title}><input autoFocus value={title} type="text" onChange={handleTitle} /></h2>
                <input className={styles.tags} value={tags} placeholder="띄어쓰기로 구분해 태그를 입력하세요." text="text" onChange={handleTags} />
                <select className={styles.folder} value={selectedFolder} onChange={handleFolder} required >
                    {
                        user && user.folders.map(folder => {
                            return <option key={Math.random().toString(36).substr(2, 8)} value={folder._id}>{folder.name}</option>
                        })
                    }
                </select>
                <textarea value={description} className={styles.description} onChange={handleDescription} required />
                <input className={styles.submit} type="submit" value="Edit Complete" />
            </form>
        </div>
    )
}

export default EditPost
