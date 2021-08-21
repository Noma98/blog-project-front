import React, { useEffect, useRef, useState, memo } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom';
import styles from './postEditor.module.css';
import Tooltip from 'react-tooltip-lite';
import ImageUploader from '../../components/ImageUploader/imageUploader';
import QuillEditor from '../../components/QuillEditor/quillEditor';

let prevFolderId;
const PostEditor = memo(({ api, user }) => {
    const history = useHistory();
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [tagArray, setTagArray] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [image, setImage] = useState({}); //object일 때만 업데이트
    const [prevThumbnail, setPrevThumbnail] = useState("");
    const { id: postId } = useParams();
    const quillRef = useRef();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleFolder = (e) => {
        setSelectedFolder(e.target.value);
    }
    const handleTag = (e) => {
        setTag(e.target.value);
    };
    const handleKeydown = (e) => {
        if (e.key === "," || e.key === "Enter") {
            e.preventDefault();
            if (tagArray.length === 5) {
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
    const handleSubmit = async () => {
        const description = quillRef.current.getEditor().getText();
        if (!description.match(/\S/)) {
            alert("내용을 입력해주세요.")
            return;
        }
        const formData = new FormData();
        formData.append("thumbnail", image);

        if (postId) {
            //기존 게시글 업데이트
            formData.append("data", JSON.stringify({ postId, title, description, htmlContent, selectedFolder, tagArray, prevFolderId, update: typeof (image) === "object" }));

            await api.updatePost(formData);
            history.push(`/@${user.name}/post/${postId}`);
        } else {
            //새로운 게시글 생성
            formData.append("data", JSON.stringify({ title, description, htmlContent, selectedFolder, tagArray }));

            await api.createNewPost(formData);
            history.push(`/@${user.name}/posts?folder=${selectedFolder}`);
        }
    }
    useEffect(() => {
        if (!postId) {
            setSelectedFolder(location.state || user.folders[0]._id)
            return;
        }
        const fetchData = async () => {
            const { title: prevTitle, htmlContent: prevHtml, tags: prevTags, folder, thumbnail } = await api.fetchPostDetail(postId);
            prevFolderId = folder;
            setPrevThumbnail(thumbnail);
            setImage(thumbnail);
            setTitle(prevTitle);
            setHtmlContent(prevHtml);
            setTagArray(prevTags);
            setSelectedFolder(prevFolderId);
        };
        fetchData();
    }, [postId, user, api, location.state])

    const handleBack = () => {
        history.goBack();
    }

    return (
        <div className={styles.postEditor}>
            <button className={styles.back} onClick={handleBack}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <h2 className={styles.title}><input value={title} type="text" placeholder="제목 없음" onChange={handleTitle} /></h2>
            <div className={styles.tagContainer}>
                {tagArray && tagArray.map(tag =>
                    <div key={tag.id} id={tag.id} className={styles.tag} onClick={handleClickTag} >{tag.name}</div>
                )}
                <Tooltip direction="down" content={(
                    <>
                        <span>쉼표 혹은 엔터를 입력하여 태그를 등록할 수 있습니다. <br />등록된 태그를 클릭하면 삭제됩니다.</span>
                    </>
                )}>
                    <input type="text" value={tag} onKeyDown={handleKeydown} onChange={handleTag} placeholder="태그를 입력하세요." autoFocus maxLength="20" />
                </Tooltip>
            </div >
            <select className={styles.folder} value={selectedFolder} onChange={handleFolder} required >
                {
                    user && user.folders.map(folder => {
                        return <option key={Math.random().toString(36).substr(2, 8)} value={folder._id}>{folder.name}</option>
                    })
                }
            </select>
            <QuillEditor quillRef={quillRef} htmlContent={htmlContent} setHtmlContent={setHtmlContent} api={api} />
            <ImageUploader name="thumbnail" setImage={setImage} prevImg={prevThumbnail} label="포스팅 썸네일" />
            <button className={styles.submit} onClick={handleSubmit}>Done</button>
        </div >
    )
})
export default PostEditor
