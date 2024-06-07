
interface ChipProps {
  color: string;
  message: string;
}

export const Chip = ({
  color = 'amber',
  message = 'default',
}: ChipProps) => {
  return (
    <div
      className="flex items-center justify-center"
    >
      <div className={`center relative inline-block select-none whitespace-nowrap rounded-lg bg-${color}-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white`}
        style={{
          backgroundColor: color,
          color: 'white',
        }}
      >
        <div className="mt-px">{message}</div>
      </div>
    </div>
  );
};
