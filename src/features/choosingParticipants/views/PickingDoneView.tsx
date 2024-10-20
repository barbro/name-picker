//components/views/PickingDoneView.tsx

import React from "react";
import { useTranslation } from "react-i18next";

const PickingDoneView = () => {
  const { t } = useTranslation();
  return (
    <p className="m-12 text-center text-2xl text-gray-400 transition-all duration-500 ease-in-out">
      {t("allParticipantsRead")}
    </p>
  );
};

export default PickingDoneView;
