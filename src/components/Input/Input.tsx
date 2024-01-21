import React, { useEffect, useState } from "react";
import "./Input.sass";
import PictureIcon from "../../assets/icons/PictureIcon";
import CalendarIcon from "../../assets/icons/CalendarIcon";

function Input({
  type = "text",
  placeholder = "",
  defaultValue = "",
  title = "",
  name = "",
  onChange = (e: any) => {},
  disabled = false,
  pattern = null,
  required = false,
  fullWidth = false,
  splitterTextArea = "\\n",
  rows = 10,
}) {
  const [value, setValue] = useState(defaultValue);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [filePreview, setFilePreview] = useState("");
  const handleValue = (e: any) => {
    setValue(e.target.value);
    onChange(e);
  };

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

  const DefaultvalueFile = () => {
    if (type === "file" && defaultValue !== "" && defaultValue.length > 0) {
      let pathFileLoaded = URL.createObjectURL(defaultValue[defaultValue.length - 1] as unknown as Blob | MediaSource);
      setFilePreview(pathFileLoaded);
    } else setFileLoaded(false);
  };
  useEffect(() => {
    setValue(defaultValue);
    DefaultvalueFile();
    onChange({ target: { value: defaultValue, name: name } });
  }, [defaultValue]);

  const handleNumeric = (e: any) => {
    if (isNaN(+e.target.value)) return "";
    setValue(e.target.value);
    onChange(e);
  };
  const handleTextArea = (e: any) => {
    let rows = e.target.value.split("\n");
    let newText = "";
    rows.forEach((row: string) => (newText += row + splitterTextArea));
    // use this for the default split .replace(/\\n/g, "\n")
    return { target: { value: newText, name: e.target.name } };
  };

  return (
    <>
      {type === "file" ? (
        <div className={`input_ ${fullWidth ? "fullwidth" : ""}`}>
          <label htmlFor={name}>{title}</label>
          <label htmlFor={name} className="label_file_container">
            {!fileLoaded ? (
              <>
                <div className="icon">
                  <PictureIcon />
                </div>
                <div className="span"> Ajouter des photos </div>{" "}
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
          <input
            style={{ display: "none" }}
            autoComplete="true"
            type={type}
            multiple
            name={name}
            id={name}
            onChange={handleValueFile}
            placeholder={placeholder}
            // files={null}
            disabled={disabled}
          />
        </div>
      ) : type === "textarea" ? (
        <>
          <div className={`input_ ${fullWidth ? "fullwidth" : ""}`}>
            <label htmlFor={name}>{title}</label>
            <textarea
              name={name}
              autoComplete="true"
              id={name}
              placeholder={placeholder}
              rows={rows}
              onChange={(e) => {
                onChange(handleTextArea(e));
              }}
              disabled={disabled}
              defaultValue={value}
            ></textarea>
          </div>
        </>
      ) : (
        <div className={`input_ ${fullWidth ? "fullwidth" : ""}`}>
          <label htmlFor={name}>{title}</label>
          {type === "date" && (
            <label htmlFor={name} className="icon_calendar">
              <CalendarIcon />
            </label>
          )}
          {type === "month" && (
            <label htmlFor={name} className="icon_calendar">
              <CalendarIcon />
            </label>
          )}

          <input
            autoComplete="true"
            type={type}
            name={name}
            required={required}
            id={name}
            pattern={pattern ? pattern : undefined}
            onChange={type === "numeric" ? handleNumeric : handleValue}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            style={{ paddingRight: type === "date" ? "0.9rem" : "auto" }}
          />
        </div>
      )}
    </>
  );
}

export default Input;
