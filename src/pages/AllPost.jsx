import React, { useEffect, useState } from "react";
// FIX: was importing from '../services/appwrite/config' which doesn't exist
import appwriteService from "../appwrite/config";
import { Container, Postcard } from "../components/index";

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // FIX: API call was OUTSIDE the useEffect callback — caused infinite re-render loop
        // FIX: was calling getPost([]) — renamed method is getPosts()
        appwriteService.getPosts([]).then((res) => {
            if (res) {
                // FIX: was checking `if (posts)` (always truthy array) and setting posts.documents
                // Should check res.documents
                setPosts(res.documents);
            }
        }).catch((error) => {
            console.log("Appwrite service getPosts error", error);
        });
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            {/* FIX: was <PostCard /> but component is named Postcard */}
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;