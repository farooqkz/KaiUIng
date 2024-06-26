import { Component, RefObject, createRef } from "inferno";
import classnames from "classnames";
import "KaiUI/src/components/TextInput/TextInput.scss";
import morecolor from "../morecolor";

const prefixCls = "kai-text-input";
const labelCls = `${prefixCls}-label p-thi`;
const inputCls = `${prefixCls}-label p-pri`;

interface Props {
  onChange?: (text: string) => void;
  isFocused?: boolean;
  fieldType: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  id?: string;
  focusClass?: string;
}

interface State {
  value: string;
}

class TextInput extends Component<Props, State> {
  private onChange: (_evt?: Event) => void;
  private textInputRef: RefObject<HTMLInputElement>;
  public state: { value: string };

  onKeyDown = (evt: KeyboardEvent) => {
    if (!this.props.isFocused) return; // do we need this? --Farooq
    if (evt.key === "ArrowLeft" || evt.key === "ArrowRight") {
      evt.stopImmediatePropagation();
    }
  };

  constructor(props: any) {
    const { defaultValue } = props;
    super(props);
    this.textInputRef = createRef();
    this.onChange = (_evt?: Event) => {
      if (!this.textInputRef.current) return;
      this.setState({ value: this.textInputRef.current.value });
      if (this.props.onChange) this.props.onChange(this.textInputRef.current.value);
    };

    this.state = {
      value: defaultValue || "",
    };
  }



  componentDidMount() {
    this.textInputRef.current?.addEventListener("keydown", this.onKeyDown, true)
  }

  componentWillUnmount() {
    this.textInputRef.current?.removeEventListener("keydown", this.onKeyDown, true)
  }

  componentDidUpdate() {
    if (this.props.isFocused) this.textInputRef.current?.focus();
  }

  render() {
    const itemCls = classnames([
      prefixCls,
      this.props.isFocused && `${prefixCls}--focused ${this.props.focusClass || ""}`,
    ]);

    return (
      <div
        id={this.props.id}
        tabIndex={0}
        className={itemCls}
        style={`background-color: ${this.props.isFocused ? morecolor.focusColor : ""
          }`}
      >
        <label className={labelCls} $HasTextChildren>
          {this.props.label}
        </label>
        <input
          onKeyDown={this.onChange}
          onChange={this.onChange}
          onPaste={this.onChange}
          onKeyUp={this.onChange}
          onKeyPress={this.onChange}
          onInput={this.onChange}
          type={this.props.fieldType}
          className={inputCls}
          defaultValue={this.state.value || ""}
          placeholder={this.props.placeholder || ""}
          style={`color: ${this.props.isFocused ? "var(--text-color)" : ""}`}
          ref={this.textInputRef}
        />
      </div>
    );
  }
}

export default TextInput;
