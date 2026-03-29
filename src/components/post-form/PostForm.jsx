import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
// FIX: was importing Button,Input,Select from '../form-components' which doesn't exist
import { Button, Input, Select, RTE } from '../index'
// FIX: was importing appwriteService from '../../services/appwrite/config' which doesn't exist
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// FIX: {controller} (lowercase, wrong named export) — actual export is Controller, but we import from react-hook-form above

function PostForm({ post }) {
    const { register, control, handleSubmit, watch, setValue, getValues } = useForm({
        // FIX: 'control' was destructured but 'register' was missing — both needed
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            featuredimage: post?.featuredimage || "",
            status: post?.status || "active",
            slug: post?.$id || "",
        }
    });

    const navigate = useNavigate();
    // FIX: was state.auth.user — but authSlice stores it as state.auth.userData
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            // FIX: was missing 'await' on uploadFile
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredimage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : post.featuredimage
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;
                // FIX: was userData.$id but userData was from state.auth.user (wrong key)
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        }
        return '';
        // FIX: was setValue inside slugTransform which caused issues; now just returns the value
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const slug = slugTransform(value.title);
                setValue("slug", slug, { shouldValidate: true });
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            // FIX: was post.featuredImage (capital I) but field is stored as featuredimage (lowercase)
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm