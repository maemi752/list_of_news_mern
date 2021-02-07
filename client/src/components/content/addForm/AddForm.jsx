import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../../actions/posts';
import './AddForm.scss'


const Form = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [img, setImage] = useState("")
    const [imgValid, setImageValid] = useState("")
    const [size, setImgSize] = useState(false)
    const [error, setError] = useState("")
    const by = useSelector(state => state.user.currentUser.nickname)
      
    const addPost = () => {
        const newPost = {
          title,
          text,
          img,
          by
        }

        if(title.trim().length <= 5){
            setError('Введите больше 5 символов в заголовок')
        }else if(text.trim().length <= 20){
            setError('Введите больше 20 символов в текст новости')
        }else if(!img){
            setError('Добавьте ссылку на изображение')
        }else if(!size){
            setError('Размер изображения должен быть 1000x500')
        }else{
            dispatch(createPost(newPost))
            alert('Пост добавлен')
        }

    }

    let imageSize = new Image();     

    imageSize.src = img;

    imageSize.onload = () => { 
        setImageValid(`${imageSize.width}x${imageSize.height}`)
        if (imageSize.width === 1000 && imageSize.height === 500){
            setImgSize(true)
    }
    }  
    imageSize.onerror = () => { setImageValid(`добавьте корректную ссылку на изображение`) }  


    return(
        <div className="AddForm">

                <div className="BackBtn">
                    <a className="Back" href="/">Вернуться на главную</a>
                </div>
                <div className="AddInfo">
                    <span className = "error">{error}</span>
                    <input  maxLength="200" type="text" onChange = {(event) => setTitle(event.target.value)} className="AddTitle" placeholder="Название" />
                    <span className = "count">Количество доступных символов для заголовка: {200 - title.length}</span>
                    <textarea maxLength="5000" onChange = {(event) => setText(event.target.value)} className="AddText" placeholder="Текст новости" />
                    <span className = "count">Количество доступных символов: {5000 - text.length} </span>
                    <input type="text" onChange = {(event) => setImage(event.target.value)} id = "url" className="AddImg" placeholder="Ссылка на изображение" />
                    <span className = "count">Размер изображение должен быть 1000x500 <br />
                        {`Размер вашего изображения: ${imgValid}`}</span>
                </div>
                <div className="AddBtn">
                    <button onClick = {() => addPost()}>Добавить новость</button>
                </div>

        </div>
    );
};

export default Form;