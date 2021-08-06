import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom';
import styles from './createAndEditPost.module.css';
import * as common from '../../common';

let prevFolderId;
function CreateAndEditPost({ api, user }) {
    const history = useHistory();
    const location = useLocation();
    const textRef = useRef();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [tagArray, setTagArray] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("");

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
        history.push(`/post/${postId}`);
    }
    const handleCreate = async (e) => {
        e.preventDefault();
        await api.postNewPost({ title, description, selectedFolder, tagArray });
        history.push(`/posts?folder=${selectedFolder}`);
    }

    const fetchData = useCallback(async () => {
        const { title: prevTitle, description: prevDescription, tags: prevTags, folder } = await api.fetchPostDetail(postId);
        prevFolderId = folder;
        setTitle(prevTitle);
        setDescription(prevDescription);
        setTagArray(prevTags);
        setSelectedFolder(prevFolderId);
    }, [api, postId]);

    useEffect(() => {
        if (!postId) {
            setSelectedFolder(location.state || user.folders[0]._id)
            return;
        }
        fetchData();
    }, [fetchData])

    useEffect(() => {
        common.setTextareaHeight(textRef);
    });
    const handleBack = () => {
        history.goBack();
    }
    return (
        <div className={styles.editPost}>
            <button className={styles.back} onClick={handleBack}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <h2 className={styles.title}><input value={title} type="text" placeholder="제목 없음" onChange={handleTitle} /></h2>
            <div className={styles.tagContainer}>
                {tagArray && tagArray.map(tag =>
                    <div key={tag.id} id={tag.id} className={styles.tag} onClick={handleClickTag} >{tag.name}</div>
                )}
                <input type="text" value={tag} onKeyDown={handleKeydown} onChange={handleTag} placeholder="태그를 입력하세요." autoFocus />
            </div>
            <form onSubmit={postId ? handleSubmit : handleCreate} className={styles.editForm}>
                <select className={styles.folder} value={selectedFolder} onChange={handleFolder} required >
                    {
                        user && user.folders.map(folder => {
                            return <option key={Math.random().toString(36).substr(2, 8)} value={folder._id}>{folder.name}</option>
                        })
                    }
                </select>
                <textarea value={description} className={styles.description} onChange={handleDescription} ref={textRef} required placeholder="내용을 입력하세요." />
                <input className={styles.submit} type="submit" value="Complete" />
            </form>
        </div>
    )
}

export default CreateAndEditPost
