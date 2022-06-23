import React, { useState, useEffect } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import "./Payment.css";
import valid from "card-validator";

export default function Payment(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");

  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryMonthError, setExpiryMonthError] = useState("");

  const [expiryYear, setExpiryYear] = useState("");
  const [expiryYearError, setExpiryYearError] = useState("");

  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");

  const [continueBtn, setContinueBtn] = useState(false);

  const [cardType, setCardType] = useState("");

  const validateName = () => {
    if (name.length > 0)
      if (/^[A-Za-z\s]+$/.test(name)) return false;
      else return true;
  };

  const checkCardType = () => {
    if (valid.number(cardNumber).isPotentiallyValid) {
      if (valid.number(cardNumber).card) {
        console.log(cardType);
        if (
          valid.number(cardNumber).card.type !== "visa" ||
          valid.number(cardNumber).card.type != "mastercard"
        ) {
          setCardType("");
        } else {
          setCardType(valid.number(cardNumber).card.type);
        }
      } else {
        setCardType("");
      }
    }
  };

  useEffect(() => {
    if (validateName(name)) {
      setNameError("Invalid Name");
    } else {
      setNameError("");
    }

    if (!valid.number(cardNumber).isPotentiallyValid) {
      setCardNumberError("Invalid Card Number");
      setCardType("");
    } else {
      setCardNumberError("");
      if (valid.number(cardNumber).card) {
        setCardType(valid.number(cardNumber).card.type);
      }
    }

    if (!valid.cvv(cvv).isPotentiallyValid) {
      setCvvError("Invalid Cvv");
    } else {
      setCvvError("");
    }

    if (!valid.expirationMonth(expiryMonth).isPotentiallyValid) {
      setExpiryMonthError("Invalid Date");
      console.log("MoNTH" + expiryMonth);
    } else {
      setExpiryMonthError("");
    }

    if (!valid.expirationYear(expiryYear).isPotentiallyValid) {
      setExpiryYearError("Invalid Date");
    } else {
      setExpiryYearError("");
    }

    if (
      name.length > 0 &&
      nameError.length === 0 &&
      cardNumber.length > 0 &&
      cardNumberError.length === 0 &&
      expiryYear.length > 0 &&
      expiryYearError.length === 0 &&
      cvv.length > 0 &&
      cvvError.length === 0
    ) {
      setContinueBtn(true);
    } else {
      setContinueBtn(false);
    }
  }, [
    cardNumber,
    cvv,
    name,
    expiryYear,
    expiryMonth,
    nameError,
    cardNumberError,
    cvvError,
    expiryYearError,
    cardType,
  ]);

  return (
    <div className="App">
      <div className="modal">
        <div className="modal__container">
          <div className="modal__content">
            <form>
              <ul className="form-list">
                <li className="form-list__row form-list__row--inline">
                  <div> We only accept master and visa </div>
                </li>

                <li>
                  <FaCcMastercard />
                  &nbsp;
                  <FaCcVisa />
                  {cardNumber.length > 0 &&
                  (cardType == "mastercard" || cardType == "visa")
                    ? cardType
                    : ""}
                </li>
                <br />

                <li className="form-list__row">
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <p className="error"> {nameError} </p>
                </li>

                <li className="form-list__row">
                  <label>Card Number</label>
                  <div>
                    <input
                      type="text"
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <p className="error"> {cardNumberError} </p>
                  </div>
                </li>

                <li className="form-list__row form-list__row--inline">
                  <div>
                    <label>Expiration Date</label>

                    <div className="form-list__input-inline">
                      <input
                        type="text"
                        placeholder="MM"
                        onChange={(e) => setExpiryMonth(e.target.value)}
                      />

                      <input
                        type="text"
                        placeholder="YY"
                        onChange={(e) => setExpiryYear(e.target.value)}
                      />
                    </div>
                    <p className="error"> {expiryMonthError} </p>
                    <p className="error"> {expiryYearError} </p>
                  </div>
                  <div>
                    <label>CVC</label>
                    <input
                      type="text"
                      onChange={(e) => setCvv(e.target.value)}
                    />
                    <p className="error"> {cvvError} </p>
                  </div>
                </li>

                <li>
                  <button>Back </button> &nbsp;
                  <button disabled={!continueBtn}>Continue</button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
