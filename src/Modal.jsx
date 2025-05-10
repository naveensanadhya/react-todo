import React, { useEffect, useState } from "react";
import { modalSizes } from "./Constants";

const Modal = ({
  modalTitle = "",
  children,
  footerChildren = null,
  modalSize = modalSizes.LG,
  handleClose = () => console.log("Modal Close Clicked"),
}) => {
  const [modalClass, setModalClass] = useState(
    `relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${modalSizes.XL}`
  );
  useEffect(() => {
    setModalClass(
      `relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${modalSize}`
    );
  }, [modalSize]);
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className={modalClass}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div
                  className="absolute top-2 right-2 rounded border border-red-300 py-1 px-2 hover:text-white hover:bg-red-600 cursor-pointer hover:shadow-lg"
                  onClick={handleClose}
                >
                  X
                </div>
                {modalTitle && (
                  <div className="absolute top-3 left-5 text-semibold truncate w-80">
                    {modalTitle}
                  </div>
                )}
                <div className="pt-10">{children}</div>
              </div>
              {footerChildren && (
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {footerChildren}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
