"use client";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FETCHPOST, FETCHUSERS } from "../lib/query.graphql";

const Post = () => {
    const { data, loading, error ,refetch} = useQuery(FETCHPOST);
    useEffect(() => {
    refetch()
    },data)
  console.log(data);

  if (error) {
    // alert(error);
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }
  const post: any = data?.findAllPost;

  return (
    <div>
      <div className="flex justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-500">
                <th className="px-4 py-2">PostId</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Content</th>
              </tr>
            </thead>
            <tbody>
              {post?.map((post: any, index: number) => (
                <tr key={post.id} className="bg-white border-b text-black">
                  <td className="px-4 py-2">{post.id}</td>
                  <td className="px-4 py-2">{post.userId}</td>
                  <td className="px-4 py-2">{post.description}</td>
                  <td className="px-4 py-2">{post.video}</td>
                  <td className="px-4 py-2">{post.image}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Post;
