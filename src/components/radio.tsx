export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange?(value: boolean): void;
}

export const Radio = (props: RadioProps) => {
  const { label, onChange, checked, ...restProps } = props;
  console.log("[checked", label, checked);

  const handleCheck = () => {
    console.log("[checked", label, checked);
    onChange?.(true);
  };

  return (
    <div onClick={handleCheck} className="flex gap-3 items-center">
      <input {...restProps} id={label} type="radio" className="hidden" />
      <div
        className={`${
          checked ? "border-secondary border-4" : "border-grayLight border-2"
        } border-grayLight w-[17px] h-[17px] rounded-full`}
      />

      {label ? (
        <label className="text-white font-medium" htmlFor={label}>
          {label}
        </label>
      ) : undefined}
    </div>
  );
};

export default Radio;
