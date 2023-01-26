import React, { createContext, useContext, useReducer } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "src/components/atoms/Layout";
import Recording from "src/pages/Recording";
import Records from "src/pages/Records";

type StateType = {
  loading: boolean;
  head: string[];
  body: string[];
};
type ActionType =
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_HEAD"; head: string[] }
  | { type: "SET_BODY"; body: string[] };

const defaultState: StateType = {
  loading: false,
  head: [],
  body: [],
};
type ContextProps = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_LOADING": {
      const { loading } = action;
      return { ...state, loading };
    }
    case "SET_HEAD": {
      const { head } = action;
      return { ...state, head };
    }
    case "SET_BODY": {
      const { body } = action;
      return { ...state, body };
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
          <Route path="/" element={<Recording />} />
          <Route path="/records" element={<Records />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
    </RecordContext>
  );
};

export default Index;
