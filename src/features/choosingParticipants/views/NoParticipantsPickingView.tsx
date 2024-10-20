import React from "react";
import { useTranslation } from "react-i18next";

const NoParticipantsPickingView = () => {
  const { t } = useTranslation();
  return (
    <p className="m-12 text-center text-2xl text-gray-400 transition-all duration-300 ease-in-out">
      {t("noParticipants")}
    </p>
  );
};

export default NoParticipantsPickingView;
