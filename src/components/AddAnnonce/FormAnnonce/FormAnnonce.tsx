import React, { FormEventHandler, useEffect, useState } from "react";
import ArrowRight from "../../../assets/icons/ArrowRight";
import Select from "../../Select/Select";
import Input from "../../Input/Input";
import SliderPicture from "../SliderPicture/SliderPicture";
import Details from "../Details/Details";
import Selection from "../Selection/Selection";
import { options } from "ionicons/icons";

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
  uploaded?: Function;
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
  constraint: (val: any) => boolean;
  options_src?: any;
}

const FormAnnonce = (props: FormProps) => {
  const { formData, inputs, callBack, next, back, index, percent, removePicture, helper, uploaded } = props;

  return (
    <form className="form_add_annonce" style={{ transform: `translateX(${-percent}%)` }} onSubmit={next}>
      {inputs.map((input: InputProps, index) => (
        <React.Fragment key={index}>
          {input.type === "dropdown" ? (
            <SelectOptions uploaded={uploaded} callBack={callBack} input={input} key={index} />
          ) : input.type === "list" ? (
            <Details
              callBack={callBack}
              type={input.type}
              formData={formData}
              name={input.name}
              title={input.title}
              key={index}
            />
          ) : input.type === "selection" ? (
            <>
              <Selection
                callBack={callBack}
                type={input.type}
                formData={formData}
                name={input.name}
                title={input.title}
                upLoaded={uploaded}
                key={index}
                options_src={input.options_src}
              />
            </>
          ) : (
            <>
              <Input
                onChange={callBack as (e: any) => {}}
                defaultValue={formData[input.name]}
                fullWidth
                type={input.type}
                name={input.name}
                title={input.title}
                constraint={
                  input.constraint
                    ? input.constraint
                    : (e: any) => {
                        return true;
                      }
                }
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

interface SelectOptionsProps {
  input: InputProps;
  callBack: Function;
  uploaded?: Function;
}

const SelectOptions = (props: SelectOptionsProps) => {
  const { input, callBack, uploaded } = props;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async () => {
    if (input.options_src) {
      let res = await input.options_src();
      if (uploaded) uploaded();
      setOptions(res);
    }
  };
  return (
    <>
      <Select onChange={callBack} optionsType={options} fullWidth name={input.name} title={input.title} />
    </>
  );
};

export default FormAnnonce;
