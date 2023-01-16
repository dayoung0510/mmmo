import { Navigate, Route, Routes } from "react-router-dom";
import Main from "src/pages/Main";
import Layout from "src/components/atoms/Layout";
import Records from "src/pages/Records";

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/records" element={<Records />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
};

export default Index;
