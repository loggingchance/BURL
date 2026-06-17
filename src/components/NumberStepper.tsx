interface Props {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  options?: number[]
}

export function NumberStepper({ value, onChange, min, max, step = 1, options }: Props) {
  const dec = () => {
    if (options) {
      const i = options.indexOf(value);
      if (i > 0) onChange(options[i - 1]);
    } else {
      onChange(Math.max(min, value - step));
    }
  }
  const inc = () => {
    if (options) {
      const i = options.indexOf(value);
      if (i < options.length - 1) onChange(options[i + 1]);
    } else {
      onChange(Math.min(max, value + step));
    }
  }
  return (
    <div className="stepper">
      <button onClick={dec} aria-label="decrease">−</button>
      <div className="value-display">{value}</div>
      <button onClick={inc} aria-label="increase">+</button>
    </div>
  )
}
