interface ITextInputProps {
  onChange?: (text: string) => void;
  isFocused?: boolean;
  fieldType: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  id?: string;
  focusClass?: string;
}

export default ITextInputProps;
