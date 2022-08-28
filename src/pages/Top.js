import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { fetchPopularData } from "../apis/index";

const Top = () => {
  useEffect(() => {
    fetchPopularData().then((res) => {
      console.log("data", res);
    });
  }, []);

  return <Layout>top</Layout>;
};

export default Top;
