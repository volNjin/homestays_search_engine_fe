import { useState } from "react";
import './option.css'
import {
    faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Option = ({ options, setOptions }) => {
    const [openOptions, setOpenOptions] = useState(false);

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };
    return (
        <div className="optionSearch">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
                onClick={() => setOpenOptions(!openOptions)}
                className="optionSearchText"
            >{`${options.adult} Người lớn · ${options.children} Trẻ em · ${options.room} Phòng`}</span>
            {
                openOptions && (
                    <div className="options">
                        <div className="optionItem">
                            <span className="optionText">Người lớn</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.adult <= 1}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("adult", "d")}
                                >
                                    -
                                </button>
                                <span className="optionCounterNumber">
                                    {options.adult}
                                </span>
                                <button
                                    className="optionCounterButton"
                                    onClick={() => handleOption("adult", "i")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Trẻ em</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.children <= 0}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("children", "d")}
                                >
                                    -
                                </button>
                                <span className="optionCounterNumber">
                                    {options.children}
                                </span>
                                <button
                                    className="optionCounterButton"
                                    onClick={() => handleOption("children", "i")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Phòng</span>
                            <div className="optionCounter">
                                <button
                                    disabled={options.room <= 1}
                                    className="optionCounterButton"
                                    onClick={() => handleOption("room", "d")}
                                >
                                    -
                                </button>
                                <span className="optionCounterNumber">
                                    {options.room}
                                </span>
                                <button
                                    className="optionCounterButton"
                                    onClick={() => handleOption("room", "i")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default Option;