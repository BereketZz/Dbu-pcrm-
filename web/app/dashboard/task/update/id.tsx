import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchUser, updateUser, User } from "../service";

const UserUpdatePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userUpt, setUserUpt] = useState<string>(""); // State for user id
  const [user, setUser] = useState<User>({
    userId: "",
    firstname: "",
    lastname: "",
    description: "",
    image: "",
    brand: "",
    serialnumber: "",
    barcode: "", // Add the barcode property
    createdAT: "", // Add the createdAT property
    updatedAT: "" // Add the updatedAT property
  });

  // Effect to parse and set user id from query params
  useEffect(() => {
    const userIdFromQuery = searchParams.get('id');
    if (userIdFromQuery) {
      setUserUpt(userIdFromQuery); // Set the user id
    }
  }, [searchParams]);

  // Effect to fetch user data when id changes
  useEffect(() => {
    if (userUpt) {
      fetchUser(userUpt).then((userData) => setUser(userData));
    }
  }, [userUpt]);

  // Handle change function to update user state
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (userUpt) {
      await updateUser(userUpt, user); // Assuming updateUser function exists and updates the user
      router.push("/dashboard"); // Redirect to dashboard after update
    }
  };

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0 align-middle">
      <form onSubmit={handleSubmit}>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Update Information
        </h6>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400"
                placeholder="User ID"
                name="userId"
                value={user.userId}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="firstname">
                First Name
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400"
                placeholder="First Name"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="lastname">
                Last Name
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400"
                placeholder="Last Name"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="description">
                Description
              </label>
              <select
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400"
                name="description"
                value={user.description}
                onChange={handleChange}
              >
                <option value="">Select Description</option>
                <option value="Staff">Staff</option>
                <option value="Student">Student</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="brand">
                Brand
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400"
                placeholder="Brand"
                name="brand"
                value={user.brand}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="serialnumber">
                Serial Number
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400"
                placeholder="Serial Number"
                name="serialnumber"
                value={user.serialnumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 border-0 text-white w-full p-3 rounded-md mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UserUpdatePage;
