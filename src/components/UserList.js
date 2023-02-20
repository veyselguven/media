/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";

export default function UserList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => {
    console.log(state); // {data: Array(0), isLoading: true, error: null}
    return state.users;
  });

  // console.log(userState);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  if (isLoading) {
    return <Skeleton times={6} />;
  }
  if (error) {
    return <div>Error fetching data....</div>;
  }

  return <div>{data.length}</div>;
}
