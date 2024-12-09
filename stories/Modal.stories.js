import React, { useState, useEffect, useCallback } from "react";
import withAuthentication from "../src/Components/HOCs/withAuthentication";
import AbstractModal from "../src/Components/Modal/AbstractModal";
import ConfirmAlertModal from "../src/Components/Modal/ConfirmAlertModal";
import SelectScopeModal, {
  getAllData,
} from "../src/Components/Modal/SelectScopeModal";
export default {
  title: "Modal",
};

export const simple = () => {
  return (
    <AbstractModal
      title={"Simple Modal"}
      open={true}
      width={"50%"}
      height={"50%"}
      onSubmit={() => console.log("submit!")}
      onCancel={() => console.log("gðdel!")}
      submitColor={"secondary"}
    >
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry.Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
    </AbstractModal>
  );
};

simple.story = {
  name: "simple Modal",
};

export const simpleConfirm = () => {
  return (
    <ConfirmAlertModal open={true}>
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry.Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
    </ConfirmAlertModal>
  );
};

simpleConfirm.story = {
  name: "Confirm Modal",
};

const scopeList = [
  "Annotations",
  "Callback",
  "Configuration",
  "Flow",
  "Nodes",
  "Layouts",
  "Scenes",
];

function SelectScope() {
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    getAllData("global").then(setModalData);
  }, []);

  const filterLambda = useCallback(({ name }) => {
    return name.includes("_");
  }, []);

  return (
    <SelectScopeModal
      data={modalData}
      scopeList={scopeList}
      open
      filter={filterLambda}
    />
  );
}

const AuthSelectScope = withAuthentication(SelectScope);

export const selectScope = () => {
  return <AuthSelectScope />;
};

simpleConfirm.story = {
  name: "Select Scope Modal",
};
