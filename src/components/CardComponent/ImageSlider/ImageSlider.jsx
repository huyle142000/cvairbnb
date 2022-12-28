import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const imgBoxVariants = {
  hidden: {
    x: 0,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const ImageSlider = (props) => {
  const [step, setStep] = useState(1);
  const { id } = props;
  const navigate = useNavigate();

  const handleLeftArrow = () => {
    if (step === 1) {
      setStep(3);
    } else {
      setStep(step - 1);
    }
  };

  const handleRightArrow = () => {
    if (step === 3) {
      setStep(1);
    } else {
      setStep(step + 1);
    }
  };

  const goToSlide1 = () => {
    setStep(1);
  };

  const goToSlide2 = () => {
    setStep(2);
  };

  const goToSlide3 = () => {
    setStep(3);
  };

  return (
    <div className="wrapper">
      <div className="content">
        <div className="left_arrow" onClick={handleLeftArrow}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>

        {step === 1 && (
          <motion.div
            className="img_box"
            variants={imgBoxVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              onClick={() => {
                navigate(`/bookingtravel/${id}`);
              }}
              src={props.image.arrImg[0]}
              alt="img1"
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            className="img_box"
            variants={imgBoxVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              onClick={() => {
                navigate(`/bookingtravel/${id}`);
              }}
              src={props.image.arrImg[1]}
              alt="img2"
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            className="img_box"
            variants={imgBoxVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              onClick={() => {
                navigate(`/bookingtravel/${id}`);
              }}
              src={props.image.arrImg[2]}
              alt="img3"
            />
          </motion.div>
        )}

        <div className="right_arrow" onClick={handleRightArrow}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>

      <div className="indicators_box">
        {step === 1 && (
          <>
            <div className="indicator active">
              <i className="fa-solid fa-circle"></i>
            </div>
            <div className="indicator" onClick={goToSlide2}>
              <i className="fa-solid fa-circle"></i>
            </div>
            <div className="indicator" onClick={goToSlide3}>
              <i className="fa-solid fa-circle"></i>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="indicator" onClick={goToSlide1}>
              <i className="fa-solid fa-circle"></i>
            </div>
            <div className="indicator active">
              <i className="fa-solid fa-circle"></i>
            </div>
            <div className="indicator" onClick={goToSlide3}>
              <i className="fa-solid fa-circle"></i>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="indicator" onClick={goToSlide1}>
              <i className="fa-solid fa-circle"></i>
            </div>
            <div className="indicator" onClick={goToSlide2}>
              <i className="fa-solid fa-circle"></i>
            </div>
            <div className="indicator active">
              <i className="fa-solid fa-circle"></i>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
