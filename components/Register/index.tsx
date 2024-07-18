'use client'
import { useMutation } from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Link from "next/link";
import React, { useState } from "react";
import { ADD_USER } from "../lib/mutation.graphql";
import { useRouter } from "next/navigation";

const Register = () => {
  const [addUser] = useMutation(ADD_USER);
  const [data, setData] = useState({ Name: '', Email: "", Password: "" });
 const router = useRouter()

  const handlleSubmit = async () => {
    try {
     const res: any = await addUser({
       variables: {
         CreateUserInput: {
           Email: data.Email,
           Name: data.Name,
           Password: data.Password,
         },
       },
     });
      // console.log(res,res?.signIn);
      
      if (res) {
          setData({
            Name: "",
            Password: "",
            Email: "",
          });
        router.push("/login");
      } 

        // alert('An Error occuured')
     
      
    } catch (error) {
       alert("An Error occuured");
      console.log(error);
      
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="main bg-white rounded-lg shadow-md p-10 transition-transform w-96 text-center">
        <h2 className="text-black">Register</h2>
        {/* <form action=""> */}
          <label
            htmlFor="first"
            className="block mt-4 mb-2 text-left text-gray-700 font-bold"
          >
            Username:
          </label>
          <input
            type="text"
            id="first"
            name="Name"
            value={data.Name}
            onChange={(e) => setData({ ...data, Name: e.target.value })}
            placeholder="Enter your Username"
            className="block w-full text-black mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
            required
          />
          <label
            htmlFor="first"
            className="block mt-4 mb-2 text-left text-gray-700 font-bold"
          >
            Email:
          </label>
          <input
            type="Email"
            id="Email"
            name="Email"
            value={data.Email}
            onChange={(e) => setData({ ...data, Email: e.target.value })}
            placeholder="Enter your email"
            className="block text-black w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
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
            className="block w-fullm text-black mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
            required
          />

          <div className="flex justify-center items-center">
            <button
              type="submit"
              onClick={() => handlleSubmit()}
              className="bg-green-600 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-green-500"
            >
              Submit
            </button>
          </div>
        {/* </form> */}
        <Link href="/login">
          {" "}
          <p className="mt-4">
            <a href="#" className="text-blue-500 hover:underline">
              Already have an account?
            </a>
          </p>
        </Link>
        <GoogleLogin
          onSuccess={async(credentialResponse) => {
            const token = credentialResponse.credential;
            if (token) {
              const data: any = jwtDecode(token);
              console.log(data);
              setData({
                Name: data.name,
                Password: data.email,
                Email: data.email,
              });
              
             await  handlleSubmit()
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

export default Register;
