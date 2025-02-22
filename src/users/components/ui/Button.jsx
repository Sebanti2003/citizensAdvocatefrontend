import clsx from "clsx";

const Button = ({ children, variant = "default", className, ...props }) => {
  return (
    <button
      className={clsx(
        "px-6 py-3 rounded-lg font-medium transition-all duration-300",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "default",
          "border border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
