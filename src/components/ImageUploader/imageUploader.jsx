import React, { memo, useRef, useState } from 'react'
import styles from './imageUploader.module.css';

const ImageUploader = memo(({ name, label, setImage, prevImg }) => {
    const [imgBase64, setImgBase64] = useState(null);
    const [type, setType] = useState("initial");
    const inputRef = useRef();

    const handleFile = (e) => {
        const file = inputRef.current.files[0];
        file && setImage(file);
        let reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            if (base64) {
                setType("upload");
                setImgBase64(base64.toString());
            }
        }
        if (!e.target.files[0]) {
            return;
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const handleClick = () => {
        inputRef.current.click();
    }
    const deleteImage = () => {
        if (type === "delete") return;
        setImgBase64(null);
        setImage({}); //빈이미지로 업데이트
        setType("delete");
    }
    const revertImage = () => {
        if (type === "revert") return;
        setImgBase64(prevImg);
        setImage(""); //업데이트 안함, 기존 이미지 유지
        setType("revert");
    }
    return (
        <div className={styles.imageUploader} >
            <span className={styles.label}>{label}</span>
            <div className={styles.controls}>
                {prevImg && <button onClick={revertImage}><i className="fas fa-undo" /></button>}
                <button onClick={deleteImage}><i className="fas fa-times" /></button>
            </div>
            <div onClick={handleClick} className={styles.preview}>
                <input ref={inputRef} onChange={handleFile} type="file" accept="image/*" name={name} />
                {type === "initial" && prevImg && <img src={prevImg} alt={name} />}
                {type === "initial" && !prevImg && <div>파일 업로드</div>}
                {type === "upload" && <img src={imgBase64} alt={name} />}
                {type === "delete" && <div>파일 업로드</div>}
                {type === "revert" && <img src={prevImg} alt={name} />}
            </div>

        </div>
    )
})

export default ImageUploader
