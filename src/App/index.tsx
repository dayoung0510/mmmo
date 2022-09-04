import { Navigate, Route, Routes } from "react-router-dom";
import Main from "pages/Main";
import DepositRecord from "pages/DepositRecord";
import WithdrawRecord from "pages/WithdrawRecord";
import Welfare from "pages/Welfare";
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
