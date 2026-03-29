import React from 'react'
import { useEffect, useState } from 'react'
// FIX: was importing from '../services/appwrite/config' which doesn't exist
import appwriteService from '../appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'
// FIX: Container and PostForm were used but never imported
import { Container, PostForm } from '../components/index'

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            // FIX: was calling getPostBySlug which doesn't exist; correct method is getPost
            appwriteService.getPost(slug).then((res) => {
                if (res) {
                    setPost(res);
                } else {
                    navigate('/');
                }
            }).catch((error) => {
                console.log("Appwrite getPost error", error);
                navigate('/');
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className='w-full py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
