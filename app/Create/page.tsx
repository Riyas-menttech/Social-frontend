'use client'
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/components/lib/mutation.graphql";
import { useRouter } from "next/navigation";

const page = () => {
   
    const [createPost] = useMutation(CREATE_POST);
    const router =  useRouter()
  const [formData, setFormData] = useState({
    userId: '',
    description: '',
    video: '',
    image: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
    const res =   await createPost({
        variables: {
          createPostInput: {
            userId: parseInt(formData.userId),
            description: formData.description,
            video: formData.video,
            image: formData.image
          },
        },
      });
        if (res) {
          setFormData({
            userId: "",
            description: "",
            video: "",
            image: "",
          });
          router.push("/post");
   }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-4 w-full max-w-md"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="userId"
            >
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full  text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Title
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full  text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="video"
            >
              Description
            </label>
            <input
              type="text"
              id="video"
              name="video"
              value={formData.video}
              onChange={handleChange}
              className="w-full  text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Content
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-400"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page
