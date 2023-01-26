import React, { createContext, useContext, useReducer } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "src/pages/Main";
import Layout from "src/components/atoms/Layout";
import Records from "src/pages/Records";

type StateType = {
  lastEndPrice: string;
};
type ActionType = { type: "SET_LAST_END_PRICE"; lastEndPrice: string };

const defaultState: StateType = {
  lastEndPrice: "",
};
type ContextProps = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_LAST_END_PRICE": {
      const { lastEndPrice } = action;
      return { ...state, lastEndPrice };
    }
    default: {
      return state;
    }
  }
};

const Context = createContext<ContextProps>({
  state: defaultState,
  dispatch: () => {},
});

const RecordContext = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useRecordContext = () => useContext(Context);

const Index = () => {
  return (
    <RecordContext>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/records" element={<Records />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
    </RecordContext>
  );
};

export default Index;
