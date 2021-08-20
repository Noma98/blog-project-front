import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom';
import styles from './createAndEditPost.module.css';
import Tooltip from 'react-tooltip-lite';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

let prevFolderId;
const CreateAndEditPost = memo(({ api, user }) => {
    const history = useHistory();
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [tagArray, setTagArray] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
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
        if (postId) {
            await api.updatePost({ postId, title, description, htmlContent, selectedFolder, tagArray, prevFolderId });
            history.push(`/@${user.name}/post/${postId}`);
        } else {
            await api.createNewPost({ title, description, htmlContent, selectedFolder, tagArray });
            history.push(`/@${user.name}/posts?folder=${selectedFolder}`);
        }
    }

    useEffect(() => {
        if (!postId) {
            setSelectedFolder(location.state || user.folders[0]._id)
            return;
        }
        const fetchData = async () => {
            const { title: prevTitle, htmlContent: prevHtml, tags: prevTags, folder } = await api.fetchPostDetail(postId);
            prevFolderId = folder;
            setTitle(prevTitle);
            setHtmlContent(prevHtml);
            setTagArray(prevTags);
            setSelectedFolder(prevFolderId);
        };
        fetchData();
    }, [postId, user, api, location.state])

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        const formData = new FormData();
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.setAttribute("name", "image");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            formData.append("image", file);
            const res = await api.uploadImage(formData);
            if (!res.success) {
                alert("이미지 업로드에 실패하였습니다.");
            }
            const url = res.payload.url;
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection()?.index;
            if (typeof (range) !== "number") return;
            quill.setSelection(range, 1);
            quill.clipboard.dangerouslyPasteHTML(
                range,
                `<img src=${url} alt="image" />`);
        }
    }, [api]);
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                    ["image", "video"],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }), [imageHandler]);

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
            <ReactQuill
                ref={quillRef}
                value={htmlContent}
                onChange={setHtmlContent}
                modules={modules}
                theme="snow"
                className={styles.quillEditor}
            />
            <button className={styles.submit} onClick={handleSubmit}>Done</button>
        </div >
    )
})

export default CreateAndEditPost
