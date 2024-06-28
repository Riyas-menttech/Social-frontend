"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../lib/mutation.graphql";

const Login = () => {
    const [checkUser] = useMutation(LOGIN_USER);
      const [data, setData] = useState({ Email: "", Password: "" });
    const router = useRouter();
    
    const handleSubmit = async () => {
        try {
          const res=   await checkUser({
              variables: {
                CreateUserInput: {
                  Email: data.Email,
                  Password: data.Password,
                },
              },
          });
            if (res.data) {
                const { accessToken } = res.data.logIn
                
                localStorage.setItem("token", accessToken);
                router.push('/')
         }
            
        } catch (error) {
            alert('Check data')
            console.log(error);
            
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="main bg-white rounded-lg shadow-md p-10 transition-transform w-96 text-center">
        <h2 className="text-black">Login</h2>
        <label
          htmlFor="first"
          className="block mt-4 mb-2 text-left text-gray-700 font-bold"
        >
          Email:
        </label>
        <input
          type="text"
          id="Email"
          name="Email"
          value={data.Email}
          onChange={(e) => setData({ ...data, Email: e.target.value })}
          placeholder="Enter your email"
          className="block  text-black w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
          required
        />

        <label
          htmlFor="password"
          className="block mb-2 text-left text-gray-700 font-bold"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="Password"
          value={data.Password}
          onChange={(e) => setData({ ...data, Password: e.target.value })}
          placeholder="Enter your Password"
          className="block text-black w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
          required
        />

        <div className="flex justify-center items-center">
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="bg-green-600 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-green-500"
          >
            Submit
          </button>
        </div>
        <Link href="/Register" className="'">
          {" "}
          <p className="mt-4">
            <a href="#" className="text-blue-500 hover:underline ">
              Create an account
            </a>
          </p>
        </Link>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const token = credentialResponse.credential;
            if (token) {
              const data: any = jwtDecode(token);
              console.log(data);
              setData({
                Password: data.email,
                Email: data.email,
              });

              await handleSubmit();
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
