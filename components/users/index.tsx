'use client'
import { useQuery } from '@apollo/client'
import React from 'react'
import { FETCHUSERS } from '../lib/query.graphql';

const User = () => {
    const { data, loading, error } = useQuery(FETCHUSERS);
    console.log(data);
    
    if (error) {
        alert(error)
    }
    if (loading) {
        return <h1>Loading...</h1>
    }
    const users: any = data?.findAllUsers;
    
  return (
    <div>
      <div className="flex justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-500">
                <th className="px-4 py-2">Index</th>
                <th className="px-4 py-2">User  ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user:any, index:number) => (
                <tr key={user.id} className="bg-white border-b text-black">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.Name}</td>
                  <td className="px-4 py-2">{user.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User
