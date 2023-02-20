/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";

export default function UserList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUserError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    //   console.log(state); // {data: Array(0), isLoading: true, error: null}
    return state.users;
  });

  // console.log(userState);
  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => {
        setLoadingUserError(err);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  }, []);

  const handleUserAdd = () => {
    dispatch(addUser());
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }
  if (loadingUsersError) {
    return <div>Error fetching data....</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3 ">
        <h1 className="m-2 text-xl"> Users</h1>
        <Button onClick={handleUserAdd}>+Add User</Button>
      </div>

      {renderedUsers}
    </div>
  );
}
