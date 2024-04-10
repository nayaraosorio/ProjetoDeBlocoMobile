

const PostCard = ({post}) =>{
    return(
        <div className="post-card">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.author}</p>
            <div className="interection">
                <p>{post.likes}</p>
                <p>{post.coments.length}</p>
            </div>
        </div>

    )
}


export default PostCard;