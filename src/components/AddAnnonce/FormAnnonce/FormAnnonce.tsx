import React, { FormEventHandler, useEffect } from "react";
import ArrowRight from "../../../assets/icons/ArrowRight";
import Select from "../../Select/Select";
import Input from "../../Input/Input";
import SliderPicture from "../SliderPicture/SliderPicture";
import Details from "../Details/Details";

interface FormProps {
  formData: any;
  inputs: any[];
  callBack: Function;
  next: FormEventHandler<HTMLFormElement>;
  back: React.MouseEventHandler<HTMLDivElement>;
  index: number;
  percent: number;
  // picturesCallBack
  removePicture?: React.MouseEventHandler<HTMLDivElement>;
  helper?: React.ReactNode;
}

interface OptionsProps {
  label: string;
  value: any;
}
interface InputProps {
  type: string;
  name: string;
  title: string;
  options?: OptionsProps[];
  extra?: string;
}

const FormAnnonce = (props: FormProps) => {
  const { formData, inputs, callBack, next, back, index, percent, removePicture, helper } = props;

  return (
    <form className="form_add_annonce" style={{ transform: `translateX(${-percent}%)` }} onSubmit={next}>
      {inputs.map((input: InputProps, index) => (
        <React.Fragment key={index}>
          {input.type === "dropdown" && input.options ? (
            <Select onChange={callBack} optionsType={input.options} fullWidth name={input.name} title={input.title} />
          ) : input.type === "list" ? (
            <Details
              callBack={callBack}
              type={input.type}
              formData={formData}
              name={input.name}
              title={input.title}
              key={index}
            />
          ) : (
            <>
              <Input
                onChange={callBack as (e: any) => {}}
                defaultValue={formData[input.name]}
                fullWidth
                type={input.type}
                name={input.name}
                title={input.title}
              />
              {input.extra && removePicture && (
                <SliderPicture
                  pictures={formData[input.extra]}
                  removePicture={removePicture}
                  nameImg={input.title + "_" + input.name}
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}

      <div className="buttons">
        {index != 0 && (
          <div className="btn_form back" onClick={back}>
            <button>
              <div className="text">Back</div>
            </button>
          </div>
        )}

        <div className="btn_form next">
          <button>
            <div className="text">{index !== -1 ? "Next" : "Terminer"}</div>
            <ArrowRight />
          </button>
        </div>
      </div>
      {helper}
    </form>
  );
};

export default FormAnnonce;
