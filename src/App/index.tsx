import { Navigate, Route, Routes } from "react-router-dom";
import Main from "src/pages/Main";
import DepositRecord from "src/pages/DepositRecord";
import WithdrawRecord from "src/pages/WithdrawRecord";
import Welfare from "src/pages/Welfare";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/welfare" element={<Welfare />} />
        <Route path="/deposit" element={<DepositRecord />} />
        <Route path="/withdraw" element={<WithdrawRecord />} />
        <Route path="/" element={<Main />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

export default Index;
