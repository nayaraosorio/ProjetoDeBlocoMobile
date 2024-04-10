import PostCard from './PostCard';



const PostList = ({posts}) => {
    return (
        <div className='posts-list'>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

export default PostCard;