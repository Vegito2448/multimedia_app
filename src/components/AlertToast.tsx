
interface Props {
  message: string;
  color: string;
}


export const AlertToast = ({ color, message }: Props) => {
  return (
    <div>
      <div className={`max-w-xs bg-${color}-500 text-sm text-white rounded-md shadow-lg  mb-3 ml-3`} role="alert">
        <div className="flex p-4">
          {message}
          <div className="ml-auto">
            <div className={`inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-white/[.5] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${color}-800 focus:ring-${color}-500 transition-all text-sm dark:focus:ring-offset-${color}-500 dark:focus:ring-${color}-700`}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
