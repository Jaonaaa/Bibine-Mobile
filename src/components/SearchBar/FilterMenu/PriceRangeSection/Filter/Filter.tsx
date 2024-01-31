import React, { useEffect, useState } from "react";
import "./Filter.sass";

const getPercent = (value: number, repere: number) => {
  let percent = ((value * 100) / repere).toFixed(0);
  return percent + "%";
};

interface FilterProps {
  min: number;
  max: number;
  current_min: number;
  current_max: number;
  callBack: Function;
  diff: number;
}
const Filter = (props: FilterProps) => {
  let [min, max] = [props.min, props.max];
  const [minValue, setMinValue] = useState(props.current_min);
  const [maxValue, setMaxValue] = useState(props.current_max);
  const [leftSlider, setLeftSlider] = useState(getPercent(props.current_min, props.max));
  const [rightSlider, setRightSlider] = useState(getPercent(props.current_max, props.max));

  const handleMinValue = (e: any) => {
    let value = e.target.value === "" ? min : e.target.value;
    if (checkDiff(value, maxValue)) {
      setMinValue(value);
      setLeftSlider(getPercent(value, max));
    }
  };
  const hanldeMaxValue = (e: any) => {
    let value = e.target.value === "" ? max : e.target.value;
    // && value <= max
    if (checkDiff(minValue, value)) {
      setMaxValue(value);
      setRightSlider(getPercent(value, max));
    }
  };
  const checkDiff = (min: number, max: number) => {
    let diff = max - min;
    // if (diff < props.diff) return false;
    //else
    return true;
  };
  useEffect(() => {
    props.callBack(minValue, maxValue);
  }, [minValue, maxValue]);

  return (
    <div className="filter_container">
      <div className="title"></div>
      <div className="form_content">
        <div className="input_text_row">
          <div className="block">
            <label htmlFor="min">Min </label>
            <input type="text" onChange={handleMinValue} value={minValue} name="" id="min" />
          </div>
          <div className="space"> - </div>
          <div className="block">
            <label htmlFor="max">Max </label>
            <input type="text" onChange={hanldeMaxValue} value={maxValue} name="" id="max" />
          </div>
        </div>

        {/* //// */}
        <div className="input_slider_row">
          <div className="slider_line_b">
            <div className="slider_line" style={{ left: leftSlider }}></div>
            <div className="slider_right" style={{ left: rightSlider }}></div>
          </div>

          <input
            type="range"
            name="min_range"
            onChange={handleMinValue}
            min={min}
            max={max}
            id="min_range"
            value={minValue}
          />
          <input
            type="range"
            name="max_range"
            onChange={hanldeMaxValue}
            min={min}
            max={max}
            id="max_range"
            value={maxValue}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
