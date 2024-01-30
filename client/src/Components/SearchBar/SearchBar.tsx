import React from "react";
import { Input } from "antd";

const { Search } = Input;

export default function SearchBar(): JSX.Element {
  return (
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      loading
    />
  );
}
