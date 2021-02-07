import React from 'react';
import { deletePost, getPosts, likePost, setCurrentPage} from '../../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import createPages from '../../../utils/pagesCreator'
import './PostsList.scss'

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts)
    const currentPage = useSelector(state => state.posts.currentPage)
    const totalCount = useSelector(state => state.posts.totalCount)
    const perPage = useSelector(state => state.posts.perPage)
    const pagesCount = Math.ceil(totalCount/perPage)
    const user = useSelector(state => state.user.currentUser)
    const isAuth = useSelector(state => state.user.isAuth)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getPosts(currentPage));
    }, [dispatch,currentPage]);


    const deleteBtn = (id) => {
        let confirm = window.confirm("Вы точно хотите удалить пост?");
        if (confirm) {
            dispatch(deletePost(id))
        }
    }

    return(
        <div className="PostsList">
            {isAuth &&
            <div className="AddBtn">
                <a className="AddLink" href="/add">Добавить новость</a>
            </div>
            }
            <div className="List" id="list">
            {
                posts.map(news => 
                    <div className = "Post" key = {news._id}>              
                    <img className = "Img" src = {news.img} alt = {news.img} />
                    <h2 className = "Title">{news.title}</h2>
                    <p className = "Text">{news.text}</p>
                    <div className="LikeBtn">
                        {isAuth &&
                            <span className = "like" onClick = {() => dispatch(likePost(news._id, user._id, news.likes))} > ❤ {news.likes.length} </span>
                        }
                    </div>
                    <div className="PostFooter">
                        <span className = 'Date' >@{news.by}</span>
                        {(user.nickname === news.by || user.nickname === "Administrator") &&
                            <span className = 'DeleteBtn' onClick = {() => deleteBtn(news._id)}>Удалить новость</span>
                        }
                    </div>
                    </div>
                )
            }
            </div>
            <div className="pages">
                {pages.map((page, index) => <span
                    key={index}
                    className={currentPage === page ? "current-page" : "page"}
                    onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
            </div>
        </div>
    );
};

export default PostsList;