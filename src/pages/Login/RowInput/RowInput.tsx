import React, { useEffect, useState } from "react";
import "./RowInput.sass";
import PictureIcon from "../../../assets/icons/PictureIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";

const RowInput = ({
  name = "",
  id = "",
  value = undefined,
  required = false,
  title = "",
  type = "text",
  onChange = (e: any) => {},
  fullWidth = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [valueInput, setValue] = useState(value + "");
  const [fileLoaded, setFileLoaded] = useState(false);

  const [filePreview, setFilePreview] = useState(
    value !== undefined && type === "file" ? URL.createObjectURL(value) : undefined
  );

  const handleValueFile = (e: any) => {
    setFileLoaded(true);
    if (e.target.files.length > 0) {
      let pathFileLoaded = URL.createObjectURL(e.target.files[0]);
      setFilePreview(pathFileLoaded);
    }
    onChange({
      target: {
        value: e.target.files,
        name: e.target.name,
        type: "file",
      },
    });
  };

  const handleFocusedState = () => {
    setFocused(true);
  };
  const handleBlurState = () => {
    if (valueInput.trim() !== "") {
      setFocused(true);
      return;
    }
    setFocused(false);
  };

  useEffect(() => {
    handleBlurState();
  }, []);

  return (
    <div className={`row_input ${fullWidth ? "fullWidth" : ""}`}>
      <div className="_input">
        {type === "file" ? (
          <>
            <div className={`placeholder up_no`}>{title}</div>
            <label htmlFor={id}></label>
            <label htmlFor={name} className="label_file_container">
              {!fileLoaded && filePreview === undefined ? (
                <>
                  <div className="icon">
                    <PictureIcon />
                  </div>
                  <div className="span"> Ajouter une photo </div>{" "}
                </>
              ) : (
                <>
                  <div className="add_file">
                    <PictureIcon />
                  </div>
                  <img src={filePreview} alt="" id={title + "_" + name} />
                </>
              )}
            </label>

            <input style={{ display: "none" }} type="file" id={id} name={name} onChange={handleValueFile} />
          </>
        ) : (
          <>
            {type === "date" && (
              <label htmlFor={name} className="icon_calendar">
                <CalendarIcon />
              </label>
            )}
            <input
              className={`${focused ? "input_focused" : ""}`}
              type={type}
              required={required}
              onFocus={handleFocusedState}
              onBlur={handleBlurState}
              id={id}
              name={name}
              defaultValue={value}
              onChange={(e) => {
                onChange(e);
                setValue(e.target.value);
              }}
            />

            <div className={`placeholder ${focused ? "up" : ""}`}>{title}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default RowInput;
